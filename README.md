# 🧠 Memory Spellbook

**Memory Spellbook** is a pixel-art inspired memory game with a retro CRT aesthetic and fantasy twist. The player flips pairs of spell cards across 12 levels of increasing difficulty. After mastering the Spellbook, an Endless Mode becomes available where the number of pairs increases unpredictably.

---

## 🎮 Game Features

- **Pixel Art Design:** Inspired by NES and fantasy themes
- **12-Level Campaign:** Each level introduces more card pairs (starting at 4, increasing to 15+)
- **Endless Mode:** Unlocks after completing all 12 levels
- **Keyboard/Gamepad Support:** Arrow keys or D-Pad to move, Enter to flip
- **Escape Key Pausing:** Escape toggles a menu with return-to-title and mute options
- **Level Select & Cheat Unlock:** Choose unlocked levels or press "C" on title screen to unlock all

---

## 🔧 Development

### Stack
- **React** (Vite setup)
- **Tailwind CSS** for styling and CRT effects
- **Audio:** Ambient music loop + SFX for match, mismatch, victory [Temple Fantasy by szegvari on Freesound]
- **Asset pipeline:** PNG cards and backgrounds, MP3 audio, GIF overlay noise

### Structure
- `App.jsx` – Main game logic and scene transitions
- `components/` – Reusable UI components (Cards, Menus, LevelSelect)
- `assets/` – Backgrounds, cards, SFX, UI sprites
- `data.js` – Card definitions

### Controls
- `Arrow Keys / D-Pad:` Navigate cards
- `Enter:` Flip selected card
- `Escape:` Pause / Resume / Title Menu
- `C:` (on title screen) Unlock all levels

---

## 📜 Dev Log

### April 16, 2025
- 🎉 Project began. Base memory game logic implemented.
- 🔊 Audio files hooked in: match, mismatch, and victory sounds
- 🧠 Added 12 progressive levels + level background changes
- 🧪 GitHub Pages build and testing began

### April 17, 2025
- 🧩 Victory freeze bug fixed
- 🏁 Endless Mode UI + logic added
- 🏆 "End of Spellbook" end screen implemented
- 🎮 Gamepad/Keyboard arrow controls enabled (4-directional)
- 🔄 Fixed ESC menu, return-to-title working again
- 💡 Cheat unlock toggle now toggled with C key
- 🧪 Finalized current stable build and separated dev branch

### April 19, 2025
- 🧩 Card sticking on both front and back bug fixed
- 🏁 Github Actions automation implemented

---

## 🚧 Upcoming Features
- 🎮 Controller testing (PS/Xbox compatibility)
- 📱 Mobile optimization + responsive tweaks
- 💾 Save progress/load session
- 🧙 Additional card art for higher levels
- 🛠️ Dev branch setup for prototype testing

---

## 📦 Deployment
Live version is published to GitHub Pages:
```
vite build
npm run deploy
```

Ensure `vite.config.js` has:
```js
base: "/memory-spellbook/"
```

---

## 🙌 Contributions
Built by @Inter3sted — ongoing dev log & tweaks daily.

Feel free to fork and mod your own spellbook version ✨
