/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#09090b",
        "surface": "#0c0c0f",
        "surface-dim": "#0c0c0f",
        "surface-container-lowest": "#09090b",
        "surface-container-low": "#0f0f12",
        "surface-container": "#121215",
        "surface-container-high": "#18181b",
        "surface-container-highest": "#1e1e22",
        "surface-variant": "#18181b",
        "surface-bright": "#18181b",

        // Specific Stitch container surfaces
        "surface-card": "#0E0F0D",
        "surface-sheet": "#1A1C19",
        "surface-item": "#141613",
        "surface-total": "#222521",
        "surface-track": "#1F221D",

        // Accent & Brand colors
        "lime": "#C7F464",
        "lime-accent": "#C7F464",
        "tertiary": "#34d399",
        "tertiary-container": "#065f46",
        "tertiary-fixed": "#bbf7d0",
        "primary": "#a78bfa",
        "primary-container": "#7c3aed",
        "on-primary": "#0a0012",
        "on-surface": "#fafafa",
        "on-surface-variant": "#a1a1aa",
        "on-background": "#fafafa",
        "secondary": "#71717a",
        "secondary-container": "#27272a",
        "secondary-fixed": "#a1a1aa",
        "outline": "#52525b",
        "outline-variant": "#27272a",
        "error": "#ef4444",
        "error-container": "#3b1111"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.75rem", // 28px for Stitch cards
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "display": ["Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "body": ["Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "mono": ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
}
