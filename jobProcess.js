import connectQueue from './connect/queue.js'
import payload from './utils/payload.js'
import connectElastic from './connect/elastic.js'
import gitProcess from './gitProcess.js'
import delay from './utils/delay.js'
import captureException from './capture/exception.js'

const github = connectQueue('github')
const gitlab = connectQueue('gitlab')
const elastic = connectQueue('elastic')

github.process(function (job, done) {
  gitProcess(job, done, payload(job.data))
})

gitlab.process(function (job, done) {
  gitProcess(job, done, payload(job.data))
})

elastic.process(async function (job, done) {
  try {
    await delay()
    await connectElastic.index(job.data)
    done()
  } catch (error) {
    console.log(error.message)
    captureException(error)
    throw error
  }
})
