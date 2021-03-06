import captureException from '../config/sentry'
import config from '../config'
import redis from '../config/redis'
import request from '../helpers/request'

interface Rows {
  Timestamp: Date,
  git: string,
  telegram: string
}

const searchRowsParticipants = (rows: Rows[], isFound: boolean, user: string): {
  result: string, isFound: boolean
} => {
  let result = user
  for (const row of rows) {
    if (row.git === user) {
      result = row.telegram
      isFound = true
      break
    }
  }
  return {
    result,
    isFound,
  }
}

const participantsMapping = (rows: Rows[], users: string[]): string[] => {
  const result = []
  for (const user of users) {
    const isFound = false
    const rowSearch = searchRowsParticipants(rows, isFound, user)
    if (!rowSearch.isFound) result.push(user)
    else result.push(rowSearch.result)
  }
  return result
}

export default async (participants: string) => {
  const users: string[] = participants.trimEnd().split(/[ ,]+/)

  if (!await redis.get('participants')) {
    const response = await request({
      url: `${config.get('excel.json.url')}`,
    })
    if (response.statusCode !== 200) {
      captureException(new Error(response.statusMessage))
      return users
    }
    const body = JSON.parse(response.body)
    await redis.set('participants', JSON.stringify(body.rows))
  }

  const rows: Rows[] = JSON.parse(await redis.get('participants'))

  return participantsMapping(rows, users)
}
