import Raven from 'raven'
import Config from '../config'

Raven.config(Config.get('sentry.dsn'), {
  environment: Config.get('node.env')
}).install()

const captureException = (error) => {
  if (error.message === 'body not valid') return
  Raven.captureException(error)
}

export default captureException
