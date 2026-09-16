import type { Context, Next } from 'koa'
import path from 'node:path'
import process from 'node:process'
import log4js from 'log4js'
import { getClientIpAddress } from '@/utils/index.js'

const logDir = path.join(process.cwd(), 'logs')

log4js.configure({
  pm2: true,
  appenders: {
    everything: {
      type: 'dateFile',
      filename: path.join(logDir, 'all.log'),
      pattern: 'yyyy-MM-dd',
      compress: false,
      numBackups: 30,
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
    debugger: {
      type: 'dateFile',
      filename: path.join(logDir, 'debugger.log'),
      pattern: 'yyyy-MM-dd',
      compress: false,
      numBackups: 30,
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
    error: {
      type: 'dateFile',
      filename: path.join(logDir, 'error.log'),
      pattern: 'yyyy-MM-dd',
      compress: false,
      numBackups: 30,
      keepFileExt: true,
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: { appenders: ['everything'], level: 'debug' },
    debug: { appenders: ['debugger'], level: 'debug' },
    error: { appenders: ['error'], level: 'debug' },
  },
})

export const logger = log4js.getLogger()
export const errLogger = log4js.getLogger('error')
export const debugLogger = log4js.getLogger('debug')

export async function loggerMiddleware(ctx: Context, next: Next) {
  const start = Date.now()

  await next()

  const ms = Date.now() - start
  const remoteAddress = getClientIpAddress(ctx)
  const logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数: ${JSON.stringify(ctx.request.body)} 响应参数: ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`

  logger.info(logText)
}
