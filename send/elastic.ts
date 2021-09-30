import moment from 'moment'
import config from '../config'
import connectQueue from '../connect/queue'
import { bodyInterface, payloadInterface } from '../interface'
import { elasticOptions } from '../options/job'

const queue = connectQueue('elastic')

const now = (): string => {
  return moment().format('YYYY.MM.DD')
}
const indexElastic = (): string => {
  return `${config.get('app.name')}-${now()}`
}

const sendBodyIsValid = (payload: bodyInterface): void => {
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

const sendBodyIsNotValid = (payload: payloadInterface): void => {
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
