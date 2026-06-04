# IL DENTE PROIBITO — Web Presence Experience

<div align="center">
  <img src="https://img.shields.io/badge/Single%20Page-Static%20Site-111827?style=for-the-badge&logo=vercel&logoColor=white" alt="Static site" />
  <img src="https://img.shields.io/badge/Presence-Lanyard-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Lanyard" />
  <img src="https://img.shields.io/badge/Interactions-Animated-4ee3ff?style=for-the-badge&logo=visualstudiocode&logoColor=black" alt="Animated interactions" />
</div>

<p align="center">
  <strong>IL DENTE PROIBITO</strong> is a high-impact personal landing page built as a polished, immersive, and highly interactive web presence card.
</p>

<p align="center">
  It blends glassmorphism, a cinematic background video, a custom cursor system, a music player, Discord presence integration, and a locked avatar cropper into a single static experience.
</p>

---

## Table of Contents

- [Overview](#overview)
- [What Makes This Project Different](#what-makes-this-project-different)
- [Live Experience](#live-experience)
- [Core Features](#core-features)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Local Setup](#local-setup)
- [Deployment](#deployment)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [Performance Notes](#performance-notes)
- [Privacy and Data Handling](#privacy-and-data-handling)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository contains a compact, framework-free personal web presence designed to make an immediate visual impression. The page is built around a centered glass card layered over a full-screen [...]

The experience is intentionally opinionated:

- the UI feels premium and minimal,
- motion is used for guidance rather than decoration,
- the page loads as a self-contained static document,
- and the interface is tuned to look and feel like a personal identity hub rather than a generic portfolio template.

At its core, the project is a showcase of front-end craft: layout discipline, responsive composition, micro-interactions, and lightweight client-side state management.

---

## What Makes This Project Different

Most bio-link pages stop at a logo, a short text block, and a list of links. This one goes much further.

Instead of presenting only static information, the page combines several live and semi-live systems:

- a mandatory click-to-enter overlay to satisfy browser autoplay policy,
- a local audio player with progress and volume controls,
- a Discord presence panel powered by Lanyard,
- an avatar uploader with crop, drag, zoom, and persistence,
- a custom cursor built in JavaScript,
- typing animations for the identity text,
- and a visual system that makes the content feel synchronized and intentional.

The result is a personal page that behaves more like a curated identity interface than a simple landing page.

---

## Live Experience

The page is designed around a focused central composition:

1. A background video fills the viewport.
2. A click-to-enter overlay prevents premature audio playback.
3. A blurred glass card sits above the background.
4. The avatar can be replaced by the user, then cropped and locked in place.
5. The current Discord status is displayed through Lanyard.
6. A compact music player provides soundtrack controls.
7. Social links give direct access to external profiles.
8. A custom pointer system adds a distinctive interaction layer.

This structure keeps the page visually clear while still feeling rich and animated.

---

## Core Features

### 1. Glassmorphic central card
The entire interface is organized around a centered glass card with backdrop blur, soft borders, layered shadows, and high-contrast typography. The card acts as the visual anchor of the page and k[...]

### 2. Full-screen cinematic background
A looping background video creates the visual atmosphere of the page. The background is treated as a foundational design layer rather than a decorative extra.

### 3. Click-to-enter audio gate
Audio playback begins only after user interaction. This is a deliberate choice that improves compatibility with modern browser autoplay restrictions and keeps the first experience predictable.

### 4. Integrated music player
The page includes a compact audio section with:

- progress tracking,
- current time and total duration,
- volume control,
- mute/unmute handling,
- and a clean, icon-driven control layout.

### 5. Discord presence card via Lanyard
The presence module connects to Lanyard to surface current Discord status and activities. It supports:

- online / idle / DND / offline states,
- rich presence game data,
- Spotify listening status,
- elapsed time tracking,
- and dynamic avatar updates when the user is not locked to a custom image.

### 6. Avatar upload and crop flow
The avatar area is interactive and can accept a user image. The cropper supports:

- drag to reposition,
- zoom via slider,
- pinch-to-zoom on touch devices,
- mouse wheel zoom,
- circular preview masking,
- and persistence in localStorage after confirmation.

Once a custom avatar is confirmed, the page locks it to preserve the selected identity state.

### 7. Custom cursor system
The default pointer is replaced by a two-layer cursor composed of a dot and a trailing ring. The pointer reacts to hover and click states and is designed to reinforce the page's futuristic visu[...]

### 8. Typing animation
The username and bio are revealed through a typing effect, which creates a controlled entrance for the identity block and avoids a hard static render.

### 9. Social links with hover tooltips
External social links are presented as compact vector icons with tooltips. This keeps the layout minimal while still making the navigation obvious.

### 10. Defensive interaction rules
The project deliberately limits unwanted text selection, dragging, copying, and context-menu behavior across large parts of the interface so the experience stays clean and visually protected.

---

## How It Works

The app is a single-page static experience. There is no framework, routing layer, or build pipeline required for the core functionality.

### Rendering model

The page is composed of a handful of layered elements:

- a fixed media background,
- a full-screen interaction overlay,
- a floating volume control,
- a central glass card,
- a crop modal,
- a now-playing/status module,
- and several client-side interaction helpers.

### State management

The script uses plain JavaScript and browser APIs to manage runtime state:

- `localStorage` remembers the chosen avatar,
- `<audio>` handles the soundtrack,
- `<canvas>` is used for avatar cropping and export,
- `fetch` and `WebSocket` support live Discord presence updates,
- and DOM updates are handled directly for responsiveness and simplicity.

### Presence logic

The Discord presence system queries Lanyard and then updates the presence card based on available activity data. Depending on the user's state, the page can show:

- Spotify activity,
- game activity,
- a custom status,
- or an offline / idle fallback.

### Avatar logic

When the user uploads an image, the cropper creates a square export from the circular preview area. The result is saved locally, applied immediately, and locked to avoid accidental replacement.

---

## Project Structure

The repository is organized into modular directories for enhanced maintainability and scalability. The structure follows a modern TypeScript-based architecture with component-driven organization.

```text
.
├── assets/
│   └── og-image.png
│
├── functions/
│   ├── health.js
│   └── visitors.js
│
├── public/
│   ├── background.mp4
│   ├── favicon.ico
│   ├── icona-evento.png
│   ├── pfp.png
│   │
│   └── wallpapers/
│       └── background.mp4
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── BackgroundWallpaper.tsx
│   │   ├── DiscordStatus.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── VisitorCounter.tsx
│   │   └── YoutubeAudioPlayer.tsx
│   │
│   ├── lib/
│   │   ├── cloudflare.ts
│   │   └── utils.ts
│   │
│   └── types/
│       └── index.ts
│
└── README.md
```

### File roles

#### assets/

Static assets used across the project.

- `og-image.png` — Open Graph image for social media previews.

#### functions/

Utility scripts that extend the website functionality.

- `health.js` — health and status endpoint logic.
- `visitors.js` — visitor analytics and tracking logic.

#### public/

Publicly accessible media files and static resources.

- `background.mp4` — the looping full-screen background video.
- `favicon.ico` — browser tab icon.
- `icona-evento.png` — event icon asset.
- `pfp.png` — fallback avatar/profile picture image.

##### public/wallpapers/

Collection of wallpaper and background media assets.

- `background.mp4` — additional background video variant.

#### src/

Modular source code structure for TypeScript components, utilities, and type definitions.

##### src/app/

Application-level configuration and entry points.

- `globals.css` — global styles and CSS resets applied across the entire application.
- `layout.tsx` — root layout component defining the overall page structure.
- `page.tsx` — main page component and primary entry point.

##### src/components/

Reusable React/TypeScript components that compose the UI.

- `BackgroundWallpaper.tsx` — manages the full-screen cinematic background video rendering.
- `DiscordStatus.tsx` — displays Discord presence status powered by Lanyard API.
- `ProfileHeader.tsx` — renders the main identity block with username, bio, and avatar.
- `SocialLinks.tsx` — presents social media links with icons and hover tooltips.
- `VisitorCounter.tsx` — tracks and displays visitor analytics.
- `YoutubeAudioPlayer.tsx` — custom audio player with controls and progress tracking.

##### src/lib/

Shared utility functions, helpers, and business logic.

- `cloudflare.ts` — Cloudflare API integration and helper functions.
- `utils.ts` — general-purpose utility functions for common operations.

##### src/types/

TypeScript type definitions, interfaces, and type exports.

- `index.ts` — centralized type definitions and interfaces for the entire application.

---

## Local Setup

Because this is a static site, setup is straightforward.

### Option 1 — open directly
You can open `index.html` directly in a browser for a quick local preview.

### Option 2 — serve locally
For a more reliable local experience, use a lightweight static server.

#### Python
```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

#### Node.js
```bash
npx serve .
```

#### VS Code Live Server
If you use VS Code, the Live Server extension also works well for fast iteration.

### Recommended local checks
When testing locally, verify the following:

- the background video loads,
- the enter overlay disappears on click,
- the audio starts and the controls respond,
- the Discord presence module resolves correctly,
- the avatar cropper works with both mouse and touch,
- and the custom cursor behaves as expected.

---

## Deployment

This project can be deployed as a static site on any host that serves HTML, CSS, JavaScript, and media files.

### Suitable platforms
- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify
- any standard static file host

### Deployment checklist
Before publishing, ensure that:

- all media assets are included in the repository root or the correct asset directory,
- file paths inside `index.html` match the deployed structure,
- external links are correct,
- and the presence integration is reachable from the deployed environment.

### Important note
Since the avatar persistence happens in the browser through `localStorage`, it is device-specific and does not sync across browsers or machines.

---

## Customization Guide

The project is easy to tailor because most of the interface is directly embedded in `index.html`.

### Identity text
Update the main name and bio text to personalize the page:

- username text,
- bio line,
- social links,
- and tooltips.

### Background media
You can replace the background video with another cinematic loop as long as you preserve the filename or update the source path accordingly.

### Music
The soundtrack can be replaced by swapping the audio file and updating the cover art and metadata shown in the player.

### Avatar assets
You can replace the default avatar image or fallback image with custom artwork to better match the page identity.

### Discord presence account
The Lanyard Discord user ID can be changed in the script if the page should show presence for a different account.

### Visual styling
Most of the visual system lives in inline CSS. The following areas are especially useful for customization:

- the glass card background,
- border opacity and glow levels,
- typography sizing,
- status colors,
- cursor styling,
- and card spacing.

### Interaction behavior
You can also tune the interaction model:

- overlay timing,
- typewriter speed,
- cropper bounds,
- volume defaults,
- and pointer responsiveness.

---

## Browser Support

The project is designed for modern browsers and relies on features that are widely supported in current desktop and mobile engines.

### Expected support
- Chromium-based browsers
- Firefox
- Safari
- modern mobile browsers

### Core APIs used
- HTML5 media elements
- CSS backdrop blur and transforms
- Canvas 2D
- WebSocket
- `localStorage`
- `fetch`
- touch events and wheel events

### Notes
For the best visual result, use a recent browser with hardware acceleration enabled.

---

## Performance Notes

This project is intentionally lightweight at the architectural level, but visually rich at the presentation level.

### Design decisions that help performance
- No frontend framework overhead.
- No client-side routing.
- Direct DOM manipulation instead of abstraction-heavy state layers.
- SVG icons embedded inline to avoid extra asset requests.
- Limited layout complexity around the core content.
- Media elements are used purposefully rather than everywhere.

### Trade-offs
The page is animated and media-heavy by design. That...
