import request from 'request'
import util from 'util'

const sendRequest = () => {
  return util.promisify(request)
}

export default sendRequest()
