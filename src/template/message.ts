import { BodyInterface } from '../interface'

export const formatByCreated = (payload: BodyInterface): string | null => {
  const message = `
/lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants[0]}
Lampiran: ${payload.url}
${payload.date ? `Tanggal: ${payload.date}` : ''}
`
  return payload.participants[0] ? message : null
}

export const formatByReview = (payload: BodyInterface): string | null => {
  const message = `
/lapor ${payload.project} | Peer code review ${payload.title}
Peserta: ${payload.participants.slice(1).join('  ')}
Lampiran: ${payload.url}
${payload.date ? `Tanggal: ${payload.date}` : ''}
`
  return payload.participants.slice(1).length ? message : null
}
