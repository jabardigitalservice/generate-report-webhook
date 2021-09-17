import { sendBodyIsNotValid } from './sendElastic.js'

const templateBody = async (done, payload) => {
  const payloadBody = payload.body.toLowerCase()
  const body = getBodyValid({
    project: payloadRegex.project.exec(payloadBody),
    title: payloadRegex.title.exec(payloadBody),
    participants: payloadRegex.participants.exec(payloadBody)
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

const getBodyValid = (body) => {
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

const regex = (string) => {
  return new RegExp(string)
}

const payloadRegex = {
  project: regex('project: (.+)'),
  title: regex('title: (.+)'),
  participants: regex('participants: (.+)')
}

export default templateBody
