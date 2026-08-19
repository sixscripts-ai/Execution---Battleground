/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#090A0C",
        surface: "#0F1216",
        surface2: "#161B22",
        surfaceHover: "#1C222B",
        code: "#060709",
        codeBorder: "#1C2128",
        border: "#1E242C",
        borderStrong: "#2E3642",
        lineNo: "#4B5563",
        codeFg: "#E6EDF3",
        muted: "#8A94A4",
        accent: {
          DEFAULT: "#007EEF",
          yellow: "#FDD07B",
          pink: "#F58DE3",
          green: "#10B981",
          cyan: "#38BDF8"
        },
        danger: "#F43F5E",
        success: "#10B981",
        warn: "#F59E0B"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        'glow-radial': "radial-gradient(circle at 50% 0%, rgba(0, 126, 239, 0.15), transparent 70%)",
        'hero-gradient': "linear-gradient(180deg, rgba(253, 208, 123, 0.05) 0%, rgba(0, 126, 239, 0.05) 50%, rgba(9, 10, 12, 1) 100%)",
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
