import moment from 'moment'
import connectQueue from './connectQueue.js'
import { elasticOptions } from './jobOptions.js'

const queue = connectQueue('elastic')

const sendBodyIsValid = (payload) => {
  const participants = payload.participants.trimEnd().split(/[ ,]+/)
  delete payload.addition.created_by
  for (const participant of participants) {
    queue.add({
      index: `${process.env.APP_NAME}-${moment().format('YYYY.MM.DD')}`,
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
    index: `${process.env.APP_NAME}-${moment().format('YYYY.MM.DD')}`,
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
