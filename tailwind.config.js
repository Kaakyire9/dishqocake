/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dishqo: {
          gold: '#FDBE3B',
          deep: '#F4A100',
          orange: '#F89C27',
          black: '#000000',
          cream: '#FFF9F0',
        },
        elegant: {
          cream: '#FFF6EE', // background
          cocoa: '#4B3426', // primary text
          apricot: '#F79A4B', // CTA
          gold: '#D99B2A', // accent
          lavender: '#F0E9F7', // soft accent (warmer/lavender decorative)
          muted: '#8C7A6B',
        },
        semantic: {
          'bg-surface': '#FFF6EE',
          'text-primary': '#4B3426',
          'btn-cta': '#F89C27',
          'btn-cta-hover': '#D46F2E',
          'accent-gold': '#D99B2A',
          // neutral / utility tokens
          'surface-card': '#FFFFFF',
          'surface-muted': '#F5F5F4',
          'surface-ghost': '#ffffff0f',
          'text-muted': '#6B6B6B',
          'soft-accent': '#FFF8E6',
          'overlay-dark': '#0f1720',
        },
      },
    },
  },
  plugins: [],
};
