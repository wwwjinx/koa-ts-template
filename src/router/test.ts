import createError from 'http-errors'
import Router from 'koa-router'

const router = new Router({
  prefix: '/test',
})

router.get('/err', async (ctx) => {
  ctx.throw(createError[501]('test error'))
})

// router.get(['/:id', '/'], async (ctx) => {
//   const params = ctx.params
//   if (params.id) {
//     ctx.body = {
//       content: `test get success, id: ${params.id}`,
//     }
//   }
//   else {
//     ctx.body = {
//       content: `test get success`,
//     }
//   }
// })

router.post('/', async (ctx) => {
  ctx.body = {
    content: 'test post success',
    data: ctx.request.body,
  }
})

export default router
