module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": true,
        "custom-media-queries": true
      }
    }
  }
}
