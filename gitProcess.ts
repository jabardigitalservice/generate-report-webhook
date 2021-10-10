import templateBody from './template/body'
import delay from './utils/delay'
import captureException from './capture/exception'
import sendTelegram from './send/telegram'
import { DoneCallback } from 'bull'
import { payloadInterface } from './interface'
import { sendBodyIsNotValid } from './send/elastic'

const gitProcess = async (job: any, done: DoneCallback, payload: payloadInterface) => {
  try {
    delay()
    const body = await templateBody(payload)
    console.log(`start ${job.data.git} ${new Date()}`)
    sendTelegram(body)
      .then(() => done())
      .catch(error => {
        captureException(error)
        done(error)
      })
      .finally(() => console.log(`end ${job.data.git} ${new Date()}`))
  } catch (error) {
    // error body not valid
    console.log(error.message)
    sendBodyIsNotValid(payload)
    done()
  }
}

export default gitProcess
