<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/memory-spellbook/", // ✅ MUST MATCH GitHub repo name
  plugins: [react()],
});
>>>>>>> 14512f7 (Stable build: Escape fix, autoplay levels, no border, polished UI)
