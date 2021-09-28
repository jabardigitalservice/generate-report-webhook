import moment from 'moment'
import Config from '../config'
import connectQueue from '../connect/queue'
import { elasticOptions } from '../options/job'

const queue = connectQueue('elastic')

const now = (): string => {
  return moment().format('YYYY.MM.DD')
}
const indexElastic = (): string => {
  return `${Config.get('app.name')}-${now()}`
}
interface bodyValid {
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
    createdBy: string | undefined,
    createdAt: Date
  }
}

interface bodyNotValid {
  repositoryName: string,
  repositoryUrl: string,
  platform: string,
  url: string,
  body: string | undefined,
  createdBy: string,
  createdAt: Date
}

const sendBodyIsValid = (payload: bodyValid): void => {
  const participants = payload.participants.trimEnd().split(/[ ,]+/)
  delete payload.addition.createdBy
  for (const participant of participants) {
    queue.add({
      index: indexElastic(),
      body: {
        project: payload.project.trimEnd(),
        title: payload.title.trimEnd(),
        participant: participant,
        ...payload.addition,
        isBodyValid: true
      }
    }, elasticOptions)
  }
}

const sendBodyIsNotValid = (payload: bodyNotValid) => {
  delete payload.body
  queue.add({
    index: indexElastic(),
    body: {
      ...payload,
      isBodyValid: false
    }
  }, elasticOptions)
}

export {
  sendBodyIsValid,
  sendBodyIsNotValid
}
