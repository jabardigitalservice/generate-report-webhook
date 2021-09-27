import Config from 'env-dot-prop'
import dotEnv from 'dotenv'
dotEnv.config()

Config.set('dir', 'tmp')

export default Config
