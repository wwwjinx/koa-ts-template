# Koa 后端开发 Copilot 指南

本文件用于指导 GitHub Copilot 生成符合 Koa 项目需求的代码。项目技术栈包括：
- Koa
- TypeScript
- Koa Router
- Koa Body
<!-- - Koa Static -->
<!-- - Koa CORS -->
- Koa Error Handling

请根据以下说明生成代码。

---

## 项目背景

本项目是一个基于 Koa 的后端应用，使用 TypeScript 开发，主要功能包括：
- 用户认证（登录、注册）
- 数据管理（CRUD 操作）
- 文件上传

---

## 代码风格

### 1. 语法规范
- 使用 TypeScript 类型注解。
- 使用 ES6+ 语法。
- 变量和函数命名使用 camelCase。
- 路由文件名使用 kebab-case，如 `user-router.ts`。

### 2. 项目结构
- 使用 MVC 模式组织代码。
- 路由、控制器、服务和模型应分别放在 `routes`、`controllers`、`services` 和 `models` 目录中。
- 中间件放在 `middleware` 目录中。

### 3. 类型定义
- 为所有请求体、响应体和模型定义 TypeScript 接口。
- 使用 `type` 或 `interface` 定义类型。

### 4. 错误处理
- 使用 Koa 的 `ctx.throw` 抛出错误。
- 使用`src/middleware/error-handle.ts`中间件统一处理错误。

### 5. 中间件
- 将可复用的逻辑封装到中间件中。`src/middleware`
- 使用 `koa-body` 解析请求体。
<!-- - 使用 `koa-cors` 处理跨域请求。 -->

### 6. 其他
- 所有变量、函数和请求体都应定义 TypeScript 类型。
- 类型安全 避免使用 `any` 类型。

---

## 功能需求

### 1. 用户认证
- 实现登录和注册功能。
- 使用 JWT 进行身份验证。
- 使用 `koa-router` 定义路由。

### 2. 数据管理
- 实现 CRUD 操作。
- 使用 `koa-bodyparser` 解析请求体。
- 使用 `koa-static` 提供静态文件服务。

<!-- ### 3. 文件上传
- 实现文件上传功能。
- 使用 `koa-multer` 处理文件上传。 -->

### 4. 错误处理
- 使用中间件统一处理错误。
- 返回统一的错误响应格式。

---

## 示例代码

### 1. 使用 Koa Router 定义路由
```typescript
import Router from 'koa-router'
import { login, register } from '../controllers/user-controller'

const router = new Router()

router.post('/login', login)
router.post('/register', register)

export default router
```
