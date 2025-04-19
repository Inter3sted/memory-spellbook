/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: ["scanlines", "crt", "crt-flicker", "font-pixel", "btn-pixel"],

  theme: {
    extend: {
      fontFamily: {
        uncial: ['"Uncial Antiqua"', "cursive"],
      },
      perspective: {
        1000: "1000px",
      },
      keyframes: {
        wispFloat: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.3" },
          "25%": { transform: "translateY(-10px) scale(1.1)", opacity: "0.6" },
          "50%": { transform: "translateY(-20px) scale(1.2)", opacity: "0.9" },
          "75%": { transform: "translateY(-10px) scale(1.1)", opacity: "0.6" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "0.3" },
        },
        sparkleTrail: {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.8)" },
          "30%": { opacity: "0.5", transform: "translateY(-10px) scale(1)" },
          "60%": { opacity: "0.9", transform: "translateY(-20px) scale(1.1)" },
          "100%": { opacity: "0", transform: "translateY(-30px) scale(1.2)" },
        },
        wispBlink: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        levelUp: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        pulseGrow: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.2)", opacity: "0.7" },
        },
      },
      animation: {
        "wisp-slow": "wispFloat 20s ease-in-out infinite",
        "wisp-medium": "wispFloat 14s ease-in-out infinite",
        "wisp-fast": "wispFloat 10s ease-in-out infinite",
        sparkle: "sparkleTrail 3s ease-in-out infinite",
        blink: "wispBlink 8s ease-in-out infinite",
        "level-up": "levelUp 1.5s ease-in-out",
        "pulse-grow": "pulseGrow 1.5s ease-in-out infinite",
      },
      boxShadow: {
        wisp: "0 0 6px 3px rgba(173, 216, 230, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".transform-style-preserve-3d": {
          transformStyle: "preserve-3d",
          ".rotate-y-0": { transform: "rotateY(0deg)" },
          ".rotate-y-180": { transform: "rotateY(180deg)" },
          ".perspective-1000": { perspective: "1000px" },
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
      });
    },
  ],
};
