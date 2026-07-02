### koa设置响应头

response.header
响应标头对象。

response.headers
响应标头对象。别名是 response.header。

ctx.set 是 ctx.response.set 的别名，功能完全一致，但更简洁，推荐使用。
```javascript
ctx.set('Content-Type', 'application/json')
```

### koa 设置自定义context
types/koa.ts 不能用.d.ts结尾，否则有其他错误
```typescript
// 类型文件
declare module 'koa' {
  interface DefaultContext {
    data: unknown
  }
}
```

```typescript
import type { Context, DefaultState } from 'koa'
import Router from 'koa-router'

// 解决 ts 无法识别 自定义类型问题
const router = new Router<DefaultState, Context>({
  prefix: '/dict',
})
```

### 错误处理
在middleware/error-handler.ts中统一处理错误
```typescript
import createError from 'http-errors'

// 使用 ctx.throw() createError 抛出错误
ctx.throw(createError(401, 'test Error get'))

// ctx.throw(createError.NotFound('test error'))
```
