import * as votingActions from '../Redux/Actions/voting/votingAction'
import * as userActions from '../Redux/Actions/user/userAction'
import * as teamSpaceActions from '../Redux/Actions/teamSpace/teamSpaceAction'

export default class MessageHandler {
  static messageReceived(message, dispatch) {
    console.log('CLIENT_COMMAND of type ' + message.type + ' received')
    switch (message.type) {
      case 'SHOW_SCREEN_IDLE':
        dispatch(votingActions.showScreenIdle())
        break
      case 'SHOW_SCREEN_VOTING':
        dispatch(votingActions.showScreenVoting(message.issue))
        break
      case 'SHOW_SCREEN_SUMMARY':
        dispatch(votingActions.showScreenSummary(message.issue))
        break
      case 'CHANGE_STATE':
        console.log('CHANGE_STATE message is' + message)
        dispatch(votingActions.changeState(message))
        break
      case 'ENABLE_START_BUTTON':
        dispatch(votingActions.enableStartButton())
        break
      case 'ENABLE_JOIN_BUTTON':
        dispatch(votingActions.enableJoinButton())
        break
      case 'SET_VOTING_PROGRESS':
        dispatch(votingActions.setVotingProgress(message))
        break
      case 'SHOW_CARD':
        dispatch(votingActions.showCard(message.card))
        break
      case 'SELECT_CARD':
        dispatch(votingActions.selectCard(message.card))
        break
      case 'SET_RESULT':
        dispatch(votingActions.setVotingResult(message))
        break
      case 'SCROLL_TO_PRESELECTED_CARD':
        dispatch(votingActions.scrollToPreselectedCard(message.card))
        break
      case 'PRESELECT_CARD':
        dispatch(votingActions.preselectFinalResultSuccess(message.card))
        break
      case 'SELECT_FINAL_CARD':
        dispatch(votingActions.selectFinalResult(message.card))
        break
      case 'CHANGE_TEAMMATE_STATE':
        console.log(message)
        dispatch(votingActions.teamMatesUpdate(message.teammateList))
        break
      case 'REFRESH_USER':
        console.log(message)
        dispatch(votingActions.refreshUser(message))
        break
      case 'REFRESH_USER_PROFILE_PHOTO':
        console.log(message)
        dispatch(votingActions.refreshUserProfilePhoto(message))
        break
      case 'REFRESH_TEAMSPACE':
        console.log(message)
        dispatch(votingActions.refreshTeamSpace(message))
        // Independent from estimation
        dispatch(teamSpaceActions.userTeamSpace())
        break
      case 'REFRESH_ISSUE':
        console.log(message)
        dispatch(votingActions.refreshIssue(message))
        break
      case 'SET_TEAMSPACE_LAYOUT':
        console.log(message)
        dispatch(userActions.refreshUserLayout(message))
        break
      case 'UPDATE_LICENSE':
        console.log(message)
        dispatch(votingActions.licenseUpdate(message))
        break
      case 'LEAVE_TEAMSPACE':
        dispatch(votingActions.leaveSessionStart())
        break
      case 'INFORM':
        dispatch(votingActions.infoRecieved(message))
        break
      case 'RESET':
        dispatch(votingActions.resetCommandFired(message))
        dispatch(teamSpaceActions.userTeamSpace())
        break
      case 'CORRELATION_ACKNOWLEDGEMENT':
        console.log('correlation acknowledgement received for ' + message.correlationId)
        dispatch(votingActions.compareWithLastCorrelation(message.correlationId))
        break
      case 'SHOW_CARDSET':
        dispatch(teamSpaceActions.showCardSet(message))
        break
      case 'CHANGE_SCRUM_MASTER_STATE':
        dispatch(votingActions.changeScrumMasterState(message.isScrumMaster))
        break
      case 'SHOW_RESULT':
        dispatch(votingActions.showResult(message))
        break
      default:
        console.log('other message handled by MessageHandler. Event was: ' + message.event)
    }
  }
}
