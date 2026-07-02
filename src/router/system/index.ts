import type { Context, DefaultState } from 'koa'
import Router from 'koa-router'
import dictRouter from './dict.js'

const router = new Router<DefaultState, Context>({
  prefix: '/system',
})

router.use(dictRouter.routes(), dictRouter.allowedMethods())

export default router
