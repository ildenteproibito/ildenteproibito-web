import React, { useState, useEffect, useRef } from 'react';
import { Locale, LanyardData, DiscordActivity, LanyardKv } from '@/types';
import { t, formatElapsed, escapeHtml } from '@/lib/utils';

interface DiscordStatusProps {
  lang: Locale;
  onStatusChange?: (
    status: 'online' | 'idle' | 'dnd' | 'offline',
    avatarUrl: string | null
  ) => void;
}

const DISCORD_USER_ID = '1233950558184800297';
const LANYARD_REST = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;
const LANYARD_WS = 'wss://api.lanyard.rest/socket';
const BADGE_CDN = 'https://raw.githubusercontent.com/mezotv/discord-badges/main/badges';

const PUBLIC_FLAG_BADGES = [
  { bit: 1 << 0, slug: 'staff', title: 'Discord Staff' },
  { bit: 1 << 1, slug: 'partner', title: 'Partnered Server Owner' },
  { bit: 1 << 2, slug: 'hypesquad_events', title: 'HypeSquad Events' },
  { bit: 1 << 3, slug: 'bug_hunter_level_1', title: 'Bug Hunter' },
  { bit: 1 << 6, slug: 'bravery', title: 'HypeSquad Bravery' },
  { bit: 1 << 7, slug: 'brilliance', title: 'HypeSquad Brilliance' },
  { bit: 1 << 8, slug: 'balance', title: 'HypeSquad Balance' },
  { bit: 1 << 9, slug: 'early_supporter', title: 'Early Supporter' },
  { bit: 1 << 14, slug: 'bug_hunter_level_2', title: 'Bug Hunter Gold' },
  { bit: 1 << 17, slug: 'verified_developer', title: 'Verified Developer' },
  { bit: 1 << 18, slug: 'certified_moderator', title: 'Moderator Alumni' },
];

interface StreamInfo {
  platform: string;
  title: string;
  subtitle: string;
  url: string;
  thumb: string | null;
  source: 'discord' | 'kv' | 'twitch' | 'youtube' | 'kick';
}

export default function DiscordStatus({ lang, onStatusChange }: DiscordStatusProps) {
  const [lanyardData, setLanyardData] = useState<LanyardData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lanyardMissing, setLanyardMissing] = useState(false);
  const [lanyardFetchFailed, setLanyardFetchFailed] = useState(false);
  const [externalLive, setExternalLive] = useState<StreamInfo | null>(null);
  const [elapsedText, setElapsedText] = useState('');

  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectDelayRef = useRef(2000);
  const elapsedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Status values needed in parent
  const onStatusChangeRef = useRef(onStatusChange);
  onStatusChangeRef.current = onStatusChange;

  // Resolve dynamic avatar url
  function getDiscordAvatarUrl(user: any) {
    if (!user) return null;
    if (user.avatar) {
      const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
    }
    const defaultIndex =
      user.discriminator && user.discriminator !== '0'
        ? Number(user.discriminator) % 5
        : Number((BigInt(user.id) >> 22n) % 6n);
    return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
  }

  // Handle updates to Lanyard payload
  const handleLanyardPayload = (data: LanyardData) => {
    setLanyardData(data);
    setLanyardMissing(false);
    setLanyardFetchFailed(false);

    const status = data.discord_status || 'offline';
    const avatarUrl = getDiscordAvatarUrl(data.discord_user);
    if (onStatusChangeRef.current) {
      onStatusChangeRef.current(status, avatarUrl);
    }
  };

  const handleNotOnLanyard = () => {
    setLanyardMissing(true);
    setLanyardData(null);
    if (onStatusChangeRef.current) {
      onStatusChangeRef.current('offline', null);
    }
  };

  // REST API initial fetch
  const fetchInitial = async () => {
    try {
      const res = await fetch(LANYARD_REST);
      const json = await res.json();
      if (!json.success) {
        handleNotOnLanyard();
        return;
      }
      handleLanyardPayload(json.data);
    } catch {
      setLanyardFetchFailed(true);
    }
  };

  // WebSocket Connection
  const connectWebSocket = () => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
    const socket = new WebSocket(LANYARD_WS);
    wsRef.current = socket;

    socket.addEventListener('message', (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      if (msg.op === 1) {
        reconnectDelayRef.current = 2000;
        if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ op: 3 }));
          }
        }, msg.d.heartbeat_interval);

        socket.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_USER_ID },
          })
        );
        return;
      }

      if (msg.op === 0 && (msg.t === 'INIT' || msg.t === 'PRESENCE_UPDATE')) {
        handleLanyardPayload(msg.d);
      }
    });

    socket.addEventListener('close', () => {
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      if (wsRef.current === socket) {
        wsRef.current = null;
      }
      setTimeout(connectWebSocket, reconnectDelayRef.current);
      reconnectDelayRef.current = Math.min(reconnectDelayRef.current * 1.5, 30000);
    });

    socket.addEventListener('error', () => {
      socket.close();
    });
  };

  // Decapi external pollers
  const pollExternalStreams = async () => {
    // Check twitch uptime
    try {
      const twitchUser = 'markgattu';
      const res = await fetch(`https://decapi.me/twitch/uptime/${twitchUser}`, { cache: 'no-store' });
      const text = (await res.text()).trim();
      if (!/offline|not live|does not exist|invalid/i.test(text)) {
        setExternalLive({
          platform: 'Twitch',
          title: t('live.onTwitch', lang),
          subtitle: text.length < 80 ? text : t('live.activeStream', lang),
          url: `https://twitch.tv/${twitchUser}`,
          thumb: null,
          source: 'twitch',
        });
        return;
      }
    } catch {}
    setExternalLive(null);
  };

  useEffect(() => {
    fetchInitial();
    connectWebSocket();
    pollExternalStreams();

    const externalInterval = setInterval(pollExternalStreams, 90000);

    const visibilityHandler = () => {
      if (document.visibilityState === 'visible') {
        fetchInitial();
        pollExternalStreams();
      }
    };
    document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      clearInterval(externalInterval);
      document.removeEventListener('visibilitychange', visibilityHandler);
    };
  }, [lang]);

  // Activity timer
  useEffect(() => {
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);

    const getStartTime = () => {
      if (!lanyardData) return null;
      const { listening_to_spotify, spotify, activities } = lanyardData;
      if (listening_to_spotify && spotify) {
        return spotify.timestamps?.start || null;
      }
      const streaming = (activities || []).find((a) => a.type === 1);
      if (streaming) {
        return streaming.timestamps?.start || streaming.created_at || null;
      }
      const game = (activities || []).find((a) => a.type === 0);
      if (game) {
        return game.timestamps?.start || game.created_at || null;
      }
      const custom = (activities || []).find((a) => a.type === 4);
      if (custom) {
        return custom.created_at || null;
      }
      return null;
    };

    const startTime = getStartTime();
    if (!startTime) {
      setElapsedText('');
      return;
    }

    const updateTimer = () => {
      const diff = Date.now() - startTime;
      setElapsedText(formatElapsed(diff, lang));
    };

    updateTimer();
    elapsedTimerRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    };
  }, [lanyardData, lang]);

  // Resolve current active stream banner
  const getStreamInfo = (): StreamInfo | null => {
    if (lanyardData?.kv) {
      const kv = lanyardData.kv;
      const live = kv.live === true || kv.live === 'true' || kv.is_live === true || kv.is_live === 'true';
      const url = kv.live_url || kv.stream_url || kv.url;
      if (live && url) {
        return {
          platform: kv.live_platform || kv.platform || 'Live',
          title: kv.live_title || kv.title || t('live.titleDefault', lang),
          subtitle: kv.live_sub || kv.subtitle || t('live.manualStream', lang),
          url: String(url),
          thumb: kv.live_thumb || null,
          source: 'kv',
        };
      }
    }

    const streaming = (lanyardData?.activities || []).find((a) => a.type === 1);
    if (streaming) {
      const platform = streaming.name || 'Live';
      const title = streaming.details || streaming.state || t('live.titleDefault', lang);
      const subtitle = [streaming.state, streaming.details]
        .filter(Boolean)
        .filter((v, i, arr) => arr.indexOf(v) === i && v !== title)
        .join(' · ');
      let url = streaming.url || '';
      if (!url && platform.toLowerCase().includes('twitch')) {
        url = 'https://twitch.tv/markgattu';
      }
      if (url) {
        // Find activity image
        let thumb: string | null = null;
        if (streaming.assets?.large_image) {
          const img = streaming.assets.large_image;
          if (img.startsWith('mp:external/')) {
            const parts = img.split('/');
            if (parts.length > 2) thumb = `https://${parts.slice(2).join('/')}`;
          } else if (streaming.application_id) {
            thumb = `https://cdn.discordapp.com/app-assets/${streaming.application_id}/${img}.png`;
          }
        }
        return {
          platform,
          title,
          subtitle: subtitle || t('live.viaDiscord', lang),
          url,
          thumb,
          source: 'discord',
        };
      }
    }

    return externalLive;
  };

  const streamInfo = getStreamInfo();

  // Resolve custom status text
  function getCustomStatusText(activity: DiscordActivity) {
    if (!activity) return '';
    const emoji = activity.emoji;
    const prefix = emoji
      ? emoji.id
        ? `<img class="np-emoji" src="https://cdn.discordapp.com/emojis/${emoji.id}.${
            emoji.animated ? 'gif' : 'png'
          }" alt="" />`
        : emoji.name || ''
      : '';
    const state = activity.state || activity.name || '';
    return `${prefix}${state}`.trim();
  }

  // Activity cards
  const renderPresence = () => {
    if (lanyardFetchFailed) {
      return (
        <div className="now-playing status-offline idle">
          <span className="np-dot"></span>
          <div className="np-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V7a1 1 0 0 0-1-1H7Zm0 2h10v6H7V8Zm-3 3h2v1H4v-1Zm13 0h2v1h-2v-1ZM9 9v2H7v1h2v2h1v-2h2v-1h-2V9H9Z" />
            </svg>
          </div>
          <div className="np-text">
            <div className="np-label">{t('discord.status.offline', lang)}</div>
            <div className="np-game">{t('discord.lanyardError', lang)}</div>
            <div className="np-sub">{t('discord.lanyardErrorSub', lang)}</div>
          </div>
        </div>
      );
    }

    if (lanyardMissing) {
      return (
        <div className="now-playing status-offline idle">
          <span className="np-dot"></span>
          <div className="np-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V7a1 1 0 0 0-1-1H7Zm0 2h10v6H7V8Zm-3 3h2v1H4v-1Zm13 0h2v1h-2v-1ZM9 9v2H7v1h2v2h1v-2h2v-1h-2V9H9Z" />
            </svg>
          </div>
          <div className="np-text">
            <div className="np-label">{t('discord.lanyardLabel', lang)}</div>
            <div className="np-game">{t('discord.lanyardActivate', lang)}</div>
            <div className="np-sub">{t('discord.lanyardInstall', lang)}</div>
          </div>
        </div>
      );
    }

    if (!lanyardData) {
      return (
        <div className="now-playing status-offline idle">
          <span className="np-dot"></span>
          <div className="np-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V7a1 1 0 0 0-1-1H7Zm0 2h10v6H7V8Zm-3 3h2v1H4v-1Zm13 0h2v1h-2v-1ZM9 9v2H7v1h2v2h1v-2h2v-1h-2V9H9Z" />
            </svg>
          </div>
          <div className="np-text">
            <div className="np-game">{t('discord.connecting', lang)}</div>
          </div>
        </div>
      );
    }

    const { discord_status, listening_to_spotify, spotify, activities = [] } = lanyardData;

    // Spotify Card
    if (listening_to_spotify && spotify) {
      return (
        <div className="now-playing spotify-theme">
          <span className="np-dot" style={{ background: '#1ed760' }}></span>
          <div className="np-icon">
            <img src={spotify.album_art_url} alt={spotify.album} loading="lazy" />
          </div>
          <div className="np-text">
            <div className="np-label">{t('discord.listeningSpotify', lang)}</div>
            <div className="np-game">{spotify.song}</div>
            <div className="np-sub">
              {[spotify.artist, spotify.album].filter(Boolean).join(' · ')}
            </div>
            {elapsedText && <div className="np-elapsed">{elapsedText}</div>}
          </div>
        </div>
      );
    }

    // Streaming Card
    const streaming = activities.find((a) => a.type === 1);
    if (streaming) {
      let activityImgUrl: string | null = null;
      if (streaming.assets?.large_image) {
        const img = streaming.assets.large_image;
        if (img.startsWith('mp:external/')) {
          const parts = img.split('/');
          if (parts.length > 2) activityImgUrl = `https://${parts.slice(2).join('/')}`;
        } else if (streaming.application_id) {
          activityImgUrl = `https://cdn.discordapp.com/app-assets/${streaming.application_id}/${img}.png`;
        }
      }

      return (
        <div className="now-playing">
          <span className="np-dot" style={{ background: '#23a55a' }}></span>
          <div className="np-icon">
            {activityImgUrl ? (
              <img src={activityImgUrl} alt={streaming.name} />
            ) : (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 6a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V7a1 1 0 0 0-1-1H7Zm0 2h10v6H7V8Zm-3 3h2v1H4v-1Zm13 0h2v1h-2v-1ZM9 9v2H7v1h2v2h1v-2h2v-1h-2V9H9Z" />
              </svg>
            )}
          </div>
          <div className="np-text">
            <div className="np-label">LIVE</div>
            <div className="np-game">
              {streaming.details || streaming.state || streaming.name || t('live.streaming', lang)}
            </div>
            <div className="np-sub">
              {[streaming.state, streaming.name].filter(Boolean).filter((v) => v !== (streaming.details || streaming.name)).join(' · ')}
            </div>
            {elapsedText && <div className="np-elapsed">{elapsedText}</div>}
          </div>
        </div>
      );
    }

    // Gaming Card
    const game = activities.find((a) => a.type === 0);
    if (game) {
      let gameImgUrl: string | null = null;
      if (game.assets?.large_image) {
        const img = game.assets.large_image;
        if (img.startsWith('mp:external/')) {
          const parts = img.split('/');
          if (parts.length > 2) gameImgUrl = `https://${parts.slice(2).join('/')}`;
        } else if (game.application_id) {
          gameImgUrl = `https://cdn.discordapp.com/app-assets/${game.application_id}/${img}.png`;
        }
      }

      const custom = activities.find((a) => a.type === 4);
      let detailsText = [game.details, game.state].filter(Boolean).join(' — ');
      if (custom) {
        const customLine = getCustomStatusText(custom).replace(/<[^>]+>/g, '').trim();
        if (customLine) {
          detailsText = (detailsText ? detailsText + ' · ' : '') + customLine;
        }
      }

      return (
        <div className="now-playing">
          <span className="np-dot"></span>
          <div className="np-icon">
            {gameImgUrl ? (
              <img src={gameImgUrl} alt={game.name} />
            ) : (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 6a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V7a1 1 0 0 0-1-1H7Zm0 2h10v6H7V8Zm-3 3h2v1H4v-1Zm13 0h2v1h-2v-1ZM9 9v2H7v1h2v2h1v-2h2v-1h-2V9H9Z" />
              </svg>
            )}
          </div>
          <div className="np-text">
            <div className="np-label">{t(`discord.status.${discord_status}`, lang)}</div>
            <div className="np-game">{game.name || t('discord.playingGame', lang)}</div>
            <div className="np-sub">{detailsText}</div>
            {elapsedText && <div className="np-elapsed">{elapsedText}</div>}
          </div>
        </div>
      );
    }

    // Custom Status only Card
    const custom = activities.find((a) => a.type === 4);
    if (custom) {
      const statusLabelText = t(`discord.status.${discord_status}`, lang) + t('discord.statusSuffix', lang);
      const customHTML = getCustomStatusText(custom);

      return (
        <div className="now-playing">
          <span className="np-dot"></span>
          <div className="np-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 6a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V7a1 1 0 0 0-1-1H7Zm0 2h10v6H7V8Zm-3 3h2v1H4v-1Zm13 0h2v1h-2v-1ZM9 9v2H7v1h2v2h1v-2h2v-1h-2V9H9Z" />
            </svg>
          </div>
          <div className="np-text">
            <div className="np-label">{statusLabelText}</div>
            <div className="np-game" dangerouslySetInnerHTML={{ __html: customHTML || t('discord.customStatus', lang) }} />
            <div className="np-sub"></div>
            {elapsedText && <div className="np-elapsed">{elapsedText}</div>}
          </div>
        </div>
      );
    }

    // Idle/No activity state
    return (
      <div className="now-playing idle">
        <span className="np-dot"></span>
        <div className="np-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 6a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V7a1 1 0 0 0-1-1H7Zm0 2h10v6H7V8Zm-3 3h2v1H4v-1Zm13 0h2v1h-2v-1ZM9 9v2H7v1h2v2h1v-2h2v-1h-2V9H9Z" />
          </svg>
        </div>
        <div className="np-text">
          <div className="np-label">{t(`discord.status.${discord_status}`, lang)}</div>
          <div className="np-game">
            {discord_status === 'offline'
              ? t('discord.notOnDiscord', lang)
              : t('discord.noActivity', lang)}
          </div>
        </div>
      </div>
    );
  };

  // Badges lists logic
  const renderBadgesList = () => {
    if (!lanyardData?.discord_user) {
      return <span className="discord-badges-empty">{t('discord.badgesUnavailable', lang)}</span>;
    }
    const user = lanyardData.discord_user;
    const flags = Number(user.public_flags) || 0;
    const badgeItems = PUBLIC_FLAG_BADGES.filter((b) => (flags & b.bit) === b.bit);

    if (user.avatar?.startsWith('a_')) {
      badgeItems.push({ bit: 0, slug: 'nitro', title: 'Nitro (avatar animato)' });
    }
    if (user.avatar_decoration_data) {
      badgeItems.push({ bit: 0, slug: 'nitro', title: 'Nitro (decorazione avatar)' });
    }

    const unique: typeof badgeItems = [];
    const seen = new Set<string>();
    badgeItems.forEach((b) => {
      if (seen.has(b.slug)) return;
      seen.add(b.slug);
      unique.push(b);
    });

    if (!unique.length) {
      return <span className="discord-badges-empty">{t('discord.noBadges', lang)}</span>;
    }

    return unique.map((b) => (
      <img
        key={b.title}
        src={`${BADGE_CDN}/${escapeHtml(b.slug)}.svg`}
        alt={b.title}
        title={b.title}
        loading="lazy"
        width="22"
        height="22"
      />
    ));
  };

  // Stream logo helper
  const renderStreamLogo = (thumb: string | null, platform: string) => {
    if (thumb) {
      return <img src={thumb} alt="" loading="lazy" />;
    }
    const p = platform.toLowerCase();
    if (p.includes('twitch')) {
      return (
        <svg viewBox="0 0 24 24">
          <path
            fill="#9146FF"
            d="M11.64 5.93 9.43 8.14 7.21 5.93 4.5 8.64v6.72l2.71 2.71 2.22-2.22 2.21 2.22L19.5 15.36V8.64L16.79 5.93l-2.22 2.21-2.21-2.21-1.72 1.72zm1.72 3.07 2.21-2.21 1.72 1.72v4.98l-1.72 1.72-2.21-2.21-2.22 2.21-1.72-1.72V8.64l1.72-1.72 2.22 2.21 2.21-2.21 1.72 1.72v4.98l-1.72 1.72-2.21-2.21z"
          />
        </svg>
      );
    }
    if (p.includes('youtube')) {
      return (
        <svg viewBox="0 0 24 24">
          <path
            fill="#FF0000"
            d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"
          />
        </svg>
      );
    }
    if (p.includes('kick')) {
      return (
        <svg viewBox="0 0 24 24">
          <path fill="#53FC18" d="M3 3h7v4H8v10H3V3zm11 0h7v7h-4v1h4v7h-7v-4h3v-1h-3V3z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24">
        <path d="M21 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6-2v2h-2V4h2zm4 16H5V8h14v12z" />
      </svg>
    );
  };

  const user = lanyardData?.discord_user;

  return (
    <>
      {/* Live Stream Banner */}
      {streamInfo && (
        <a
          className="live-banner"
          id="liveBanner"
          href={streamInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('live.watchAria', lang, {
            platform: streamInfo.platform,
            title: streamInfo.title,
          })}
        >
          <div className="live-banner-icon" id="liveBannerIcon" aria-hidden="true">
            {renderStreamLogo(streamInfo.thumb, streamInfo.platform)}
          </div>
          <div className="live-banner-body">
            <div className="live-banner-top">
              <span className="live-banner-badge">
                <span className="live-banner-badge-dot"></span>LIVE
              </span>
              <span className="live-banner-platform" id="livePlatform">
                {streamInfo.platform}
              </span>
            </div>
            <div className="live-banner-title" id="liveTitle">
              {streamInfo.title}
            </div>
            <div className="live-banner-sub" id="liveSub">
              {streamInfo.subtitle}
            </div>
          </div>
          <span className="live-banner-cta" id="liveBannerCta">
            {t('live.cta', lang)}
          </span>
        </a>
      )}

      {/* Discord Presence Section */}
      <div className="discord-block">
        <div id="nowPlaying">{renderPresence()}</div>

        <div className="discord-expand" id="discordExpand" hidden={!isExpanded}>
          <div className="discord-profile-head">
            <div>
              <div className="discord-profile-name" id="discordDisplayName">
                {user?.global_name || user?.username || 'IL DENTE PROIBITO'}
              </div>
              <div className="discord-profile-handle" id="discordHandle">
                {user
                  ? user.discriminator && user.discriminator !== '0'
                    ? `@${user.username}#${user.discriminator}`
                    : `@${user.username}`
                  : '@…'}
              </div>
            </div>
            <div
              className="discord-badges"
              id="discordBadges"
              aria-label={t('discord.badgesAria', lang)}
            >
              {renderBadgesList()}
            </div>
          </div>
          <a
            className="discord-friend-btn"
            id="discordFriendBtn"
            href={`https://discord.com/users/${DISCORD_USER_ID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>{t('discord.addFriend', lang)}</span>
          </a>
        </div>

        <button
          type="button"
          className="discord-toggle-btn"
          id="discordToggleBtn"
          aria-expanded={isExpanded}
          aria-controls="discordExpand"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>
            {t(isExpanded ? 'discord.hideProfile' : 'discord.showProfile', lang)}
          </span>
        </button>
      </div>
    </>
  );
}
