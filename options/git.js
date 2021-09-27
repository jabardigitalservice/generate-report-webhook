const mergedOption = {
  github: {
    locations: ['action'],
    condition: 'closed'
  },
  gitlab: {
    locations: ['object_attributes', 'action'],
    condition: 'merge'
  }
}

const payloadOption = {
  github: {
    repository_name: ['body', 'pull_request', 'head', 'repo', 'name'],
    repository_url: ['body', 'pull_request', 'head', 'repo', 'html_url'],
    platform: ['git'],
    url: ['body', 'pull_request', 'html_url'],
    body: ['body', 'pull_request', 'body'],
    created_by: ['body', 'pull_request', 'user', 'login']
  },
  gitlab: {
    repository_name: ['body', 'repository', 'name'],
    repository_url: ['body', 'repository', 'homepage'],
    platform: ['git'],
    url: ['body', 'object_attributes', 'url'],
    body: ['body', 'object_attributes', 'description'],
    created_by: ['body', 'user', 'username']
  }
}

export {
  mergedOption,
  payloadOption
}
