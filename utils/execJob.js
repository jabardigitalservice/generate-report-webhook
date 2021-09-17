import sendTelegram from './sendTelegram.js'
import templateBody from './templateBody.js'
import delay from './delay.js'

const execJob = async (job, done, payload) => {
  try {
    console.log('exec process ' + new Date())
    await delay()
    await sendTelegram(job.data.git, await templateBody(done, payload))
    done()
    return console.log('exec end ' + new Date())
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export default execJob
