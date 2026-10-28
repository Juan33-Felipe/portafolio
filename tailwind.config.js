/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#070709',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"FSP DEMO - PODIUM Sharp 4.11"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-button': '0 8px 32px 0 rgba(255, 255, 255, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
        'glass-hover': '0 12px 40px 0 rgba(255, 255, 255, 0.16), inset 0 1px 2px 0 rgba(255, 255, 255, 0.45)',
      },
    },
  },
  plugins: [],
};
