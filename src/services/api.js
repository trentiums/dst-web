import axios, { AxiosInstance } from 'axios'
import { COOKIE_HEADER, CORRELATION_ID_HEADER, getCurrentEnv } from './config'
import { generateCorrelationId } from './backendComHelper'

const Api: AxiosInstance = axios.create({
  baseURL: getCurrentEnv(),
  timeout: 20000,
  headers: {
    [COOKIE_HEADER]: 'UNDEFINED',
  },
})

export const urls = {
  checkCookie: '/login/checkcookie',
  guestLogin: '/login/guest',
  checkClientVersion: '/version/client',
  register: '/login/registerdevice', // device registration
  teamSpaceList: '/teamspace/user/{0}',
  teamSpaceCreate: '/teamspace/',
  teamSpaceDelete: '/teamspace/{0}', // /teamspace/{teamSpaceUid}
  teamSpaceUpdate: '/teamspace/{0}', // /teamspace/{teamSpaceUid}
  teamSpaceSingle: '/teamspace/{0}', // /teamspace/{teamSpaceUid}
  teamSpaceLeave: '/teamspace/{0}/leave', // /teamspace/{teamSpaceUid}
  joinTeam: '/teamspace/connect/{0}/user/{1}', // '/teamSpace/connect/' + teamSpaceUid + '/user/' + getState().user.username,
  teamSpaceInvite: '/teamspace/{0}/invitation',
  savePayment: '/payment/',
  cancelPayment: '/payment/',
  handlePayment: '/payment/handle/{0}',
  getLicense: '/license/{0}', // /license/{teamSpaceUid}
  getPackages: '/license/packages',
  getCardSets: '/cardset',
  userPicbase: '/picturebase', // /user/{userUid}/picture - used only for update. For get please use photoPath/image from user object
  userDetails: '/user', // GET /user/{userUid}
  updateUser: '/user', // PUT /user/{userUid}
  layoutCardsList: '/cardsetinfo/{0}', // GET /cardsetinfo/{layout} i.e. cardsetinfo/DELEGATION_POKER_DEFAULT
  activeLayouts: '/estimationlayouts/{0}', // GET /estimationlayouts/{userUid}
  refreshPayment: '/payment/refresh',
  userLogin: '/login/user',
  helpMessages: '/login/helpmessages',
  backendEnvironmentCheck: '/version/checkbackendenvironment',
  estimationHistory: '/history/{0}',
  estimationHistorySearch: '/history/{0}/search',
  estimationHistoryUpdate: '/history/{0}/{1}',
}

export const setCookie = (cookie) => {
  Api.defaults.headers[COOKIE_HEADER] = cookie
}

export const setHost = (url) => {
  Api.defaults.baseURL = url
}

export const createCorrelationInterceptor = () => {
  Api.interceptors.request.use((config) => {
    // we might set the correlationId before in business logic, if we get it from a previous interaction
    if (!config.headers.common[CORRELATION_ID_HEADER]) {
      config.headers.common[CORRELATION_ID_HEADER] = generateCorrelationId()
    }
    return config
  })
}

export const URL = getCurrentEnv()

export const getContinueURL = (url) => {
  return URL + '/login' + url
}

export const setAuthorization = ({ username, password }) => {
  Api.defaults.auth = { username, password }
}

export default Api
