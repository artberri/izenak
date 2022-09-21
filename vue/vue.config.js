const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  pwa: {
    name: 'Izenak',
    themeColor: '#ffffff',
    msTileColor: '#ffffff'
  },
  configureWebpack: {
    devtool: 'eval-source-map',
    plugins: process.env.NODE_ENV === 'coverage' ? [] : [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [ '/', '/neskak', '/mutilak', '/guztiak', '/gogokoak', '/honiburuz' ],
        renderer: new Renderer({
          skipThirdPartyRequests: true
        })
      })
    ]
  }
}
