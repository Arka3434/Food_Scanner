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
        "primary": "#006948",
        "primary-accent": "#059669",
        "primary-container": "#00855d",
        "on-primary": "#ffffff",
        "on-primary-container": "#f5fff7",
        "primary-fixed": "#85f8c4",
        "primary-fixed-dim": "#68dba9",
        "on-primary-fixed": "#002114",
        "on-primary-fixed-variant": "#005137",
        "inverse-primary": "#68dba9",

        "secondary": "#006c49",
        "secondary-accent": "#10b981",
        "secondary-container": "#6cf8bb",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#00714d",
        "secondary-fixed": "#6ffbbe",
        "secondary-fixed-dim": "#4edea3",
        "on-secondary-fixed": "#002113",
        "on-secondary-fixed-variant": "#005236",

        "tertiary": "#505f59",
        "tertiary-container": "#687872",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#f4fff9",
        "tertiary-fixed": "#d5e6df",
        "tertiary-fixed-dim": "#bacac3",
        "on-tertiary-fixed": "#101e1a",
        "on-tertiary-fixed-variant": "#3b4a44",

        "surface": "#f7f9fb",
        "surface-bright": "#f7f9fb",
        "surface-dim": "#d8dadc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "surface-variant": "#e0e3e5",
        "surface-tint": "#006c4a",

        "on-surface": "#191c1e",
        "on-surface-variant": "#3d4a42",
        "outline": "#6d7a72",
        "outline-variant": "#bccac0",
        "background": "#f7f9fb",
        "on-background": "#191c1e",
        "inverse-surface": "#2d3133",
        "inverse-on-surface": "#eff1f3",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.5rem", // 8px baseline
        "sm": "0.25rem",     // 4px
        "md": "0.5rem",      // 8px
        "lg": "0.75rem",     // 12px
        "xl": "1rem",        // 16px standard card
        "2xl": "1.5rem",     // 24px major container
        "full": "9999px"
      },
      spacing: {
        "space-xs": "0.25rem", // 4px
        "space-sm": "0.5rem",  // 8px
        "space-md": "1rem",    // 16px
        "space-lg": "1.5rem",  // 24px
        "space-xl": "2.5rem",  // 40px
        "gutter": "1.5rem",
        "margin": "2rem"
      },
      fontFamily: {
        "headline": ["Manrope", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        "body": ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"]
      },
      boxShadow: {
        "stitch-card": "0 4px 20px rgba(5, 150, 105, 0.04)",
        "stitch-btn": "0 4px 20px rgba(5, 150, 105, 0.24)",
        "stitch-fab": "0 8px 30px rgba(5, 150, 105, 0.3)"
      }
    }
  },
  plugins: []
}
