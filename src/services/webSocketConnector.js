// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs/lib/stomp'
// import Api from './api'
// import MessageHandler from './messageHandler'
// import * as votingActions from '../redux/actions/voting/votingAction'
// import {
//   calcWebSocketStateImpl,
//   connectionStatusChange,
// } from '../redux/actions/voting/votingAction'
// import { generateCorrelationId } from './backendComHelper'
// import { WS_CLOSED, WS_CLOSING, WS_CONNECTING, WS_OPEN } from './config'
// // import analytics from '@react-native-firebase/analytics'

// export default class WebSocketConnector {
//   static myInstance = null

//   socket: SockJS = null

//   stompClient = null

//   dispatch = null

//   topicSubscription = null

//   timer = null

//   lostTimer = null

//   joinSessionInterval = null

//   connectionRetryWaitNext = 1
//   connectionRetryWaitPrevious = 1

//   previousMessageUid = 'INIT'

//   static getInstance() {
//     if (WebSocketConnector.myInstance == null) {
//       WebSocketConnector.myInstance = new WebSocketConnector()
//     }
//     return WebSocketConnector.myInstance
//   }

//   addDispatch(dispatchParam) {
//     this.dispatch = dispatchParam
//   }

//   getWebSocketState() {
//     if (this.socket == null || this.socket.readyState === 3) {
//       return WS_CLOSED
//     } else if (this.socket.readyState === 2) {
//       return WS_CLOSING
//     } else if (this.socket.readyState === 1) {
//       return WS_OPEN
//     } else if (this.socket.readyState === 0) {
//       return WS_CONNECTING
//     } else {
//       console.log('Could not identify current websocket state')
//       console.log(this.socket.readyState)
//       return 'UNDEFINED'
//     }
//   }

//   connect(connectedCallback, cookie, teamSpaceUid) {
//     this.connectToStomp(connectedCallback, cookie, teamSpaceUid)
//   }

//   async unsubscribe() {
//     if (this.topicSubscription) {
//       try {
//         this.topicSubscription.unsubscribe()
//       } catch (ivse) {
//         console.debug('could not unsubscribe/disconnect stompclient')
//       }
//     }
//     return Promise.resolve()
//   }

//   async disconnect() {
//     if (this.stompClient) {
//       await this.unsubscribe()
//       if (this.getWebSocketState() === 'OPEN') {
//         this.stompClient.disconnect(() => {
//           // This is a graceful shutdown it will wait for the backend to acknowledge the disconnect and only then will it disconnect the socket
//           console.log('Disconnect from stomp successful, now disconnecting from socket')
//           this.socket.close()
//         })
//       } else if (this.getWebSocketState() === 'CONNECTING') {
//         this.socket.close()
//       }
//     } else {
//       if (this.getWebSocketState() === WS_OPEN || this.getWebSocketState() === WS_CONNECTING) {
//         this.socket.close()
//       }
//     }
//     this.disableReconnect()
//     this.stompConnected = WS_CLOSED
//     return Promise.resolve()
//   }

//   disableReconnect() {
//     if (this.timer) {
//       console.log('removing timer after connection')
//       clearTimeout(this.timer)
//       this.timer = null
//     }
//     if (this.lostTimer) {
//       console.log('removing running timer for connectionLost')
//       clearTimeout(this.lostTimer)
//       this.lostTimer = null
//     }
//     if (this.joinSessionInterval) {
//       console.log('removing running interval for message repair')
//       clearInterval(this.joinSessionInterval)
//       this.joinSessionInterval = null
//     }
//     if (this.stompClient) {
//       this.stompClient.errorCallback = null
//     }
//   }

//   resetConnectionRetryTimes() {
//     this.connectionRetryWaitPrevious = 1
//     this.connectionRetryWaitNext = 1
//   }

//   async connectToStomp(connectedCallback, cookie, teamSpaceUid) {
//     this.dispatch(connectionStatusChange(WS_CLOSED))
//     if (teamSpaceUid === undefined || teamSpaceUid === null) {
//       console.warn('undefined teamSpaceUid. This should never happen.')
//       // If this happens we don't want to reconnect until a proper connection request is received
//       this.disableReconnect()
//       return
//     }
//     this.disableReconnect()
//     await this.disconnect()

//     try {
//       this.socket = new SockJS(Api.defaults.baseURL + '/ws')
//       this.dispatch(connectionStatusChange(WS_CONNECTING))

//       console.log('constructor - connecting to socket')

//       this.socket.onopen = () => {
//         this.resetConnectionRetryTimes()
//         console.log('constructor - socket is connected.')
//       }

//       this.socket.onmessage = (message) => {
//         console.log('Message received' + message.data)
//       }

//       this.socket.onerror = (e) => {
//         console.log('websocket error' + e)
//       }

//       this.socket.onclose = () => {
//         this.dispatch(votingActions.disconnectSuccess({}))
//         console.log('closed')
//       }

//       this.stompClient = Stomp.Stomp.over(this.socket)

//       console.log('stomp - connecting to stompclient now')

//       this.stompConnected = 'OPENING'
//       this.stompClient.connect(
//         {
//           cookie: cookie,
//           teamSpaceId: teamSpaceUid,
//         },
//         () => {
//           this.stompConnected = WS_OPEN
//           this.resetConnectionRetryTimes()
//           this.stompClientConnected(connectedCallback, cookie, teamSpaceUid)
//         },
//         (message) => {
//           if (this.stompConnected === WS_OPEN) {
//             this.connectionLostHandler(cookie, teamSpaceUid, message)
//           }
//           this.stompConnected = WS_CLOSED
//         },
//       )

//       this.timer = setTimeout(async () => {
//         console.log('timeout hit with manual connection status: ' + this.stompConnected)
//         if (this.stompConnected === 'OPENING' || this.stompConnected === WS_CLOSED) {
//           // if (!__DEV__) {
//           //   analytics().logEvent('WebSocket_timeout_hit_resetting')
//           // }
//           this.connectionLostHandler(cookie, teamSpaceUid, 'standardTimeout')
//         }
//       }, 10000)

//       this.stompClient.onClose = (e) => {
//         console.log('stompclient closed with error: ' + e)
//       }

//       console.log('Stomp - After calling connect on stomp')
//     } catch (exc) {
//       console.log('exception for socket or stomp ' + exc)
//     }
//   }

//   async connectionLostHandler(cookie, teamSpaceUid, message) {
//     console.log('connectionLostHandler called with message ' + message)
//     this.dispatch(votingActions.setSelfOffline())
//     await this.disconnect()
//     let connectionRetryWaitCurrent = this.connectionRetryWaitNext
//     console.log('connection error, will retry after ' + connectionRetryWaitCurrent + ' seconds')
//     this.lostTimer = setTimeout(() => {
//       this.calcAndRecoverWebSocketState()
//     }, connectionRetryWaitCurrent * 1000)
//     this.connectionRetryWaitNext = this.connectionRetryWaitNext + this.connectionRetryWaitPrevious

//     this.connectionRetryWaitPrevious = connectionRetryWaitCurrent

//     // We never want to wait more than 2 minutes for a reconnect
//     // if we arrive at the two minutes, we just start again with low values
//     if (this.connectionRetryWaitNext > 120) {
//       this.resetConnectionRetryTimes()
//     }
//   }

//   calcAndRecoverWebSocketState = () => {
//     const webSocketState = calcWebSocketStateImpl()
//     if (!webSocketState.match(/OPEN|CONNECTING/)) {
//       console.log('repairing connection to backend')
//       this.startJoinSessionInterval()
//     } else {
//       console.log('App is still connected')
//     }
//   }

//   startJoinSessionInterval() {
//     votingActions.joinEstimationStart()
//     if (!this.joinSessionInterval) {
//       this.joinSessionInterval = setInterval(() => {
//         console.log('PREV_RUN_INTERVAL')
//         this.dispatch(votingActions.joinSessionStart())
//       }, 2000)
//     }
//   }

//   async connectToStompImpl(cookie, teamSpaceUid) {
//     console.log('Connected to stomp server with protocol: ' + this.stompClient.ws.transport)
//     // analytics().logEvent('websocket_protocol', {
//     //   protocol: this.stompClient.ws.transport,
//     // })
//     if (teamSpaceUid === undefined) {
//       console.warn('undefined teamSpaceUid in connecToStompImpl')
//     }
//     let selfConstructedTopicName = '/topic/teamspace/' + teamSpaceUid + '.cookie.' + cookie
//     console.log('connecting to queue ' + selfConstructedTopicName)
//     try {
//       this.unsubscribe()
//       this.topicSubscription = this.stompClient.subscribe(
//         selfConstructedTopicName,
//         (receivedMessage) => {
//           this.onReceiveMessage(receivedMessage)
//         },
//       )
//       this.dispatch(connectionStatusChange(WS_OPEN))
//     } catch (e) {
//       console.warn('We could not connect to the server. Please leave the teamspace and try again')
//     }
//   }

//   async sendMessage(type, event, message, userId, disconnectedCallback) {
//     let webMessageAPI = ['/app/estimation/']
//     if (type === 'SESSION') {
//       webMessageAPI.push('session')
//       if (event === 'JOIN') {
//         webMessageAPI.push('_join')
//       } else if (event === 'LEAVE') {
//         webMessageAPI.push('_leave')
//       }
//     } else if (type === 'ESTIMATION') {
//       webMessageAPI.push('estimation')
//       if (event === 'JOIN') {
//         webMessageAPI.push('_join')
//       } else if (event === 'FINISH') {
//         webMessageAPI.push('_finish')
//       } else if (event === 'LEAVE') {
//         webMessageAPI.push('_leave')
//       }
//     } else if (type === 'VOTING') {
//       webMessageAPI.push('voting')
//       if (event === 'START') {
//         webMessageAPI.push('_start')
//       } else if (event === 'VOTE_CAST') {
//         webMessageAPI.push('_cast_vote')
//       } else if (event === 'FINISH') {
//         webMessageAPI.push('_finished')
//       } else if (event === 'PRESELECT_FINAL_RESULT') {
//         webMessageAPI.push('_preselect_final_result')
//       } else if (event === 'SET_VOTING_STATE') {
//         webMessageAPI.push('_set_voting_state')
//       } else if (event === 'CHANGE_ISSUE_NAME') {
//         webMessageAPI.push('_change_issue_name')
//       }
//     } else if (type === 'LAYOUT') {
//       webMessageAPI.push('layout_select')
//     }

//     await this.sendMessageWithQueue(webMessageAPI.join(''), message, userId, disconnectedCallback)
//   }

//   async sendMessageWithQueue(webMessageAPI, message, userId, disconnectedCallback) {
//     console.log('Will send payload to ' + webMessageAPI)
//     let joinPayload = {
//       userId: userId,
//     }

//     // values need to be in the object itself and not hidden in the "message" object
//     for (let messageKey in message) {
//       if (message.hasOwnProperty(messageKey)) {
//         joinPayload[messageKey] = message[messageKey]
//       }
//     }
//     let generatedCorrelationId = generateCorrelationId()
//     this.dispatch(
//       votingActions.setLastGeneratedCorrelationId(generatedCorrelationId, webMessageAPI),
//     )
//     joinPayload['correlationId'] = generatedCorrelationId
//     if (this.socket && this.stompClient) {
//       try {
//         await this.stompClient.send(
//           webMessageAPI,
//           function (message) {
//             alert(message.body)
//           },
//           JSON.stringify(joinPayload),
//         )
//       } catch (e) {
//         console.warn('Your message could not be sent due to an error with the connection')
//       }
//     } else {
//       console.log('either socket or stompclient was not defined')
//       console.log('message was not sent')
//       disconnectedCallback()
//     }
//   }

//   resetPreviousMessageUid() {
//     this.previousMessageUid = 'INIT'
//   }

//   onReceiveMessage(receivedMessage) {
//     // the receivedMessage already is json parsable, but with headers and everything
//     // the actual payload is stored in "body"
//     let messageBody = JSON.parse(receivedMessage.body)

//     console.log(
//       'UID: ' +
//         messageBody.messageUid +
//         ' - PREVious: ' +
//         messageBody.previousMessageUid +
//         ' - Last: ' +
//         this.previousMessageUid +
//         ' - Type: ' +
//         messageBody.type,
//     )

//     // DST-2013 - Add previousMessageUid and messageUid to Command
//     if (
//       messageBody.previousMessageUid === undefined ||
//       messageBody.previousMessageUid === this.previousMessageUid
//     ) {
//       this.previousMessageUid = messageBody.messageUid
//       MessageHandler.messageReceived(messageBody, this.dispatch)
//       this.disableReconnect()
//     } else {
//       // analytics().logEvent('messageUid_continuity_error', {
//       //   message: messageBody,
//       //   previousMessageUid: this.previousMessageUid,
//       // })
//       console.info('PREV_MESSAGE_ERROR')

//       this.startJoinSessionInterval()
//     }
//   }

//   async stompClientConnected(connectedCallback, cookie, teamSpaceUid) {
//     await this.connectToStompImpl(cookie, teamSpaceUid)
//     connectedCallback()
//   }
// }
