import Queue from 'bull'
import config from '../config'

const connectQueue = (git: string) => {
  return new Queue(git, {
    redis: {
      host: config.get('redis.host'),
      port: config.get('redis.port')
    }
  })
}

export default connectQueue
