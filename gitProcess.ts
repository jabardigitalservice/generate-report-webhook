import templateBody from './template/body'
import delay from './utils/delay'
import captureException from './capture/exception'
import sendTelegram from './send/telegram'
import Bull from 'bull'

const gitProcess = async (job: any, done: Bull.DoneCallback, payload: {
  repositoryName: string,
  repositoryUrl: string,
  platform: string,
  url: string,
  body: string,
  createdBy: string,
  createdAt: Date
}) => {
  try {
    console.log(`start ${job.data.git} ${new Date()}`)
    await delay()
    const body = await templateBody(done, payload)
    await sendTelegram(body)
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
