import sendRequest from '../utils/request.js'
import request from 'request'
import config from '../config/index.js'
import fs from 'fs'

const DIR = config.get('dir')

const generateFilePath = () => {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR)
  }
  return `${DIR}/${Date.now()}${Math.random()}.png`
}

const screenshot = async (url) => {
  const response = await sendRequest({
    url: config.get('screenshot.url'),
    method: 'POST',
    form: {
      url: decodeURIComponent(url)
    }
  })
  if (response.statusCode !== 200) throw new Error(response.statusMessage)
  if (response.body) response.body = await downloadImage(response.body)
  return response.body
}

const downloadImage = async (url) => {
  const filePath = generateFilePath()
  return new Promise(resolve => {
    request.head(url, function () {
      request(url)
        .pipe(fs.createWriteStream(filePath))
        .on('close', () => {
          resolve(filePath)
        })
        .on('error', () => {
          resolve(null)
        })
    })
  })
}

export default screenshot
