import connectQueue from './connect/queue'
import payload from './utils/payload'
import connectElastic from './connect/elastic'
import gitProcess from './gitProcess'
import delay from './utils/delay'
import captureException from './capture/exception'

const git = connectQueue('git')
const elastic = connectQueue('elastic')

git.process(function (job, done) {
  delay()
  gitProcess(job, done, payload(job.data))
})

elastic.process(async function (job, done) {
  delay()
  connectElastic.index(job.data)
    .then(() => done())
    .catch(error => captureException(error))
})
