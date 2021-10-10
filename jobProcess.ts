import { git, elastic } from './connect/queue'
import payload from './utils/payload'
import connectElastic from './connect/elastic'
import delay from './utils/delay'
import templateBody from './template/body'
import captureException from './capture/exception'
import sendTelegram from './send/telegram'
import { sendBodyIsNotValid } from './send/elastic'

git.process(async (job, done) => {
  delay()
  const data = payload(job.data)
  try {
    const body = await templateBody(data)
    sendTelegram(body)
      .then(() => done())
      .catch(error => {
        captureException(error)
        done(error)
      })
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
