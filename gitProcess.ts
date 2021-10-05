import templateBody from './template/body'
import delay from './utils/delay'
import captureException from './capture/exception'
import sendTelegram from './send/telegram'
import { DoneCallback } from 'bull'
import { payloadInterface } from './interface'

const gitProcess = async (job: any, done: DoneCallback, payload: payloadInterface) => {
  try {
    console.log(`start ${job.data.git} ${new Date()}`)
    delay()
    const body = templateBody(done, payload)
    await sendTelegram(body)
    done()
    console.log(`end ${job.data.git} ${new Date()}`)
  } catch (error) {
    console.log(`failed ${job.data.git} ${new Date()}`)
    console.log(error.message)
    captureException(error)
    done(error)
  }
}

export default gitProcess
