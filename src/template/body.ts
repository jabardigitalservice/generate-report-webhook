import regex from '../helpers/regex'
import { BodyInterface } from '../interface'
import lang from '../locales/lang'
import participants from './participants'

const bodyRegex = {
  project: regex('project: (.+)'),
  title: regex('title: (.+)'),
  participants: regex('participants: (.+)'),
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

const body = async (payload: any): Promise<BodyInterface> => {
  const body = getBody({
    project: bodyRegex.project.exec(payload.body),
    title: bodyRegex.title.exec(payload.body),
    participants: bodyRegex.participants.exec(payload.body),
  })

  delete payload.body

  if (!body.isValidBody) throw Error(lang.__('body_not_valid'))

  body.participants = await participants(body.participants)

  body.addition = payload
  body.url = payload.url
  return body
}

export default body
