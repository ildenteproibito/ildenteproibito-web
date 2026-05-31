import React from 'react';

export default function BackgroundWallpaper() {
  return (
    <video className="bg-media" autoPlay loop muted playsInline>
      {/* Percorso aggiornato per puntare alla cartella public/wallpapers/ */}
      <source src="/wallpapers/background.mp4" type="video/mp4" />
    </video>
  );
}