import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontSize: {
        '2xl' : ['1.5rem', '2rem'],
      },
      fontFamily: {
        instrument: ['"Instrument Sans"', 'sans-serif'],
      },
      screens: {
        sm: '520px',
        md: '720px',
        lg: '900px',
        xl: '1080px',
        xxl: '1600px',
      },
      colors: {
        gray: {
          // hownameit?: 'rgb(242, 242, 242)',
          // lightest: 'rgb(221, 221, 221)',
          // light: 'rgb(110, 110, 110)',
          // DEFAULT: 'rgb(68, 68, 68)',
          // dark: 'rgb(26, 26, 26)',
          '100': 'rgb(242, 242, 242)', // lightest
          '200': 'rgb(221, 221, 221)',
          '250': 'rgb(148, 148, 148)',
          '300': 'rgb(110, 110, 110)',
          '400': 'rgb(68, 68, 68)',
          '500': 'rgb(26, 26, 26)',
        },
        green: {
          // DEFAULT: 'rgb(17, 158, 0)',
          // dark: 'rgb(0, 82, 0)',
          // darker: 'rgb(0, 125, 0)',
          // light: 'rgb(238, 247, 237)'
          '50': 'rgb(242, 242, 242)',
          '100': 'rgb(238, 247, 237)',
          '200': 'rgb(17, 158, 0)',
          '300': 'rgb(0, 125, 0)',
          '400': 'rgb(0, 82, 0)',
        }
      },
    },
    boxShadow: {
      'custom-sm': 'rgba(0, 0, 0, 0.08) 0px 2px 4px 0px, rgba(0, 0, 0, 0.08) 0px 0px 2px 1px',
    },
    transitionTimingFunction: {
      'custom-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transitionDuration: {
      '300': '300ms',
      '100' : '100ms',
    },
    maxWidth: {
      '1156': '1156px',
    },

  }
} satisfies Config;