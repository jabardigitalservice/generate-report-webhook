import { git, elastic, telegramSendUser } from './connect/queue'
import payload from './utils/payload'
import connectElastic from './connect/elastic'
import delay from './utils/delay'
import templateBody from './template/body'
import captureException from './capture/exception'
import sendTelegram from './send/telegram'
import { sendBodyIsNotValid } from './send/elastic'
import { sendMessageWithUser } from './utils/telegram'

git.process(async (job, done) => {
  delay()
  const data = payload(job.data)
  try {
    const body = await templateBody(data)
    console.log('start')
    sendTelegram(body)
      .then(() => done())
      .catch(error => {
        console.log('error')
        captureException(error)
        done(error)
      })
      .finally(() => console.log('end'))
  } catch (error) {
    console.log(error.message)
    sendBodyIsNotValid(data)
    done()
  }
})

elastic.process(function (job, done) {
  delay()
  connectElastic.index(job.data)
    .then(() => done())
    .catch(error => captureException(error))
})

telegramSendUser.process(async function (job, done) {
  if (!job.data.message) return done()
  delay()
  console.log('telegram send user')
  try {
    await sendMessageWithUser(job.data.chat_id, job.data.message, job.data.message_id)
    done()
  } catch (error) {
    done(error)
  }
})
