import type { Context, Next } from 'koa'
import { ResponseCode, ResponseMsg } from '@/emuns/index.js'

async function responseHandle(ctx: Context, next: Next) {
  await next()
  ctx.body = {
    code: ResponseCode.SUCCESS,
    msg: ResponseMsg.SUCCESS,
    data: ctx.data,
  }
}
export default responseHandle
