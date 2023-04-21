import { createProxyMiddleware } from 'http-proxy-middleware'

const middleware = (app) => {
  app.use(
    '/epub360-media',
    createProxyMiddleware({
      target: 'https://cbt.21epub.com/',
      changeOrigin: true,
      secure: false,
    })
  )
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://cbt.21epub.com/',
      changeOrigin: true,
      secure: false,
    })
  )
  app.use(
    '/v3',
    createProxyMiddleware({
      target: 'https://cbt.21epub.com/',
      changeOrigin: true,
      secure: false,
    })
  )
}

export default middleware
