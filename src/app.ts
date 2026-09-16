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
import './types/koa.js'

const port = Number(process.env.APP_PORT) || 3001
const app = new Koa()

app.proxy = false

app.use(errorHandle)

app.use(koaBody({
  jsonLimit: '1mb',
  formLimit: '1mb',
  textLimit: '1mb',
  multipart: false,
}))

app.use(loggerMiddleware)
app.use(responseHandle)
app.use(router.routes())
app.use(router.allowedMethods())

app.use((ctx) => {
  ctx.throw(404, 'not found')
})

const server = http.createServer(app.callback())

server.listen(port)

server.on('error', (err: Error) => {
  console.error('server error', err)
  process.exit(1)
})

server.on('listening', () => {
  const ip = getIpAddress()
  const address = `http://${ip}:${port}`
  const localAddress = `http://localhost:${port}`
  console.warn(`app started at address \n${localAddress}\n${address}`)
})
