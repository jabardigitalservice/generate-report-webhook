import config from 'env-dot-prop'
import dotEnv from 'dotenv'
dotEnv.config()

config.set('dir', 'tmp')

export default config
