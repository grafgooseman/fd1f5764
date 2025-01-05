/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2AC420',
        secondary: '#233142',
        theme: {
          // Light theme colors
          light: {
            bg: {
              primary: '#FFFFFF',    // Previously bg-white
              secondary: '#F9FAFB',  // Previously bg-gray-50
            },
            text: {
              primary: '#111827',    // Previously text-gray-900
              secondary: '#6B7280',  // Previously text-gray-500
              tertiary: '#9CA3AF',   // Previously text-gray-400
            },
            border: {
              primary: '#E5E7EB',    // Previously border-gray-100
              secondary: '#D1D5DB',  // Previously border-gray-300
            }
          },
          // Dark theme colors
          dark: {
            bg: {
              primary: '#1F2937',
              secondary: '#111827',
            },
            text: {
              primary: '#F9FAFB',
              secondary: '#D1D5DB',
              tertiary: '#9CA3AF',
            },
            border: {
              primary: '#374151',
              secondary: '#4B5563',
            }
          }
        }
      }
    },
  },
  plugins: [],
}