const mergedOptions = {
  github: {
    locations: ['action'],
    condition: 'closed'
  },
  gitlab: {
    locations: ['object_attributes', 'action'],
    condition: 'merge'
  }
}

const payloadOptions = {
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

const tagOptions = {
  github: {
    tagUsername: 'input[name=login]',
    tagPassword: 'input[name=password]',
    tagSubmit: 'input[type=submit]'
  },
  gitlab: {
    tagUsername: '#user_login',
    tagPassword: '#user_password',
    tagSubmit: 'input[type=submit]'
  }
}

export {
  mergedOptions,
  payloadOptions,
  tagOptions
}
