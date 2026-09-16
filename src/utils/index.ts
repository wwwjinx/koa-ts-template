import type { Context } from 'koa'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function getIpAddress() {
  const interfaces = os.networkInterfaces()

  for (const devName in interfaces) {
    const temp = interfaces[devName]

    if (!temp)
      continue

    for (const alias of temp) {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address
    }
  }
}

export function getClientIpAddress(ctx: Context) {
  return ctx.ip || '0.0.0.0'
}

export function getDirname(url: string) {
  return path.dirname(fileURLToPath(url))
}
