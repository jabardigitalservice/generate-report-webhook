import regex from '../utils/regex.js'
import { sendBodyIsNotValid } from './sendElastic.js'

const templateBody = async (done, payload) => {
  const body = getBody({
    project: payloadRegex.project.exec(payload.body),
    title: payloadRegex.title.exec(payload.body),
    participants: payloadRegex.participants.exec(payload.body)
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

const getBody = (body) => {
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

const payloadRegex = {
  project: regex('project: (.+)'),
  title: regex('title: (.+)'),
  participants: regex('participants: (.+)')
}

export default templateBody
