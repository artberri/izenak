const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  configureWebpack: {
    devtool: 'eval-source-map',
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [ '/', '/neskak', '/mutilak', '/guztiak', '/gogokoak', '/honiburuz' ]
      })
    ]
  }
}
