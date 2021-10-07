import config from '../config'
import request from '../utils/request'

interface rows {
  Timestamp: Date,
  git: string,
  telegram: string
}

export default async (participants: string) => {
  const users: string[] = participants.trimEnd().split(/[ ,]+/)

  const response = await request({
    url: `${config.get('excel.json.url')}`
  })

  if (response.statusCode !== 200) return participants
  const body = JSON.parse(response.body)
  const rows: rows[] = body.rows

  let result = ''
  for (const user of users) {
    let isFound = false
    for (const row of rows) {
      if (row.git === user) {
        result += `${row.telegram} `
        isFound = true
        break
      }
    }
    if (!isFound) result += `${user} `
  }

  return result
}
