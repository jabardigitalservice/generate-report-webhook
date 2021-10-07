import config from 'env-dot-prop'
import dotEnv from 'dotenv'
dotEnv.config()

if (!config.get('node.env')) dotEnv.config({
  path: '../.env'
})

config.set('dir', 'tmp')

export default config
