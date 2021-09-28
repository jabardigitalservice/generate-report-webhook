import raven from 'raven'
import config from '../config'

raven.config(config.get('sentry.dsn'), {
  environment: config.get('node.env')
}).install()

const captureException = (error: Error): void => {
  if (error.message !== 'body not valid') raven.captureException(error)
}

export default captureException
