import Queue from 'bull'
import config from '.'

const connectQueue = (git: string) => new Queue(git, {
  redis: {
    host: config.get('redis.host'),
    port: config.get('redis.port'),
  },
})

export const git = connectQueue('git')

export const elastic = connectQueue('elastic')

export const telegramSendUser = connectQueue('telegramSendUser')
