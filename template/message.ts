import { bodyInterface } from "../interface"

const messageValid = (payload: bodyInterface): string => {
  return `
/lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants}
Lampiran: ${payload.url}
`
}

export {
  messageValid
}
