module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: process.env.NODE_ENV === 'coverage' ? ['istanbul'] : []
}
