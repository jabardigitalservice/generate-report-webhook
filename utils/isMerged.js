const PULL_REQUEST_MERGED = {
  github: {
    locations: ['action'],
    condition: 'closed'
  },
  gitlab: {
    locations: ['object_attributes', 'action'],
    condition: 'merge'
  }
}

const isMerged = (git, body) => {
  const locations = PULL_REQUEST_MERGED[git].locations
  let state = body
  for (const location of locations) {
    state = state[location]
  }

  let conditionAdd = true
  if (git === 'github') {
    conditionAdd = body.pull_request.merged
  }

  return state === PULL_REQUEST_MERGED[git].condition && conditionAdd
}

export default isMerged
