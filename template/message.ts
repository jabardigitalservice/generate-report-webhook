interface bodyValidInterface {
  project: string,
  title: string,
  participants: string,
  isValidBody: boolean,
  url: string,
  addition: {
    repositoryName: string,
    repositoryUrl: string,
    platform: string,
    url: string,
    body: string,
    createdBy: string,
    createdAt: Date
  }
}

const messageValid = (payload: bodyValidInterface) => {
  return `
/lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants}
Lampiran: ${payload.url}
`
}

export {
  messageValid
}
