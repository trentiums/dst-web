export const keys = {
  tourCurrentStep: 'tour_current_step',
  cookie: 'cookie',
  getStarted: 'get_started',
  estimateCounter: 'estimate_counter',
  lastLicenseExpireCheckDate: 'license_expire_check_date',
  backendUrl: 'backendUrl',
  wantsToVote: 'wantsToVote',
}

export const tourSteps = { step1: 1, step2: 2, step3: 3 }

export const getKeyValue = async (key) => {
  if (key === undefined) {
    console.warn('key with name is not defined for read from Storage')
    return undefined
  }
  const output = await localStorage.getItem(key)
  return output
}

export const getBooleanKeyValue = async (key) => {
  const output = await localStorage.getItem(key)
  return JSON.parse(output)
}

export const setKeyValue = async (key, value) => {
  if (value === undefined) {
    console.warn(key, ' value is not defined for store Storage')
    return undefined
  }
  const output = await localStorage.setItem(key, value)
  return output
}

export const removeKey = async (key) => {
  if (key === undefined) {
    console.warn('key with name is not defined for read from Storage')
    return undefined
  }
  const output = await localStorage.removeItem(key)
  return output
}
