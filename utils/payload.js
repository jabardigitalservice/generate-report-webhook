import moment from 'moment'
import { payloadOptions } from '../options/git'

const payload = (data) => {
  const property = payloadOptions[data.git]
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
