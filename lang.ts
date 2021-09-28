import lang from 'i18n'
import path from 'path'

lang.configure({
  locales: ['en'],
  directory: path.join(__dirname, '/locales')
})

export default lang