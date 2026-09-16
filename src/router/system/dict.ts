import type { Context, DefaultState } from 'koa'
import Router from '@koa/router'

const router = new Router<DefaultState, Context>({
  prefix: '/dict',
})

router.get('/getDict/:dictName', (ctx) => {
  const params = ctx.params

  ctx.data = [
    { dictValue: '1', dictLabel: '男', dictName: params.dictName },
    { dictValue: '2', dictLabel: '女', dictName: params.dictName },
  ]
})

export default router
