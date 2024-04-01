/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: [
    "./apps/blog/src/**/*.{html,ts}",
    "./apps/dashboard/src/**/*.{html,ts}",
    "./libs/shared/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
