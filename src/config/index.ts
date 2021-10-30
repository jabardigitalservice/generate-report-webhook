import config from 'env-dot-prop'
import dotEnv from 'dotenv'

dotEnv.config({
  path: '../../.env'
})

if (!config.get('node.env')) dotEnv.config()

config.set('dir', 'tmp')

export default config
