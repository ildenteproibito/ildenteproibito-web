'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Locale } from '@/types';
import { t, detectLang, LANG_LABELS } from '@/lib/utils';
import BackgroundWallpaper from '@/components/BackgroundWallpaper';
import ProfileHeader from '@/components/ProfileHeader';
import DiscordStatus from '@/components/DiscordStatus';
import VisitorCounter from '@/components/VisitorCounter';
import YoutubeAudioPlayer from '@/components/YoutubeAudioPlayer';
import SocialLinks from '@/components/SocialLinks';

export default function Home() {
  const [lang, setLang] = useState<Locale>('en');
  const [hasEntered, setHasEntered] = useState(false);
  const [isUiHidden, setIsUiHidden] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [storedVolume, setStoredVolume] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Parent status states updated from DiscordStatus callback
  const [discordStatus, setDiscordStatus] = useState<'online' | 'idle' | 'dnd' | 'offline'>('offline');
  const [discordAvatarUrl, setDiscordAvatarUrl] = useState<string | null>(null);

  // Kofi Alert Modal
  const [isKofiAlertOpen, setIsKofiAlertOpen] = useState(false);

  // Custom Cursor mouse coordinates
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({ x: -100, y: -100 });
  const ringCoords = useRef({ x: -100, y: -100 });

  // Quick Guide Tutorial State
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const tutorialHighlights = useRef<HTMLElement[]>([]);

  // Setup language and document title
  useEffect(() => {
    const detected = detectLang();
    setLang(detected);
    document.documentElement.lang = detected;
  }, []);

  // Update HTML tag lang attribute
  const changeLanguage = (newLang: Locale) => {
    setLang(newLang);
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem('site_lang', newLang);
    } catch {}
    setIsLangOpen(false);
  };

  // Cursor movement tracking
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      }
    };

    let rafId: number;
    const animateRing = () => {
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * 0.14;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * 0.14;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(calc(${ringCoords.current.x}px - 50%), calc(${ringCoords.current.y}px - 50%))`;
      }
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    // Hover scales
    const hoverTargets = 'a, button, input[type="range"], .volume-icon, .control-btn, .crop-btn';
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (hasEntered && target.closest(hoverTargets)) {
        document.body.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(hoverTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    };

    const handleMouseDown = () => document.body.classList.add('cursor-clicking');
    const handleMouseUp = () => document.body.classList.remove('cursor-clicking');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide/show cursor on focus out of browser window
    const handleMouseLeave = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '1';
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '1';
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [hasEntered]);

  // Click to Enter Overlay trigger
  const handleEnterSite = () => {
    setHasEntered(true);
    document.body.classList.add('entered');

    // Show tutorial if not completed
    setTimeout(() => {
      try {
        const completed = localStorage.getItem('tutorial_completed');
        if (!completed) {
          setIsTutorialOpen(true);
          setTutorialStep(0);
        }
      } catch {}
    }, 700);
  };

  // Block global copy/paste/drag events
  useEffect(() => {
    const blockEvent = (e: Event) => e.preventDefault();
    const events = [
      'contextmenu',
      'copy',
      'cut',
      'selectstart',
      'dragstart',
      'dragover',
      'dragenter',
      'dragleave',
      'drop',
    ];
    events.forEach((ev) => document.addEventListener(ev, blockEvent, true));

    return () => {
      events.forEach((ev) => document.removeEventListener(ev, blockEvent, true));
    };
  }, []);

  // Sync lang selection menu clicks
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const selector = document.getElementById('langSelector');
      if (selector && !selector.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // volume slider toggler helper
  const handleVolumeIconClick = () => {
    if (volume > 0) {
      setStoredVolume(volume);
      setVolume(0);
      setIsMuted(true);
    } else {
      const restore = storedVolume !== null ? storedVolume : 0.45;
      setVolume(restore);
      setIsMuted(false);
    }
  };

  // Tutorial Highlights orchestration
  const TUTORIAL_STEPS = [
    { title: 'tutorial.step1.title', body: 'tutorial.step1.body', highlights: [] },
    {
      title: 'tutorial.step2.title',
      body: 'tutorial.step2.body',
      highlights: ['#langSelector'],
      showLangPick: true,
      openLangMenu: true,
    },
    {
      title: 'tutorial.step3.title',
      body: 'tutorial.step3.body',
      highlights: ['.volume-container', '#musicPlayer'],
    },
    {
      title: 'tutorial.step4.title',
      body: 'tutorial.step4.body',
      highlights: ['#nowPlaying', '#visitorLive'],
    },
    {
      title: 'tutorial.step5.title',
      body: 'tutorial.step5.body',
      highlights: ['#avatarWrapper', '.social-links'],
    },
  ];

  const clearTutorialHighlights = () => {
    tutorialHighlights.current.forEach((el) => {
      el.classList.remove('tutorial-highlight');
    });
    tutorialHighlights.current = [];
  };

  const applyTutorialStep = (stepIdx: number) => {
    clearTutorialHighlights();
    const config = TUTORIAL_STEPS[stepIdx];
    if (!config) return;

    config.highlights.forEach((selector) => {
      const el = document.querySelector(selector) as HTMLElement;
      if (el && !el.hidden) {
        el.classList.add('tutorial-highlight');
        tutorialHighlights.current.push(el);
      }
    });

    if (config.openLangMenu) {
      setIsLangOpen(true);
    } else {
      setIsLangOpen(false);
    }
  };

  useEffect(() => {
    if (isTutorialOpen) {
      applyTutorialStep(tutorialStep);
    } else {
      clearTutorialHighlights();
    }
    return () => clearTutorialHighlights();
  }, [isTutorialOpen, tutorialStep, lang]);

  const handleTutorialNext = () => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep((prev) => prev + 1);
    } else {
      setIsTutorialOpen(false);
      try {
        localStorage.setItem('tutorial_completed', '1');
      } catch {}
    }
  };

  const handleTutorialBack = () => {
    if (tutorialStep > 0) {
      setTutorialStep((prev) => prev - 1);
    }
  };

  const handleTutorialSkip = () => {
    setIsTutorialOpen(false);
    try {
      localStorage.setItem('tutorial_completed', '1');
    } catch {}
  };

  const handleOpenTutorialManually = () => {
    setTutorialStep(0);
    setIsTutorialOpen(true);
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLangOpen(false);
        setIsKofiAlertOpen(false);
        if (isTutorialOpen) {
          setIsTutorialOpen(false);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isTutorialOpen]);

  return (
    <>
      {/* Custom Cursor elements */}
      {!isTouchDevice && (
        <>
          <div className="cursor-dot" id="cursorDot" ref={cursorDotRef}></div>
          <div className="cursor-ring" id="cursorRing" ref={cursorRingRef}></div>
        </>
      )}

      {/* Background loop video */}
      <BackgroundWallpaper />

      {/* Entry overlay */}
      <div
        className={`enter-overlay ${hasEntered ? 'hidden' : ''}`}
        id="enterOverlay"
        onClick={handleEnterSite}
      >
        <div className="enter-text">{t('enter.text', lang)}</div>
      </div>

      {/* Ko-fi custom alert modal */}
      <div
        id="customAlert"
        className={`custom-alert-modal ${!isKofiAlertOpen ? 'hidden' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsKofiAlertOpen(false);
        }}
      >
        <div className="custom-alert-card">
          <div className="custom-alert-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
            </svg>
          </div>
          <div className="custom-alert-title">{t('social.kofi', lang)}</div>
          <div className="custom-alert-message">{t('social.kofi.warning', lang)}</div>
          <div className="custom-alert-actions">
            <button
              className="custom-alert-btn custom-alert-btn-secondary"
              id="customAlertClose"
              onClick={() => setIsKofiAlertOpen(false)}
            >
              OK
            </button>
            <a
              href="https://ko-fi.com/ildenteproibito"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-alert-btn custom-alert-btn-primary"
              id="customAlertVisit"
              onClick={() => setIsKofiAlertOpen(false)}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t('social.kofi.visit', lang)}
            </a>
          </div>
        </div>
      </div>

      {/* Top Left tools */}
      <div className="top-left-tools">
        <div className={`lang-selector ${isLangOpen ? 'open' : ''}`} id="langSelector">
          <button
            type="button"
            className="lang-trigger"
            id="langTrigger"
            aria-haspopup="listbox"
            aria-expanded={isLangOpen}
            aria-label={t('lang.aria', lang)}
            onClick={(e) => {
              e.stopPropagation();
              setIsLangOpen((prev) => !prev);
            }}
          >
            <svg className="lang-globe" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.18a15.7 15.7 0 0 0-1.06-4.36A8.03 8.03 0 0 1 19.93 11ZM12 4c.95 1.74 1.58 3.72 1.82 5.82H10.2C10.43 7.72 11.05 5.74 12 4ZM8.31 6.64A15.7 15.7 0 0 0 7.25 11H4.07a8.03 8.03 0 0 1 4.24-4.36ZM4.07 13h3.18c.24 1.55.68 3.02 1.31 4.36A8.03 8.03 0 0 1 4.07 13Zm7.93 7c-.95-1.74-1.58-3.72-1.82-5.82h3.62C15.57 16.28 14.95 18.26 14 20Zm3.69-1.64c.63-1.34 1.07-2.81 1.31-4.36h3.18a8.03 8.03 0 0 1-4.49 4.36ZM10.2 13h3.6c-.24 2.1-.87 4.08-1.82 5.82A10.04 10.04 0 0 1 10.2 13Zm5.55-2H8.25c-.24-2.1-.87-4.08-1.82-5.82A10.04 10.04 0 0 1 15.75 11Z" />
            </svg>
            <span className="lang-current" id="langCurrentLabel">
              {LANG_LABELS[lang]}
            </span>
            <svg className="lang-chevron" viewBox="0 0 12 8" aria-hidden="true">
              <path d="M1.4 0 6 4.6 10.6 0 12 1.4l-6 6-6-6z" />
            </svg>
          </button>
          <div className="lang-menu" id="langMenu" role="listbox">
            {(['en', 'it', 'ru'] as Locale[]).map((localeCode) => (
              <button
                key={localeCode}
                type="button"
                className={`lang-option ${lang === localeCode ? 'active' : ''}`}
                data-lang={localeCode}
                role="option"
                aria-selected={lang === localeCode}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage(localeCode);
                }}
              >
                <span className="lang-option-code">{localeCode.toUpperCase()}</span>
                <span className="lang-option-name">{LANG_LABELS[localeCode]}</span>
                <svg className="lang-check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.55 16.05 5.05 11.55l1.41-1.41 3.09 3.09 7.49-7.49 1.41 1.41-8.9 8.9z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={`tutorial-help-btn ${hasEntered ? 'visible' : ''}`}
          id="tutorialHelpBtn"
          title={t('help.title', lang)}
          aria-label={t('help.aria', lang)}
          onClick={handleOpenTutorialManually}
        >
          ?
        </button>
      </div>

      {/* Top Right volume controls */}
      <div className="volume-container" aria-label={t('volume.aria', lang)}>
        <div
          className={`volume-icon ${isMuted || volume === 0 ? 'muted' : ''}`}
          id="volumeIcon"
          aria-hidden="true"
          onClick={handleVolumeIconClick}
        ></div>
        <input
          type="range"
          className="volume-slider"
          id="globalVolume"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            setIsMuted(v === 0);
          }}
          aria-label={t('volume.slider', lang)}
        />
      </div>

      {/* Main glass card info container */}
      <div className={`blur-card ${isUiHidden ? 'hidden-ui' : ''}`}>
        {/* Profile Details (Pfp, username, bio, typing) */}
        <ProfileHeader
          lang={lang}
          discordStatus={discordStatus}
          discordAvatarUrl={discordAvatarUrl}
        />

        {/* Real-time Discord presence stream / status */}
        <DiscordStatus
          lang={lang}
          onStatusChange={(status, avatarUrl) => {
            setDiscordStatus(status);
            setDiscordAvatarUrl(avatarUrl);
          }}
        />

        {/* Visitor counter database fetch */}
        <VisitorCounter lang={lang} />

        {/* YouTube playlist audio driver */}
        <YoutubeAudioPlayer
          lang={lang}
          volume={volume}
          isMuted={isMuted}
          isUnlocked={hasEntered}
        />

        {/* Footer social icons */}
        <SocialLinks
          lang={lang}
          onKofiClick={(e) => {
            e.preventDefault();
            setIsKofiAlertOpen(true);
          }}
        />
      </div>

      {/* Quick Guide Step Tutorial Modal */}
      {isTutorialOpen && (
        <div
          className="tutorial-modal"
          id="tutorialModal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tutorialTitle"
        >
          <div className="tutorial-box">
            <div className="tutorial-kicker">{t('tutorial.kicker', lang)}</div>
            <div className="tutorial-step-label" id="tutorialStepLabel">
              {t('tutorial.step', lang, { n: tutorialStep + 1, total: TUTORIAL_STEPS.length })}
            </div>
            <h2 className="tutorial-title" id="tutorialTitle">
              {t(TUTORIAL_STEPS[tutorialStep].title, lang)}
            </h2>
            <p className="tutorial-body" id="tutorialBody">
              {t(TUTORIAL_STEPS[tutorialStep].body, lang)}
            </p>

            {/* Language toggle specifically on Step 2 of guide */}
            <div
              className={`tutorial-lang-pick ${
                TUTORIAL_STEPS[tutorialStep].showLangPick ? 'visible' : ''
              }`}
              id="tutorialLangPick"
              aria-label="Language"
            >
              {(['en', 'it', 'ru'] as Locale[]).map((localeCode) => (
                <button
                  key={localeCode}
                  type="button"
                  className={`tutorial-lang-btn ${lang === localeCode ? 'active' : ''}`}
                  onClick={() => changeLanguage(localeCode)}
                >
                  <span className="tutorial-lang-btn-code">{localeCode.toUpperCase()}</span>{' '}
                  {LANG_LABELS[localeCode]}
                </button>
              ))}
            </div>

            <div className="tutorial-dots" id="tutorialDots" aria-hidden="true">
              {TUTORIAL_STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`tutorial-dot ${i === tutorialStep ? 'active' : ''}`}
                ></span>
              ))}
            </div>

            <div className="tutorial-actions">
              <button
                type="button"
                className="tutorial-skip"
                id="tutorialSkip"
                onClick={handleTutorialSkip}
              >
                {t('tutorial.skip', lang)}
              </button>
              <button
                type="button"
                className={`tutorial-btn tutorial-btn-back ${tutorialStep === 0 ? 'hidden' : ''}`}
                id="tutorialBack"
                onClick={handleTutorialBack}
              >
                {t('tutorial.back', lang)}
              </button>
              <button
                type="button"
                className="tutorial-btn tutorial-btn-next"
                id="tutorialNext"
                onClick={handleTutorialNext}
              >
                {tutorialStep === TUTORIAL_STEPS.length - 1
                  ? t('tutorial.finish', lang)
                  : t('tutorial.next', lang)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show/Hide UI toggle button */}
      <button
        type="button"
        className="hide-ui-btn"
        id="hideUiBtn"
        title="Mostra/Nascondi UI"
        aria-label="Mostra/Nascondi UI"
        onClick={() => setIsUiHidden((prev) => !prev)}
      >
        {!isUiHidden ? (
          <svg id="eyeOpenIcon" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        ) : (
          <svg id="eyeClosedIcon" viewBox="0 0 24 24">
            <path d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17zm-4.3.8l1.55 1.55c-.05.21-.08.43-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.43.53-2.2.53-2.76 0-5-2.24-5-5 0-.77.2-1.53.53-2.2zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM12 4.5c1.48 0 2.88.3 4.14.82l-1.6 1.6C13.73 6.64 12.89 6.5 12 6.5c-2.76 0-5 2.24-5 5 0 .89.14 1.73.42 2.54l-1.6 1.6C5.3 14.38 5 13.22 5 12c1.73-4.39 6-7.5 11-7.5z" />
          </svg>
        )}
      </button>
    </>
  );
}
