import http from 'node:http'
import process from 'node:process'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import { loggerMiddleware } from './log/index.js'
import errorHandle from './middleware/error-handle.js'
import responseHandle from './middleware/response-handle.js'
import router from './router/index.js'
import { getIpAddress } from './utils/index.js'
import './config/index.js'

const port = process.env.APP_PORT || 3001
const app = new Koa()

// 使用 koa-body 中间件
app.use(koaBody())

// 日志
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandle)

// 响应中间件
app.use(responseHandle)

// 使用路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

const server = http.createServer(app.callback())

server.listen(port)

server.on('error', (err: Error) => {
  // eslint-disable-next-line no-console
  console.log('server error', err)
})

server.on('listening', () => {
  const ip = getIpAddress()
  const address = `http://${ip}:${port}`
  const localAddress = `http://localhost:${port}`
  // eslint-disable-next-line no-console
  console.log(`app started at address \n${localAddress}\n${address}`)
})
