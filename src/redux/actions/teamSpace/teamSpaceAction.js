import * as teamSpaceTypes from './teamSpaceTypes'
import Api, { urls } from '../../../Services/Api'
// import { showMessage } from '../../../heplers/messagebar'
// import Config, { ERROR_MESSAGE_HEADER } from '../../../services/config'
// import { Images } from '../../../Themes'
// import * as votingActions from '../voting/votingAction';

export const teamSpaceCreateStart = (params, { update } = {}) => async (dispatch, getState) => {
  try {
    const responseJson = await Api[update ? 'put' : 'post'](
      update ? urls.teamSpaceUpdate.format(params.teamSpaceUid) : urls.teamSpaceCreate,
      JSON.stringify({
        ...params,
        teamSpaceOwner: {
          username: getState().user.username,
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: getState().user.username,
          password: getState().user.password,
        },
      },
    )
    const { data: result } = responseJson

    // refersh if updating teamspace is current teamspace
    if (params.teamSpaceUid == getState().teamSpace.teamSpaceUid) {
      dispatch(createTeamSpaceSuccess(result))
    }
    // as now the teamspace relates to owner and list needs to be shown
    // load the teamspace whenever teamspace has an update
    // dispatch(userTeamSpace());
    return Promise.resolve(result)
  } catch (error) {
    dispatch(teamSpaceCreateFailed(error))
    return Promise.reject()
  }
}

export const changeActiveTeam = (teamSpaceUid) => {
  return (dispatch) => {
    console.log('Set active teamSpace to ' + teamSpaceUid)
    dispatch(setActiveTeam(teamSpaceUid))
  }
}

export const createTeamSpaceSuccess = (response) => {
  return {
    type: teamSpaceTypes.TEAM_CREATE_SUCCESS,
    payload: response,
  }
}

const setActiveTeam = (teamSpaceUid) => (dispatch, getState) => {
  const {
    teamSpace: { teamSpaceList },
  } = getState()
  let teamSpace = teamSpaceList?.find((teamsp) => teamsp.teamSpaceUid === teamSpaceUid)

  if (teamSpace === undefined || !teamSpace) teamSpace = { singleUserSpace: false }
  console.log(teamSpaceList, teamSpace)
  dispatch({
    type: teamSpaceTypes.SET_ACTIVE_TEAM,
    payload: { teamSpaceUid, singleUserSpace: teamSpace.singleUserSpace },
  })
}

export const teamSpaceCreateFailed = (error) => {
  showErrorMessage(
    error.request.getResponseHeader('x-err-errorMessage'),
    teamSpaceTypes.TEAM_CREATE_FAILED,
  )
}

export const leaveTeamSpace = (teamSpaceUid) => async (dispatch, getState) => {
  try {
    const response = await Api.get(urls.teamSpaceLeave.format(teamSpaceUid))
    if (response.status === 200) {
      console.log('leaveTeamSpace + ' + teamSpaceUid + '  successful')
    }
    dispatch(userTeamSpace())
  } catch (e) {
    dispatch(teamSpaceLeaveFailed(error))
  }
}

export const teamSpaceLeaveFailed = (error) => {
  // showErrorMessage(
  //   error.request.getResponseHeader(ERROR_MESSAGE_HEADER),
  //   teamSpaceTypes.TEAM_LEAVE_FAILED,
  // )
}

export const teamSpaceInfoStart = () => async (dispatch, getState) => {
  try {
    const response = await Api.get(urls.teamSpaceSingle.format(getState().teamSpace.teamSpaceUid))
    dispatch({
      type: teamSpaceTypes.TEAMSPACE_INFO_UPDATE,
      payload: {
        teamSpaceName: response.data.teamSpaceName,
        description: response.data.description,
      },
    })
    console.log(response.data)
  } catch (error) {
    dispatch(teamSpaceInfoFailed(error))
  }
}

export const teamSpaceInfoFailed = (error) => {
  // showErrorMessage(
  //   error.request.getResponseHeader(ERROR_MESSAGE_HEADER),
  //   teamSpaceTypes.GET_TEAMS_FAILED,
  // )
}

export const userTeamSpace = () => async (dispatch, getState) => {
  try {
    const response = await Api.get(urls.teamSpaceList.format(getState().user.uid))
    dispatch({
      type: teamSpaceTypes.FETCH_USER_TEAMSPACE_SUCCESS,
      payload: response.data,
    })
    return Promise.resolve()
  } catch (e) {
    console.log(e)
    dispatch(teamSpaceInfoFailed(e))
    return Promise.reject()
  }
}

export const deleteTeamSpace = (teamSpaceUid) => async (dispatch, getState) => {
  try {
    await Api.delete(urls.teamSpaceDelete.format(teamSpaceUid)).then((res) => {
      console.log(' TeamSpace with ' + teamSpaceUid + ' deleted')
    })
    dispatch(userTeamSpace())
  } catch (e) {
    dispatch(teamSpaceDeleteFailed(error))
  }
}

export const teamSpaceDeleteFailed = (error) => {
  // showErrorMessage(
  //   error.request.getResponseHeader(ERROR_MESSAGE_HEADER),
  //   teamSpaceTypes.TEAM_DELETE_FAILED,
  // )
}

const showErrorMessage = (message, teamSpaceType) => {
  // showMessage({
  //   type: Config.INFORMATION_LEVEL['ERROR'],
  //   text: message,
  // })
  return {
    type: teamSpaceType,
    payload: {},
  }
}

// export const showCardSet = (payload) => async (dispatch) => {
//   payload.cardLayoutList = payload.cardLayoutList.map((card) => {
//     const updatedCard = { ...card }
//     if (card.cardImage) updatedCard.cardImage = Images.cards[payload.name][card.cardImage]
//     return updatedCard
//   })
//   await dispatch({
//     type: teamSpaceTypes.SHOW_CARDSET,
//     payload,
//   })
// }

export const getCardSet = () => (dispatch) => {
  dispatch({
    type: teamSpaceTypes.GET_CURRENT_LAYOUT,
    payload: {},
  })
}

export const getEstimationHistory = () => async (dispatch, getState) => {
  try {
    const { data: estimationHistorySearch } = await Api.get(
      urls.estimationHistory.format(getState().teamSpace.teamSpaceUid),
    )
    dispatch(votingActions.setLicenseScreen(estimationHistorySearch))
    return Promise.resolve(estimationHistorySearch)
  } catch (e) {
    if (typeof e !== 'undefined') {
      // showMessage({
      //   type: Config.INFORMATION_LEVEL['ERROR'],
      //   text: 'Server error. Could not fetch estimation history',
      // })
      console.log(e)
    }
  }
}

export const updateEstimationHistory = (estimationHistory) => async (dispatch, getState) => {
  try {
    let url = urls.estimationHistoryUpdate.format(
      getState().teamSpace.teamSpaceUid,
      estimationHistory.timestamp,
    )
    const { data: estimationHistoryUpdate } = await Api.put(url, estimationHistory)
    return Promise.resolve(estimationHistoryUpdate)
  } catch (e) {
    if (typeof e !== 'undefined') {
      if (e?.response?.status === 403) {
        // showMessage({
        //   type: Config.INFORMATION_LEVEL['WARN'],
        //   text: 'You do not have the right to update the history',
        // })
      } else {
        // showMessage({
        //   type: Config.INFORMATION_LEVEL['ERROR'],
        //   text: 'Server error. Could not update estimation history',
        // })
      }
      console.log(e)
    }
  }
}

export const searchEstimationHistory = (issue, from, to) => async (dispatch, getState) => {
  try {
    let url = urls.estimationHistorySearch.format(getState().teamSpace.teamSpaceUid)
    if (issue) {
      url += '?issue=' + issue
      if (from && from !== 'Invalid Date' && to && to !== 'Invalid Date') {
        url += '&from=' + from + '&to=' + to
      }
    } else if (from && from !== 'Invalid Date' && to && to !== 'Invalid Date') {
      url += '?from=' + from + '&to=' + to
    }
    const { data: estimationHistorySearch } = await Api.get(url)
    dispatch(votingActions.setLicenseScreen(estimationHistorySearch))
    return Promise.resolve(estimationHistorySearch)
  } catch (e) {
    if (typeof e !== 'undefined') {
      if (e?.response?.status === 403) {
        // showMessage({
        //   type: Config.INFORMATION_LEVEL['WARN'],
        //   text: 'You do not have the right to search the history',
        // })
      } else {
        // showMessage({
        //   type: Config.INFORMATION_LEVEL['ERROR'],
        //   text: 'Server error. Could not fetch estimation history',
        // })
      }
      console.log(e)
    }
  }
}
