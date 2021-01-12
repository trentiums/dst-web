export const backendEnvironments = [
  {
    type: 'Local',
    url: 'http://localhost:8080',
    defaultEnvironment: true,
    display: 'Local',
  },
  {
    type: 'TEST',
    url: 'https://test.dst.beskgroup.com',
    defaultEnvironment: true,
    display: 'TEST',
  },
  {
    type: 'PRODUCTION',
    url: 'https://dst.beskgroup.com',
    defaultEnvironment: false,
    display: '',
  },
  {
    type: 'UNIT_TEST',
    //insert your local ip address
    url: 'http://',
    defaultEnvironment: false,
    display: 'LOCAL',
  },
]

export const CORRELATION_ID_HEADER = 'x-dst-correlationId'
export const COOKIE_HEADER = 'x-dst-cookie'
export const ERROR_MESSAGE_HEADER = 'x-err-defaultmessage'

export const FEEDBACK_COUNTER = 10

export const RELATIONSHIPS = {
  scrumMasterDev: 'SCRUM_MASTER_DEVELOPER',
  developer: 'DEVELOPER',
}

export const IOS_IAP_SECRET_KEY = '532640e7e8ae4d92981fa95c53d58c65'

export const PACKAGE_NAME = 'com.ulassa.app'

export const PACKAGE_TYPES = {
  free: 'FREE',
  monthly: 'MONTHLY',
  yearly: 'YEARLY',
  proLike: 'PRO_LIKE', // for testers
}

export const WS_OPEN = 'OPEN'
export const WS_CONNECTING = 'CONNECTING'
export const WS_CLOSED = 'CLOSED'
export const WS_CLOSING = 'CLOSING'
