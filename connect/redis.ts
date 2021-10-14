import { createClient } from 'redis'
import { promisify } from 'util'
import config from '../config'

const client = createClient({
  host: config.get('redis.host'),
  port: config.get('redist.port')
})

client.on('connect', () => {
  console.log('Redis client connected')
})

client.on('error', function (error) {
  console.error(error.message)
})

export default {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  default: client
}
