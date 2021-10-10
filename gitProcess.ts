import templateBody from './template/body'
import delay from './utils/delay'
import captureException from './capture/exception'
import sendTelegram from './send/telegram'
import { DoneCallback } from 'bull'
import { payloadInterface } from './interface'

const gitProcess = async (job: any, done: DoneCallback, payload: payloadInterface) => {
  console.log(`start ${job.data.git} ${new Date()}`)
  delay()
  const body = await templateBody(done, payload)
  sendTelegram(body)
    .then(() => {
      done()
    })
    .catch(error => {
      captureException(error)
      done(error)
    })
    .finally(() => {
      console.log(`end ${job.data.git} ${new Date()}`)
    })
}

export default gitProcess
