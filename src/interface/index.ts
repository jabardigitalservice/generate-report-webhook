export interface PayloadInterface {
  repositoryName: string,
  repositoryUrl: string,
  platform: string,
  url: string,
  body?: string,
  createdBy?: string,
  createdAt: Date
}
export interface BodyInterface {
  project: string,
  title: string,
  participants: string[],
  isValidBody: boolean,
  url: string,
  addition: PayloadInterface
}

export interface MergedOptionInterface {
  [key: string]: {
    locations: string[],
    condition: string
  }
}

export interface PayloadOptionInterface {
  [key: string]: {
    repositoryName: string[],
    repositoryUrl: string[],
    platform: string[],
    url: string[],
    body: string[],
    createdBy: string[],
  }
}
