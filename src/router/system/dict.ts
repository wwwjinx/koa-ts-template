import type { Context, DefaultState } from 'koa'
import Router from 'koa-router'

// 解决 ts 无法识别 自定义类型问题
const router = new Router<DefaultState, Context>({
  prefix: '/dict',
})

router.get('/getDict/:dictName', async (ctx) => {
  const params = ctx.params

  ctx.data = [
    { dictValue: '1', dictLabel: '男', dictName: params.dictName },
    { dictValue: '2', dictLabel: '女', dictName: params.dictName },
  ]
})

export default router
