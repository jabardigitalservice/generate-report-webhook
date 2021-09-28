import config from '../config'

const verifySecretKey = async (secret: string): Promise<void> => {
  if (secret !== config.get('secret.key')) throw Error('Credential is invalid')
}

export default verifySecretKey
