import { mergedOptionInterface, payloadOptionInterface } from "../interface"

const mergedOption: mergedOptionInterface = {
  github: {
    locations: ['action'],
    condition: 'closed'
  },
  gitlab: {
    locations: ['object_attributes', 'action'],
    condition: 'merge'
  }
}

const payloadOption: payloadOptionInterface = {
  github: {
    repositoryName: ['body', 'pull_request', 'head', 'repo', 'name'],
    repositoryUrl: ['body', 'pull_request', 'head', 'repo', 'html_url'],
    platform: ['git'],
    url: ['body', 'pull_request', 'html_url'],
    body: ['body', 'pull_request', 'body'],
    createdBy: ['body', 'pull_request', 'user', 'login']
  },
  gitlab: {
    repositoryName: ['body', 'repository', 'name'],
    repositoryUrl: ['body', 'repository', 'homepage'],
    platform: ['git'],
    url: ['body', 'object_attributes', 'url'],
    body: ['body', 'object_attributes', 'description'],
    createdBy: ['body', 'user', 'username']
  }
}

export {
  mergedOption,
  payloadOption
}
