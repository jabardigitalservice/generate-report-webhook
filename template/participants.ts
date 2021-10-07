import captureException from '../capture/exception'
import config from '../config'
import lang from '../utils/lang'
import request from '../utils/request'

interface rows {
  Timestamp: Date,
  git: string,
  telegram: string
}

const participantsMapping = (rows: rows[], users: string[]): string => {
  let result = ''
  for (const user of users) {
    let isFound = false
    const rowSearch = searchRowsParticipants(rows, isFound, user)
    if (!rowSearch.isFound) result += `${user} `
    else result += rowSearch.result
  }
  return result
}

const searchRowsParticipants = (rows: rows[], isFound: boolean, user: string): {
  result: string, isFound: boolean
} => {
  let result = ''
  for (const row of rows) {
    if (row.git === user) {
      result = `${row.telegram} `
      isFound = true
      break
    }
  }
  return {
    result,
    isFound
  }
}

export default async (participants: string) => {
  const users: string[] = participants.trimEnd().split(/[ ,]+/)

  const response = await request({
    url: `${config.get('excel.json.url')}`
  })

  if (response.statusCode !== 200) {
    captureException(new Error(lang.__('excel_json_url_failed')))
    return participants
  }
  const body = JSON.parse(response.body)
  const rows: rows[] = body.rows

  return participantsMapping(rows, users)
}
