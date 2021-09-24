import templateBody from './template/body.js'
import delay from './utils/delay.js'
import captureException from './capture/exception.js'
import { sendTelegram } from './send/telegram.js'

const gitProcess = async (job, done, payload) => {
  try {
    console.log(`start ${job.data.git} ${new Date()}`)
    await delay()
    await sendTelegram(job.data.git, await templateBody(done, payload))
    done()
    console.log(`end ${job.data.git} ${new Date()}`)
  } catch (error) {
    console.log(`failed ${job.data.git} ${new Date()}`)
    console.log(error.message)
    captureException(error)
    throw error
  }
}

export default gitProcess
