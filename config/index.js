import Config from 'env-dot-prop'
import dotEnv from 'dotenv'
dotEnv.config()

Config.set('password', Buffer.from(Config.get('password'), 'base64').toString())

export default Config
