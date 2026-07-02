import fs from 'node:fs'
// 导入process
import process from 'node:process'
// 导入dotenv
import dotenv from 'dotenv'

export const isDev = process.env.NODE_ENV === 'dev'

// 根据 NODE_ENV 加载不同的 .env 文件
const envFilePath = !isDev ? '.prod.env' : '.dev.env'

const rootPath = process.cwd()

const envFile = `${rootPath}/env/${envFilePath}`

// 检查文件是否存在
dotenv.config({ path: envFile })
// if (fs.existsSync(envFile)) {
// }
// else {
//   console.error(`环境文件 ${envFile} 不存在`)
// }

// 导出env的环境变量
export default process.env
