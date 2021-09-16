import moment from 'moment'
import { connectQueue, optionQueue } from './connectQueue.js'
const queue = connectQueue('elastic')

const sendBodyIsValid = (payload) => {
  const participants = payload.participants.trimEnd().split(/[ ,]+/)
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
    }, optionQueue)
  }
}

const sendBodyIsNotValid = (payload) => {
  queue.add({
    index: `${process.env.APP_NAME}-${moment().format('YYYY.MM.DD')}`,
    body: {
      ...payload,
      isBodyValid: false
    }
  }, optionQueue)
}

export {
  sendBodyIsValid,
  sendBodyIsNotValid
}
