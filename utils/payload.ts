import moment from 'moment'
import { payloadOption } from '../options/git'

interface payloadInterface {
  repositoryName: string,
  repositoryUrl: string,
  platform: string,
  url: string,
  body: string,
  createdBy: string,
  createdAt: Date
}

const payload = (data: any): payloadInterface => {
  const git: string = data.git
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
