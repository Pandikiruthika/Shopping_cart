/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: { min: '0px', max: '640px' }, // mobile view
      smmd: { min: '641px', max: '767px' }, // small tablets
      md: { min: '768px', max: '1023px' }, // iPad view
      lg: { min: '1024px', max: '1366px' }, // Updated laptop screen size range
      xl: { min: '1367px', max: '1440px' }, // desktop
      '2xl': { min: '1441px', max: '1536px' }, // large desktop
      '3xl': { min: '1537px', max: '1599px' }, // 4k screen
      '4xl': { min: '1600px', max: '1700px' },
      tall: { raw: '(min-height: 645px)' },
      extratall: { raw: '(min-height: 739px)' },
    },

    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      ctr: '12px 12px 12px 1px rgb(0 0 0 / 0...)', // continue your box-shadow settings
    },
  },
};
