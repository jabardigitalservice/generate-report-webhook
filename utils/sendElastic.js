import moment from 'moment'
import connectQueue from './connectQueue.js'
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
    }, {
      priority: 3,
      removeOnComplete: true,
      backoff: 10000
    })
  }
}

const sendBodyIsNotValid = (payload) => {
  queue.add({
    index: `${process.env.APP_NAME}-${moment().format('YYYY.MM.DD')}`,
    body: {
      ...payload,
      isBodyValid: false
    }
  }, {
    priority: 2,
    removeOnComplete: true,
    backoff: 10000
  })
}

export {
  sendBodyIsValid,
  sendBodyIsNotValid
}
