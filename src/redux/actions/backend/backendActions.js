import * as backendTypes from './backendTypes'
// import Config from '../../../Services/Config'
import Api, { urls } from '../../../services/api'
// import packageJson from '../../../../package'
// import analytics from '@react-native-firebase/analytics'
// import { showMessage } from '../../../heplers/messagebar'
// import compareVersions from 'compare-versions'
import store from '../../../services/store'

export const backendCallStart = () => {
  return (dispatch) => {
    dispatch(backendCallInprogress())
    fetch(Api.defaults.baseURL + '/version')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(backenCallSuccess(responseJson))
      })
      .catch((error) => {
        dispatch(backendCallFailed(error))
      })
  }
}

// export const versionAllowed: boolean = (responseJson, packageJsonVersion) => {
//   let minValue = responseJson.data[0]
//   return compareVersions(packageJsonVersion, minValue) >= 0
// }

// export const clientVersionCheck: boolean = () => async (dispatch) => {
//   try {
//     const responseJson = await Api.get(urls.checkClientVersion)
//     if (versionAllowed(responseJson, packageJson.version)) {
//       console.debug('Backend has allowed this client version to interact')
//       return true
//     } else {
//       dispatch({
//         type: backendTypes.VERSION_NOT_ALLOWED,
//         payload: responseJson.data,
//       })
//       if (!__DEV__) {
//         analytics().logEvent('ForceUpdate', {
//           allowedVersions: responseJson.data,
//           actualVersion: packageJson.version,
//         })
//       }
//       return false
//     }
//   } catch (e) {
//     console.log('backendClientVersionCheck error:' + e)
//     return Promise.reject(e)
//   }
// }

export const backendEnvironmentCheck = (backendUrl, properties) => async () => {
  try {
    await Api.post(urls.backendEnvironmentCheck, properties)
    return true
  } catch (e) {
    console.log('backendCEnvironmentCheck error:' + e)
    Promise.reject(e)
    return false
  }
}

export const backendCallInprogress = () => {
  return {
    type: backendTypes.BACKEND_CALL_INPROGRESS,
    payload: '',
  }
}

export const backenCallSuccess = (response) => {
  return {
    type: backendTypes.BACKEND_CALL_SUCCESS,
    payload: response,
  }
}

export const backendCallFailed = (error) => {
  return {
    type: backendTypes.BACKEND_CALL_FAILED,
    payload: error,
  }
}

export const getHelpMessageList = () => async (dispatch) => {
  try {
    const response = await Api.get(urls.helpMessages)
    dispatch({
      type: backendTypes.BACKEND_GET_HELP_MESSAGES,
      payload: response.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getHelpMessage = (name) => {
  const {
    backend: { helpMessages },
  } = store.getState()
  if (helpMessages) {
    return helpMessages?.find((element) => {
      return element.name === name
    })
  }
  return {
    message: '',
    order: 0,
    helpName: '',
  }
}

export const setLearnMoreUrl = (response) => {
  return {
    type: backendTypes.BACKEND_SET_LEARN_MORE_URL,
    payload: response,
  }
}

export const setPrivacyPolicyUrl = (response) => {
  return {
    type: backendTypes.BACKEND_SET_PRIVACY_POLICY_URL,
    payload: response,
  }
}

export const setTermsAndConditionsUrl = (response) => {
  return {
    type: backendTypes.BACKEND_SET_TERMS_AND_CONDITIONS_URL,
    payload: response,
  }
}
