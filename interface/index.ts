export interface payloadInterface {
  repositoryName: string,
  repositoryUrl: string,
  platform: string,
  url: string,
  body?: string,
  createdBy?: string,
  createdAt: Date
}
export interface bodyInterface {
  project: string,
  title: string,
  participants: string[],
  isValidBody: boolean,
  url: string,
  addition: payloadInterface
}

export interface mergedOptionInterface {
  [key: string]: {
    locations: string[],
    condition: string
  }
}

export interface payloadOptionInterface {
  [key: string]: {
    repositoryName: string[],
    repositoryUrl: string[],
    platform: string[],
    url: string[],
    body: string[],
    createdBy: string[],
  }
}
