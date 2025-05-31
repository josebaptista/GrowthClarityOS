module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#1ABC9C',
        accent: '#E74C3C',
        neutralLight: '#F7F9FA',
        neutralGray: '#CED4DA',
        neutralDark: '#34495E',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
