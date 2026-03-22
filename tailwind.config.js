/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        brand: {
          navy:   '#0f2d5e',
          blue:   '#1a56db',
          sky:    '#0ea5e9',
          teal:   '#0d9488',
          green:  '#059669',
          gold:   '#d97706',
          light:  '#f0f7ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, #0f2d5e 0%, #1a56db 50%, #0ea5e9 100%)",
        'cta-pattern':  "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
      },
    },
  },
  plugins: [],
};
