import bodyParser from 'body-parser'
import express from 'express'
import verifySecretKey from './helpers/verifySecretKey'
import { git as gitConnect } from './config/queue'
import isMerged from './helpers/isMerged'
import { gitOptions } from './config/job'
import config from './config'
import './jobProcess'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/webhook/:secret/:git', async (req, res) => {
  try {
    verifySecretKey(req.params.secret)
    const { git } = req.params
    const { body } = req
    if (!isMerged(git, body)) return res.send('pending ...')
    gitConnect.add({ git, body }, gitOptions).then(() => console.log('add git queue'))
    return res.send('success')
  } catch (error) {
    console.log(error.message)
    return res.status(403).json({ error: error.message })
  }
})

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
