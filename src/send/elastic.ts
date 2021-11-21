import moment from 'moment'
import config from '../config'
import { elastic } from '../config/queue'
import { BodyInterface, PayloadInterface } from '../interface'
import { elasticOptions } from '../config/job'

const now = (): string => moment().format('YYYY.MM')
const indexElastic = (): string => `${config.get('app.name')}-${now()}`

const sendBodyIsValid = (payload: BodyInterface): void => {
  const { participants } = payload
  delete payload.addition.createdBy
  for (const participant of participants) {
    if (!participant) continue
    elastic.add({
      index: indexElastic(),
      body: {
        project: payload.project.trimEnd(),
        participant,
        ...payload.addition,
        isBodyValid: true,
      },
    }, elasticOptions)
  }
}

const sendBodyIsNotValid = (payload: PayloadInterface): void => {
  elastic.add({
    index: indexElastic(),
    body: {
      ...payload,
      isBodyValid: false,
    },
  }, elasticOptions)
}

export {
  sendBodyIsValid,
  sendBodyIsNotValid,
}
