import React, { useState, useEffect, useRef } from 'react';
import { Locale } from '@/types';
import { t } from '@/lib/utils';

interface ProfileHeaderProps {
  lang: Locale;
  discordStatus: 'online' | 'idle' | 'dnd' | 'offline';
  discordAvatarUrl?: string | null;
}

export default function ProfileHeader({
  lang,
  discordStatus,
  discordAvatarUrl,
}: ProfileHeaderProps) {
  const [typedUsername, setTypedUsername] = useState('');
  const [typedBio, setTypedBio] = useState('');
  const [usernameDone, setUsernameDone] = useState(false);
  const [bioDone, setBioDone] = useState(false);

  const bioRef = useRef(bioDone);
  bioRef.current = bioDone;

  const usernameText = 'IL DENTE PROIBITO';

  // Typing animation for Username
  useEffect(() => {
    let usernameTimer: NodeJS.Timeout;
    let usernameInterval: NodeJS.Timeout;

    usernameTimer = setTimeout(() => {
      let i = 0;
      usernameInterval = setInterval(() => {
        const char = usernameText[i];
        setTypedUsername((prev) => prev + char);
        i++;
        if (i >= usernameText.length) {
          clearInterval(usernameInterval);
          setUsernameDone(true);
        }
      }, 75);
    }, 600);

    return () => {
      clearTimeout(usernameTimer);
      clearInterval(usernameInterval);
    };
  }, []);

  // Typing animation for Bio
  useEffect(() => {
    let bioTimer: NodeJS.Timeout;
    let bioInterval: NodeJS.Timeout;

    const startDelay = 600 + usernameText.length * 75 + 300; // 2175ms

    bioTimer = setTimeout(() => {
      const bioText = t('bio', lang);
      let i = 0;
      bioInterval = setInterval(() => {
        const char = bioText[i];
        setTypedBio((prev) => prev + char);
        i++;
        if (i >= bioText.length) {
          clearInterval(bioInterval);
          setBioDone(true);
        }
      }, 45);
    }, startDelay);

    return () => {
      clearTimeout(bioTimer);
      clearInterval(bioInterval);
    };
  }, []); // Only runs once on mount

  // Watch for language change to update bio once it has already finished typing
  useEffect(() => {
    if (bioRef.current) {
      setTypedBio(t('bio', lang));
    }
  }, [lang]);

  // Set status title
  const statusTitle = t('discord.statusTitle', lang);

  return (
    <>
      <div className="avatar-wrapper locked" id="avatarWrapper">
        <img
          className="avatar scale-105"
          id="avatarImg"
          src={discordAvatarUrl || 'pfp.png'}
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== window.location.origin + '/pfp.png') {
              img.src = 'pfp.png';
            }
          }}
          alt="Avatar"
        />
        <div
          className={`discord-status-ring ${discordStatus}`}
          id="discordStatusRing"
          title={statusTitle}
          aria-hidden="true"
        ></div>
      </div>

      <h1 className="username">
        {typedUsername}
        {!usernameDone && <span className="typing-cursor"></span>}
      </h1>

      <p className="bio">
        {typedBio}
        {usernameDone && !bioDone && <span className="typing-cursor"></span>}
      </p>
    </>
  );
}