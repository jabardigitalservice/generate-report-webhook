import Raven from 'raven'
import Config from '../config'

Raven.config(Config.get('sentry.dsn'), {
  environment: Config.get('node.env')
}).install()

const captureException = (error: any): void => {
  if (error.message !== 'body not valid') Raven.captureException(error)
}

export default captureException
