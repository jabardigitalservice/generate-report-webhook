import { Client } from '@elastic/elasticsearch'
import config from '.'

const client = new Client({
  cloud: {
    id: config.get('elastic.cloud.id')
  },
  auth: {
    apiKey: config.get('elastic.api.key')
  }
})

export default client
