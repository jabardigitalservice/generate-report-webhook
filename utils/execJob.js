import sendTelegram from './sendTelegram.js'
import templateBody from './templateBody.js'
import delay from './delay.js'
import captureException from './captureException.js'

const execJob = async (job, done, payload) => {
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

export default execJob
