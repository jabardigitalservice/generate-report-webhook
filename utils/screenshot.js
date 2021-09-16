
import puppeteer from 'puppeteer'
import dotEnv from 'dotenv'
dotEnv.config()

const account = process.env.ACCOUNT
const password = Buffer.from(process.env.PASSWORD, 'base64').toString()

const options = {
  github: {
    tagUsername: 'input[name=login]',
    tagPassword: 'input[name=password]',
    tagSubmit: 'input[type=submit]'
  },
  gitlab: {
    tagUsername: '#user_login',
    tagPassword: '#user_password',
    tagSubmit: 'input[type=submit]'
  }
}

const screenshot = async (url, git) => {
  const option = options[git]
  let filePath = `tmp/${Date.now()}${Math.random()}.png`
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] })
  const page = await browser.newPage()
  await page.setViewport({ height: 1280, width: 1080 })
  await page.goto(url, { waitUntil: 'load' })
  if (await page.$(option.tagUsername) !== null) {
    await page.type(option.tagUsername, account)
    await page.type(option.tagPassword, password)
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
