import request from 'request'
import util from 'util'

const sendRequest = () => util.promisify(request)

export default sendRequest()
