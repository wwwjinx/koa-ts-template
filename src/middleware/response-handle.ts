import type { Context, Next } from 'koa'
import { ResponseCode, ResponseMsg } from '@/enums/index.js'

async function responseHandle(ctx: Context, next: Next) {
  await next()

  if (ctx.data === undefined)
    return

  ctx.body = {
    code: ResponseCode.SUCCESS,
    msg: ResponseMsg.SUCCESS,
    data: ctx.data,
  }
}

export default responseHandle
