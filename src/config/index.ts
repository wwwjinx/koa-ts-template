import process from 'node:process'
import dotenv from 'dotenv'

export const isDev = process.env.NODE_ENV === 'dev'

const envFilePath = isDev ? '.dev.env' : '.prod.env'
const envFile = `${process.cwd()}/env/${envFilePath}`

dotenv.config({ path: envFile, quiet: true })

export default process.env
