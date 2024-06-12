import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      screens: {
        sm: '520px',
        md: '720px',
        lg: '900px',
        xl: '1080px',
        xxl: '1600px',
      },
      colors: {
        customGray: {
          50: 'rgb(221, 221, 221)',
          100: 'rgb(110, 110, 110)',
          500: 'rgb(68, 68, 68)',
          600: 'rgb(26, 26, 26)',
        },
        green: {
          DEFAULT: 'rgb(17, 158, 0)',
          dark: 'rgb(0, 82, 0)',
          darker: 'rgb(0, 125, 0)',
          light: 'rgb(238, 247, 237)'
        }
      },
    },
    maxWidth: {
      '1156': '1156px',
    },

  }
} satisfies Config;