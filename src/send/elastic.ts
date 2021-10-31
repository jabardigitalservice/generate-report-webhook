import moment from 'moment'
import config from '../config'
import { elastic } from '../config/queue'
import { bodyInterface, payloadInterface } from '../interface'
import { elasticOptions } from '../config/job'

const now = (): string => {
  return moment().format('YYYY.MM.DD')
}
const indexElastic = (): string => {
  return `${config.get('app.name')}-${now()}`
}

const sendBodyIsValid = (payload: bodyInterface): void => {
  const participants = payload.participants
  delete payload.addition.createdBy
  for (const participant of participants) {
    if (!participant) continue
    elastic.add({
      index: indexElastic(),
      body: {
        project: payload.project.trimEnd(),
        participant: participant,
        ...payload.addition,
        isBodyValid: true
      }
    }, elasticOptions)
  }
}

const sendBodyIsNotValid = (payload: payloadInterface): void => {
  elastic.add({
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