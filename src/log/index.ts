import type Koa from 'koa'
import path from 'node:path'
import { getClientIpAddress, getDirname } from '@/utils/index.js'
import log4js from 'log4js'

log4js.configure({
  pm2: true,
  appenders: {
    everything: {
      type: 'dateFile',
      filename: path.join(getDirname(import.meta.url), './all/all.log'),
      pattern: 'yyyy-MM-dd', // 日期格式，每天一个文件
      compress: false, // 是否压缩旧日志文件
      numBackups: 30, // 保留最近 7 天的日志
      keepFileExt: true, // 保留文件扩展名
      alwaysIncludePattern: true,
    },
    debugger: {
      type: 'dateFile',
      filename: path.join(getDirname(import.meta.url), './all/debugger.log'),
      pattern: 'yyyy-MM-dd', // 日期格式，每天一个文件
      compress: false, // 是否压缩旧日志文件
      numBackups: 30, // 保留最近 7 天的日志
      keepFileExt: true, // 保留文件扩展名
      alwaysIncludePattern: true,
    },
    error: {
      type: 'dateFile',
      filename: path.join(getDirname(import.meta.url), './all/error.log'),
      pattern: 'yyyy-MM-dd', // 日期格式，每天一个文件
      compress: false, // 是否压缩旧日志文件
      numBackups: 30, // 保留最近 7 天的日志
      keepFileExt: true, // 保留文件扩展名
      alwaysIncludePattern: true,
    },
  },
  // key 用于 logger.getLogger(key)
  categories: {
    default: { appenders: ['everything'], level: 'debug' },
    debug: { appenders: ['debugger'], level: 'debug' },
    error: { appenders: ['error'], level: 'debug' },
  },
})

export const logger = log4js.getLogger()
export const errLogger = log4js.getLogger('error')
export const debugLogger = log4js.getLogger('debug')

export async function loggerMiddleware(ctx: Koa.Context, next: Koa.Next) {
  // 请求开始时间
  const start = new Date()

  await next()

  // 结束时间
  const ms = Number(new Date()) - Number(start)

  // 打印出请求相关参数
  const remoteAddress = getClientIpAddress(ctx)

  const logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数: ${JSON.stringify(ctx.request.body)} 响应参数: ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`

  logger.info(logText)
}
