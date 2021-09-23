import moment from 'moment'
import Config from '../config/index.js'
import connectQueue from './connectQueue.js'
import { elasticOptions } from './jobOptions.js'

const queue = connectQueue('elastic')

const now = () => {
  return moment().format('YYYY.MM.DD')
}
const indexElastic = () => {
  return `${Config.get('app.name')}-${now()}`
}

const sendBodyIsValid = (payload) => {
  const participants = payload.participants.trimEnd().split(/[ ,]+/)
  delete payload.addition.created_by
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

const sendBodyIsNotValid = (payload) => {
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
