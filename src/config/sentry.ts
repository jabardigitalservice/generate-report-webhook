import raven from 'raven'
import config from '.'
import lang from '../locales/lang'

raven.config(config.get('sentry.dsn'), {
  environment: config.get('node.env'),
}).install()

const captureException = (error: Error): void => {
  if (error.message !== lang.__('body_not_valid')) raven.captureException(error)
}

export default captureException
