import type { HttpError } from 'http-errors'
import type { Context, Next } from 'koa'
import process from 'node:process'
import { ResponseCode, ResponseMsg } from '@/enums/index.js'
import { errLogger } from '../log/index.js'

function isHttpError(err: unknown): err is HttpError {
  return typeof err === 'object' && err !== null && 'message' in err
}

/**
 * Unified error handler.
 * Throw with ctx.throw() or http-errors, e.g. ctx.throw(401, 'unauthorized')
 */
async function errorHandle(ctx: Context, next: Next) {
  try {
    await next()
  }
  catch (err: unknown) {
    if (process.env.NODE_ENV === 'dev') {
      console.error('====================')
      console.error(err)
      console.error('====================')
    }

    const httpError = isHttpError(err) ? err : undefined

    ctx.body = {
      code: httpError?.statusCode || ResponseCode.ERROR,
      data: null,
      message: httpError?.message || ResponseMsg.ERROR,
    }

    ctx.status = 200

    errLogger.error(err)
  }
}

export default errorHandle
