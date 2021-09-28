import regex from '../utils/regex'
import { sendBodyIsNotValid } from '../send/elastic'
import { bodyInterface } from '../interface'
import Bull from 'bull'

const body = async (done: Bull.DoneCallback, payload: any): Promise<bodyInterface> => {
  const body = getBody({
    project: bodyRegex.project.exec(payload.body),
    title: bodyRegex.title.exec(payload.body),
    participants: bodyRegex.participants.exec(payload.body)
  })

  delete payload.body

  if (!body.isValidBody) {
    sendBodyIsNotValid(payload)
    done()
    throw Error('body not valid')
  }

  body.addition = payload
  body.url = payload.url
  return body
}

const getBody = (body: any) => {
  let isValidBody = true
  for (const item in body) {
    if (body[item] === null) {
      isValidBody = false
      break
    }
    body[item] = body[item][1]
  }
  body.isValidBody = isValidBody

  return body
}

const bodyRegex = {
  project: regex('project: (.+)'),
  title: regex('title: (.+)'),
  participants: regex('participants: (.+)')
}

export default body
