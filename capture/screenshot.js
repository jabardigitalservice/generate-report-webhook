
import puppeteer from 'puppeteer'
import fs from 'fs'
import Config from '../config/index.js'
import { tagOption } from '../options/git.js'
const dir = 'tmp'

const generateFilePath = () => {
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true })
  }
  fs.mkdirSync(dir)
  return `${dir}/${Date.now()}${Math.random()}.png`
}

const screenshot = async (url, git) => {
  const option = tagOption[git]
  let filePath = generateFilePath()
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] })
  const page = await browser.newPage()
  await page.setViewport({ height: 1280, width: 1080 })
  await page.goto(url, { waitUntil: 'load' })
  if (await page.$(option.tagUsername) !== null) {
    await page.type(option.tagUsername, Config.get('account'))
    await page.type(option.tagPassword, Config.get('password'))
    await Promise.all([
      page.click(option.tagSubmit),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ])
  }
  if (await page.url() === url) await page.screenshot({ path: filePath })
  else filePath = null
  await browser.close()
  return filePath
}

export default screenshot
