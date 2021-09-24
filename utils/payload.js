import moment from 'moment'
import { payloadOption } from '../options/git.js'

const payload = (data) => {
  const property = payloadOption[data.git]
  const item = {}
  for (const key in property) {
    let payload = data
    for (const path of property[key]) {
      payload = payload[path]
    }
    item[key] = payload
  }
  item.created_at = moment().toISOString()
  return item
}

export default payload
