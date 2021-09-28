import regex from '../utils/regex'
import { sendBodyIsNotValid } from '../send/elastic'

interface bodyValidInterface {
  project: string,
  title: string,
  participants: string,
  isValidBody: boolean,
  url: string,
  addition: {
    repositoryName: string,
    repositoryUrl: string,
    platform: string,
    url: string,
    body: string,
    createdBy: string,
    createdAt: Date
  }
}

const body = async (done: any, payload: any): Promise<bodyValidInterface> => {
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
