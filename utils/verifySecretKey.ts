import config from '../config'
import lang from './lang'

const verifySecretKey = (secret: string): void => {
  if (secret !== config.get('secret.key')) throw Error(lang.__('credential_failed'))
}

export default verifySecretKey
