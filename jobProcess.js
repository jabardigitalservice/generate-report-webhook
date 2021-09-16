import connectQueue from './utils/connectQueue.js'
import payload from './utils/payload.js'
import clientElastic from './utils/connectElastic.js'
import execJob from './utils/execJob.js'

const github = connectQueue('github')
const gitlab = connectQueue('gitlab')
const elastic = connectQueue('elastic')

github.process(async function (job, done) {
  console.log('process github ...')
  await execJob(job, done, payload(job.data))
})

gitlab.process(async function (job, done) {
  console.log('process gitlab ...')
  await execJob(job, done, payload(job.data))
})

elastic.process(async function (job, done) {
  console.log('process elastic ...')
  await clientElastic.index(job.data)
  done()
})
