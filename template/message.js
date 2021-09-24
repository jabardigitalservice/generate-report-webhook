const messageValid = (payload) => {
  return `
/lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants}
Lampiran: ${payload.url}
`
}

export {
  messageValid
}
