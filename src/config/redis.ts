import { createClient } from 'redis'
import { promisify } from 'util'
import config from '.'

const client = createClient({
  host: config.get('redis.host'),
  port: config.get('redist.port'),
})

client.on('error', (error: Error) => {
  console.error(error.message)
})

export default {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
}
