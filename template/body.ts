import regex from '../utils/regex'
import { sendBodyIsNotValid } from '../send/elastic'
import { bodyInterface } from '../interface'
import { DoneCallback } from 'bull'
import lang from '../utils/lang'
import participants from './participants'

const body = async (done: DoneCallback, payload: any): Promise<bodyInterface> => {
  const body = getBody({
    project: bodyRegex.project.exec(payload.body),
    title: bodyRegex.title.exec(payload.body),
    participants: bodyRegex.participants.exec(payload.body)
  })

  delete payload.body

  if (!body.isValidBody) {
    sendBodyIsNotValid(payload)
    done()
    throw Error(lang.__('body_not_valid'))
  }
  body.participants = await participants(body.participants)
  console.log(body.participants)

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
