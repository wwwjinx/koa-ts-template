import Router from '@koa/router'
import createError from 'http-errors'

const router = new Router({
  prefix: '/test',
})

router.get('/err', (ctx) => {
  ctx.throw(createError(501, 'test error'))
})

router.post('/', (ctx) => {
  ctx.data = {
    content: 'test post success',
    data: ctx.request.body,
  }
})

export default router
