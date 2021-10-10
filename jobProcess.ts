import connectQueue from './connect/queue'
import payload from './utils/payload'
import connectElastic from './connect/elastic'
import gitProcess from './gitProcess'
import delay from './utils/delay'

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
  delay()
  connectElastic.index(job.data)
  done()
})
