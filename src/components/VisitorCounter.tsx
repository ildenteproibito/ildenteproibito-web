import React, { useState, useEffect, useRef } from 'react';
import { Locale } from '@/types';
import { t, LOCALES } from '@/lib/utils';
import { CLOUDFLARE_CONFIG } from '@/lib/cloudflare';

interface VisitorCounterProps {
  lang: Locale;
}

export default function VisitorCounter({ lang }: VisitorCounterProps) {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const prevTotalRef = useRef<number | null>(null);
  const countElRef = useRef<HTMLDivElement>(null);

  // Generate or retrieve visitor ID
  const getVisitorId = (): string => {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem(CLOUDFLARE_CONFIG.visitorStorageKey);
    if (!id) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        id = `v-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      }
      localStorage.setItem(CLOUDFLARE_CONFIG.visitorStorageKey, id);
    }
    return id;
  };

  const visitorLabel = (total: number): string => {
    if (total === 1) {
      return t('visitor.labelOne', lang);
    }
    const localeCode = LOCALES[lang] || 'en-US';
    return t('visitor.labelMany', lang, {
      count: total.toLocaleString(localeCode),
    });
  };

  const handleRenderCount = (total: number, live: boolean) => {
    const safeTotal = Number.isFinite(total) ? Math.max(0, total) : 0;
    
    // Animate count bump if it changed
    if (prevTotalRef.current !== null && prevTotalRef.current !== safeTotal) {
      if (countElRef.current) {
        countElRef.current.classList.remove('count-bump');
        void countElRef.current.offsetWidth; // Trigger reflow
        countElRef.current.classList.add('count-bump');
      }
    }

    prevTotalRef.current = safeTotal;
    setTotalCount(safeTotal);
    setIsLive(live);
    setErrorKey(null);
  };

  const handleShowError = (messageKey: string) => {
    setErrorKey(messageKey);
    setIsLive(false);
  };

  const readApi = async (res: Response) => {
    const type = res.headers.get('content-type') || '';
    if (!type.includes('application/json')) {
      throw new Error('api_missing');
    }
    return res.json();
  };

  const diagnoseApi = async (): Promise<boolean> => {
    try {
      const health = await fetch('/api/health', { cache: 'no-store' });
      const type = health.headers.get('content-type') || '';
      return type.includes('application/json');
    } catch {
      return false;
    }
  };

  // Register and fetch logic
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const fetchCount = async () => {
      try {
        const res = await fetch(CLOUDFLARE_CONFIG.visitorApi, { cache: 'no-store' });
        const data = await readApi(res);
        if (!res.ok) throw new Error('fetch_failed');
        if (data.configured === false) {
          handleRenderCount(0, false);
          handleShowError('visitor.error.kvBinding');
          return;
        }
        handleRenderCount(data.total, true);
      } catch (err: any) {
        if (err.message === 'api_missing') {
          const ok = await diagnoseApi();
          handleShowError(ok ? 'visitor.error.apiActive' : 'visitor.error.apiInactive');
        } else {
          handleShowError('visitor.error.unavailable');
        }
      }
    };

    const registerVisit = async () => {
      try {
        const res = await fetch(CLOUDFLARE_CONFIG.visitorApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId: getVisitorId() }),
          keepalive: true,
        });
        const data = await readApi(res);
        if (!res.ok) throw new Error('register_failed');
        if (data.configured === false) {
          handleRenderCount(0, false);
          handleShowError('visitor.error.kv');
          return;
        }
        handleRenderCount(data.total, true);
      } catch (err: any) {
        if (err.message === 'api_missing') {
          const ok = await diagnoseApi();
          handleShowError(ok ? 'visitor.error.apiOk' : 'visitor.error.deploy');
        }
      }
    };

    registerVisit().then(() => {
      fetchCount();
      pollInterval = setInterval(fetchCount, CLOUDFLARE_CONFIG.visitorPollMs);
    });

    const visibilityHandler = () => {
      if (document.visibilityState === 'visible') fetchCount();
    };
    document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', visibilityHandler);
    };
  }, [lang]);

  // Render variables
  const countDisplay = totalCount !== null ? String(totalCount) : '—';
  const subtitleDisplay = errorKey
    ? t(errorKey, lang)
    : totalCount !== null
    ? visitorLabel(totalCount)
    : t('visitor.subDefault', lang);
  
  const badgeText = isLive
    ? t('visitor.badgeLive', lang)
    : t('visitor.badgeSetup', lang);

  return (
    <div
      className={`visitor-live ${!isLive ? 'offline' : ''}`}
      id="visitorLive"
      aria-live="polite"
    >
      <div className="visitor-live-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
        </svg>
      </div>
      <div className="visitor-live-body">
        <div className="visitor-live-kicker">{t('visitor.kicker', lang)}</div>
        <div className="visitor-live-count" id="visitorCount" ref={countElRef}>
          {countDisplay}
        </div>
        <div className="visitor-live-sub" id="visitorSub">
          {subtitleDisplay}
        </div>
      </div>
      <div className="visitor-live-badge" id="visitorBadge">
        {errorKey ? t('visitor.badgeOffline', lang) : badgeText}
      </div>
    </div>
  );
}
