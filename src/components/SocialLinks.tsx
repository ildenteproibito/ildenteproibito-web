import React from 'react';
import { Locale } from '@/types';
import { t } from '@/lib/utils';

interface SocialLinksProps {
  lang: Locale;
  onKofiClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function SocialLinks({ lang, onKofiClick }: SocialLinksProps) {
  return (
    <div className="social-links">
      {/* Ko-fi Link */}
      <a
        className="social-link"
        href="https://ko-fi.com/ildenteproibito"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ko-fi"
        data-tooltip={t('social.kofi', lang)}
        id="kofiLink"
        onClick={onKofiClick}
      >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M31.844 11.932c-1.032-5.448-6.48-6.125-6.48-6.125h-24.4c-0.808 0-0.907 1.063-0.907 1.063s-0.109 9.767-0.027 15.767c0.22 3.228 3.448 3.561 3.448 3.561s11.021-0.031 15.953-0.067c3.251-0.568 3.579-3.423 3.541-4.98 5.808 0.323 9.896-3.776 8.871-9.219zM17.093 16.615c-1.661 1.932-5.348 5.297-5.348 5.297s-0.161 0.161-0.417 0.031c-0.099-0.073-0.14-0.12-0.14-0.12-0.595-0.588-4.491-4.063-5.381-5.271-0.943-1.287-1.385-3.599-0.119-4.948 1.265-1.344 4.005-1.448 5.817 0.541 0 0 2.083-2.375 4.625-1.281 2.536 1.095 2.443 4.016 0.963 5.751zM25.323 17.251c-1.24 0.156-2.244 0.036-2.244 0.036v-7.573h2.359c0 0 2.631 0.735 2.631 3.516 0 2.552-1.313 3.557-2.745 4.021z" />
        </svg>
      </a>

      {/* X / Twitter */}
      <a
        className="social-link"
        href="https://x.com/90Gattucio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        data-tooltip={t('social.twitter', lang)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2H21l-6.55 7.49L22 22h-5.956l-4.66-6.102L6.04 22H3.28l7-7.997L2 2h6.108l4.212 5.562L18.244 2Zm-1.045 18h1.649L7.212 3.894H5.44L17.2 20Z"></path>
        </svg>
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@xyz.amv.cc"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        data-tooltip="Background by XYZ.CC"
      >
        <svg viewBox="0 0 448 512" aria-hidden="true">
          <path fill="currentColor" d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3v89.1a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2A122.2 122.2 0 0 0 448 142.4z"/>
        </svg>
      </a>

      {/* Telegram */}
      <a
        className="social-link"
        href="https://t.me/+AKZO7Y5buhw0ZjRk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        data-tooltip={t('social.telegram', lang)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.944 4.667a1.5 1.5 0 0 0-1.933-1.8L3.291 9.09a1.5 1.5 0 0 0 .1 2.84l3.89 1.26 1.51 4.72a1.5 1.5 0 0 0 2.55.59l2.17-2.23 4.26 3.12a1.5 1.5 0 0 0 2.36-.89L21.944 4.667Zm-11.59 8.05-.67 3.12-.93-2.91 7.74-5.12-6.14 4.91Z"></path>
        </svg>
      </a>

      {/* Gmail */}
      <a
        className="social-link social-link-gmail"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=ildenteproibito@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Gmail"
        data-tooltip={t('social.gmail', lang)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M5.01 15.002v-2.816L1.996 9.17v7.83c0 .563.454 1.018 1.017 1.018h2.996V15.002H5.01z"/>
          <path d="M5.01 9.998 12 14.998l6.99-5v2.816l-1.485 1.188L12 17.998l-6.505-5.004L5.01 12.186V9.998z"/>
          <path d="M18.99 15.002v2.996h2.013c.563 0 1.017-.455 1.017-1.018V9.17l-3.014 2.416v3.416z"/>
          <path d="M1.996 9.17 12 16.998l10.004-7.828V5.5c0-1.38-1.12-2.5-2.5-2.5H4.496c-1.38 0-2.5 1.12-2.5 2.5v3.67z"/>
          <path d="M5.01 15.002H2.513c-.563 0-1.017-.455-1.017-1.018V9.17l3.514 2.828v3.004z"/>
          <path d="M22.503 9.17v4.814c0 .563-.454 1.018-1.017 1.018h-2.496v-3.004L22.503 9.17z"/>
        </svg>
      </a>

      {/* GitHub */}
      <a
        className="social-link"
        href="https://github.com/ceckbox/ildenteproibito-web"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        data-tooltip={t('social.github', lang)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
        </svg>
      </a>
    </div>
  );
}
