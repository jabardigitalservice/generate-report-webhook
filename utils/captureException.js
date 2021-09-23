import Raven from 'raven'
import dotEnv from 'dotenv'
dotEnv.config()

Raven.config(process.env.SENTRY_DSN, {
  environment: process.env.NODE_ENV
}).install()

const captureException = (error) => {
  if (error.message === 'body not valid') return
  Raven.captureException(error)
}

export default captureException
