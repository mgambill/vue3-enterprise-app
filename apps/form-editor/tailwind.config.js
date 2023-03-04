const customScrollbarPlugin = function ({ addUtilities }) {
  addUtilities({
    '.custom-scrollbar': {
      '--scrollbar-width': '2px',
      '--scrollbar-track-width': '0',
      '--scrollbar-track-height': '0',
      '--scrollbar-thumb-width': 'auto',
      '--scrollbar-thumb-height': 'auto',
      '--scrollbar-bg': 'transparent',
      '--scrollbar-track-bg': 'slate-100',
      '--scrollbar-thumb-bg': 'slate-300',
      '--scrollbar-thumb-rounded': '0',
      '--scrollbar-track-rounded': '0',
    },
    '.dark-mode .custom-scrollbar': {
      '--scrollbar-track-bg': 'zinc-100',
      '--scrollbar-thumb-bg': 'slate-500',
    },
  });
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        100: "26rem",
        104: "34rem",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addVariant }) {
      addVariant("children", "& > *");
    },
    customScrollbarPlugin,
  ],
}