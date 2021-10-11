import { bodyInterface } from '../interface'

export const formatByCreated = (payload: bodyInterface): string => {
  return `
/lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants[0]}
Lampiran: ${payload.url}
`
}

export const formatByReview = (payload: bodyInterface): string => {
  return `
/lapor ${payload.project} | Peer code review ${payload.title}
Peserta: ${payload.participants.slice(1).join('  ')}
Lampiran: ${payload.url}
`
}
