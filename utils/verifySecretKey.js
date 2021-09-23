import Config from '../config'

const verifySecretKey = async (secret) => {
  if (secret !== Config.get('secret')) throw Error('Credential is invalid')
}

export default verifySecretKey
