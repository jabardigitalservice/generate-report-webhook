import sendTelegram from './sendTelegram.js'
import templateBody from './templateBody.js'

const execJob = async (job, done, payload) => {
  try {
    await sendTelegram(job.data.git, await templateBody(done, payload))
    done()
  } catch (error) {
    console.log(error.message)
  }
}

export default execJob
