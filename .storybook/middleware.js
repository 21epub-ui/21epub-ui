const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/epub360-media',
    createProxyMiddleware({
      target: 'https://cbt.21epub.com:8443',
      changeOrigin: true,
    })
  )
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://cbt.21epub.com:8443',
      changeOrigin: true,
    })
  )
  app.use(
    '/v3',
    createProxyMiddleware({
      target: 'https://cbt.21epub.com:8443',
      changeOrigin: true,
    })
  )
}
