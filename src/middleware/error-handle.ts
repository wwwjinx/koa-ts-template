import type { HttpError } from 'http-errors'
import type { Context, Next } from 'koa'
import process from 'node:process'
import { ResponseCode, ResponseMsg } from '@/emuns/index.js'
import { errLogger, logger } from '../log/index.js'

/**
 * 错误处理
 * 抛出错误 ctx.throw({
    code: 5010,
    message: 'test Error get',
  })
 */
async function errorHandle(ctx: Context, next: Next) {
  return next().catch((err: HttpError) => {
    if (process.env.NODE_ENV === 'dev') {
      console.log('====================')
      console.log(err)
      console.log('====================')
    }

    ctx.body = {
      code: err.statusCode || ResponseCode.ERROR,
      data: null,
      message: err.message || ResponseMsg.ERROR,
    }

    // 保证返回状态是 200
    ctx.status = 200

    // 错误日志
    errLogger.error(err)

    return Promise.resolve()
  })
}

export default errorHandle
