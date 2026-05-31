export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  global_name: string | null;
  public_flags: number;
  avatar_decoration_data?: any;
}

export interface DiscordActivity {
  type: number; // 0 = Game, 1 = Streaming, 2 = Listening, 3 = Watching, 4 = Custom
  name: string;
  details?: string;
  state?: string;
  emoji?: {
    id?: string;
    name?: string;
    animated?: boolean;
  };
  created_at: number;
  timestamps?: {
    start?: number;
    end?: number;
  };
  url?: string;
  application_id?: string;
  assets?: {
    large_image?: string;
  };
}

export interface SpotifyStatus {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardKv {
  live?: boolean | string;
  is_live?: boolean | string;
  live_url?: string;
  stream_url?: string;
  url?: string;
  live_platform?: string;
  platform?: string;
  live_title?: string;
  title?: string;
  live_sub?: string;
  subtitle?: string;
  live_thumb?: string;
}

export interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  discord_user?: DiscordUser;
  activities?: DiscordActivity[];
  listening_to_spotify: boolean;
  spotify?: SpotifyStatus;
  kv?: LanyardKv;
}

export interface Track {
  id: string;
  start: number;
}

export type Locale = 'en' | 'it' | 'ru';
