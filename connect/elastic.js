import { Client } from '@elastic/elasticsearch'
import Config from '../config/index.js'

const client = new Client({
  cloud: {
    id: Config.get('elastic.cloud.id')
  },
  auth: {
    apiKey: Config.get('elastic.api.key')
  }
})

export default client
