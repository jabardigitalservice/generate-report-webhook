import moment from 'moment'
import connectQueue from './connectQueue.js'
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
    }, {
      delay: 60000,
      attempts: 2
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
    delay: 60000,
    attempts: 2
  })
}

export {
  sendBodyIsValid,
  sendBodyIsNotValid
}
