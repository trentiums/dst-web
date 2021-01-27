import * as teamSpaceTypes from '../actions/teamSpace/teamSpaceTypes'
// import * as votingTypes from '../Actions/voting/votingTypes';

const teamSpaceInitalState = {
  selectedLayout: {
    cardSetType: 'PLANNING_POKER',
    name: 'PLANNING_POKER_DEFAULT',
  },
}

export default function teamSpaceReducer(state = teamSpaceInitalState, action) {
  switch (action.type) {
    case teamSpaceTypes.TEAM_CREATE_START:
      return state
    case teamSpaceTypes.GET_TEAMS_START:
      return state
    case teamSpaceTypes.TEAM_CREATE_SUCCESS:
      state = {
        ...state,
        ...action.payload,
      }
      return state
    case teamSpaceTypes.GET_TEAMS_FAILED:
      return state
    case teamSpaceTypes.TEAM_CREATE_FAILED:
      return state
    case teamSpaceTypes.TEAM_DELETE_FAILED:
      return state
    case teamSpaceTypes.TEAM_LEAVE_FAILED:
      return state
    case teamSpaceTypes.SET_ACTIVE_TEAM:
      state = {
        ...state,
        ...action.payload,
      }
      return state
    case teamSpaceTypes.TEAMSPACE_INFO_UPDATE:
      state = {
        ...state,
        ...action.payload,
      }
      return state
    case teamSpaceTypes.REFRESH_TEAMSPACE:
      state = {
        ...state,
        ...action.payload,
      }
      return state
    case teamSpaceTypes.FETCH_USER_TEAMSPACE_SUCCESS:
      // if user has no teamspaces at all
      if (action.payload.length) {
        if (action.payload[0].teamSpaceUid == null) {
          console.warn('teamSpaceUid is null')
        }
        if (action.payload[0].teamSpaceName == null) {
          console.warn('teamSpaceName is null')
        }
        if (action.payload[0].description == null) {
          console.warn('description is null')
        }
        if (action.payload[0].relationship == null) {
          console.warn('relationship is null')
        }
        if (action.payload[0].editable == null) {
          console.warn('editable is null')
        }
      }
      return { ...state, teamSpaceList: action.payload }
    // case votingTypes.SESSION_LEAVE:
    //   return {
    //     ...state,
    //     teamSpaceUid: null,
    //     teamSpaceName: null,
    //     relationship: null,
    //     description: null
    //   };
    case teamSpaceTypes.SHOW_CARDSET:
      state = {
        ...state,
        selectedLayout: action.payload,
      }
      return state
    case teamSpaceTypes.GET_CURRENT_LAYOUT:
      return state.selectedLayout
    default:
      return state
  }
}
