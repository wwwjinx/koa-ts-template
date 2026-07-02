import type { Context, DefaultState } from 'koa'
import Router from 'koa-router'
import systemRouter from './system/index.js'
import testRouter from './test.js'

const router = new Router<DefaultState, Context>()

router.use(testRouter.routes(), testRouter.allowedMethods())

router.use(systemRouter.routes(), systemRouter.allowedMethods())

export default router
