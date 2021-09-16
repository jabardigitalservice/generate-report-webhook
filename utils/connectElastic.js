import dotEnv from 'dotenv'
import { Client } from '@elastic/elasticsearch'

dotEnv.config()

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID
  },
  auth: {
    apiKey: process.env.ELASTIC_API_KEY
  }
})

export default client
