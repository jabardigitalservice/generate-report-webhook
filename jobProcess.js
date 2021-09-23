import connectQueue from './utils/connectQueue.js'
import payload from './utils/payload.js'
import clientElastic from './utils/connectElastic.js'
import gitProcess from './utils/gitProcess.js'
import delay from './utils/delay.js'
import captureException from './utils/captureException.js'

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
    await clientElastic.index(job.data)
    done()
  } catch (error) {
    console.log(error.message)
    captureException(error)
    throw error
  }
})
