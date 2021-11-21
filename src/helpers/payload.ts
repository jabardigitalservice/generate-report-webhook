import moment from 'moment'
import { PayloadInterface } from '../interface'
import { payloadOption } from '../config/git'

const payload = (data: any): PayloadInterface => {
  const { git } = data
  const property:any = payloadOption[git]
  const item: any = {}
  for (const key in property) {
    let payload = data
    for (const path of property[key]) {
      payload = payload[path]
    }
    item[key] = payload
  }
  item.createdAt = moment().toISOString()
  return item
}

export default payload
