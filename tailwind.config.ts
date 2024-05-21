import {nextui} from '@nextui-org/theme';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}, // Note the addition of the app directory.\r\n    ./pages/**/*.{js,ts,jsx,tsx,mdx},\r\n    ./components/**/*.{js,ts,jsx,tsx,mdx},\r\n \r\n    // Or if using src directory:\r\n    ./src/**/*.{js,ts,jsx,tsx,mdx},",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}