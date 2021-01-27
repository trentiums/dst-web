import * as backendTypes from '../actions/backend/backendTypes'
// import NavigationService from '../../Navigation/NavigationService';
// import packageJson from '../../../package'

const backenDInitalState = {
  timeOfLastRequest: 'Undefined',
  buildTime: 'Undefined',
  commit: 'Undefined',
  version: 'Undefined',
  branch: 'Undefined',
  request: 'NOT STARTED',
}

export default function backendReducer(state = backenDInitalState, action) {
  switch (action.type) {
    case backendTypes.VERSION_NOT_ALLOWED:
      // console.log(
      //   'Backend allows only versions: ' +
      //     action.payload +
      //     ' but the version of this app is ' +
      //     packageJson.version,
      // )
      //   NavigationService.navigate('PleaseUpdate');
      return state
    case backendTypes.BACKEND_CALL_INPROGRESS:
      // TODO: update state accordingly (do not mutate the state) return new instead
      console.log(backendTypes.BACKEND_CALL_INPROGRESS)
      return {
        request: 'IN_PROGRESS',
      }
    case backendTypes.BACKEND_CALL_SUCCESS:
      console.log(backendTypes.BACKEND_CALL_SUCCESS)
      return {
        request: 'SUCCESS',
        ...action.payload,
      }
    case backendTypes.BACKEND_CALL_FAILED:
      // TODO: update state accordingly (do not mutate the state) return new instead
      console.log(backendTypes.BACKEND_CALL_FAILED)
      return {
        request: 'FAILED',
        ...action.payload,
      }
    case backendTypes.BACKEND_GET_HELP_MESSAGES:
      console.log(backendTypes.BACKEND_GET_HELP_MESSAGES)
      return {
        ...state,
        helpMessages: action.payload,
      }
    case backendTypes.BACKEND_SET_LEARN_MORE_URL:
      console.log(backendTypes.BACKEND_SET_LEARN_MORE_URL)
      return {
        ...state,
        learnMoreUrl: action.payload,
      }
    case backendTypes.BACKEND_SET_PRIVACY_POLICY_URL:
      console.log('reducer', backendTypes.BACKEND_SET_PRIVACY_POLICY_URL)
      return {
        ...state,
        privacyPolicyUrl: action.payload,
      }
    case backendTypes.BACKEND_SET_TERMS_AND_CONDITIONS_URL:
      console.log('reducer', backendTypes.BACKEND_SET_TERMS_AND_CONDITIONS_URL)
      return {
        ...state,
        termsAndConditionsUrl: action.payload,
      }
    default:
      return state
  }
}
