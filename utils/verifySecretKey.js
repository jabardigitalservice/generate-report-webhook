import Config from '../config/index.js'

const verifySecretKey = async (secret) => {
  if (secret !== Config.get('secret.key')) throw Error('Credential is invalid')
}

export default verifySecretKey
