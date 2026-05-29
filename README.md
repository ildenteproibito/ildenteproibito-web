# IL DENTE PROIBITO — Web Presence Experience

<div align="center">
  <img src="https://img.shields.io/badge/HTML-CSS-JS-0f172a?style=for-the-badge&logo=html5&logoColor=white" alt="Tech stack" />
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

This repository contains a compact, framework-free personal web presence designed to make an immediate visual impression. The page is built around a centered glass card layered over a full-screen background video, with a small but dense set of interactive components that make the page feel alive rather than static.

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
The entire interface is organized around a centered glass card with backdrop blur, soft borders, layered shadows, and high-contrast typography. The card acts as the visual anchor of the page and keeps the content readable even with a dynamic background.

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
The default pointer is replaced by a two-layer cursor composed of a dot and a trailing ring. The pointer reacts to hover and click states and is designed to reinforce the page’s futuristic visual tone.

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
The Discord presence system queries Lanyard and then updates the presence card based on available activity data. Depending on the user’s state, the page can show:

- Spotify activity,
- game activity,
- a custom status,
- or an offline / idle fallback.

### Avatar logic
When the user uploads an image, the cropper creates a square export from the circular preview area. The result is saved locally, applied immediately, and locked to avoid accidental replacement.

---

## Project Structure

The repository is intentionally compact. The main runtime is concentrated in a single HTML document with embedded CSS and JavaScript.

A typical structure looks like this:

```text
.
├── index.html
├── background.mp4
├── music.mp3
├── music.jpg
├── profile-card.png
├── pfp.png
├── favicon.ico
└── README.md
```

### File roles

- `index.html` — the complete application shell, styling, and client-side logic.
- `background.mp4` — the looping full-screen background video.
- `music.mp3` — the soundtrack played by the embedded audio player.
- `music.jpg` — cover art for the music card.
- `profile-card.png` — primary avatar image used by default.
- `pfp.png` — fallback avatar image if the primary image is unavailable.
- `favicon.ico` — browser tab icon.

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
The page is animated and media-heavy by design. That means the visual experience depends on a device that can comfortably handle:

- a looping background video,
- audio playback,
- blur effects,
- and multiple concurrent UI animations.

### Practical recommendation
For the smoothest result, test the page on a device with:

- a modern GPU,
- stable network access for presence services,
- and a current browser build.

---

## Privacy and Data Handling

The project includes a few browser-side persistence behaviors that are worth understanding.

### Local avatar persistence
When a custom avatar is confirmed, the result is stored in `localStorage` under a browser-specific key. This means:

- the image survives reloads,
- the state does not depend on a backend,
- and the selection is only available in the same browser profile.

### Presence data
Discord presence data is fetched through Lanyard. The page consumes that data to display status and activity, but it does not implement its own authentication flow.

### No server-side user profile
The repository is a static front-end project, so the experience is driven by client-side rendering and external public APIs rather than a custom account system.

---

## Troubleshooting

### Audio does not start
Modern browsers block autoplay until the user interacts with the page. Click anywhere on the enter overlay first.

### Discord presence is not visible
Check the following:

- the Lanyard service is reachable,
- the configured Discord user ID is correct,
- the browser is online,
- and the user account is available through Lanyard.

### Avatar cropper looks wrong
Make sure the uploaded image is large enough and centered appropriately. Use drag and zoom to reposition the subject before confirming.

### Background video is missing
Verify that the media file exists and that the filename matches the path referenced by the page.

### Custom avatar is stuck
This is expected after confirmation. The avatar is intentionally locked to preserve the saved choice. Clear the browser’s local storage for the site to reset it.

### Cursor appears inconsistent on mobile
The custom pointer system is primarily optimized for desktop-style pointer input. Touch devices may not reproduce the exact same effect.

---

## Roadmap

Possible future improvements could include:

- a settings drawer for quick personalization,
- theme presets,
- a richer mobile layout,
- an admin panel for editable text blocks,
- more granular media controls,
- additional social integrations,
- and optional fallback states when external services are unavailable.

The current implementation already provides a strong identity experience, so the next step is mainly refinement and modularization rather than feature bloat.

---

## Contributing

This repository is small enough that contributions should stay disciplined and intentional.

When proposing changes, keep the following principles in mind:

- preserve the high-end visual style,
- avoid unnecessary dependencies,
- keep interactions smooth and readable,
- and favor clarity over novelty.

Good contributions are the ones that make the page more polished, more maintainable, or more resilient without diluting its visual identity.

---

## License

No license file is currently defined in this repository. If you plan to make the project public for reuse, add an explicit license so the usage terms are clear.

---

## Final Notes

This project is built as a statement piece: compact, atmospheric, and strongly branded. It is not trying to be a generic template. It is trying to feel like a personal presence surface with a distinct visual language.

That combination of minimal structure and rich interaction is exactly what gives the page its identity.
