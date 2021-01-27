import { memo, useEffect } from 'react'
import * as keysAction from '../redux/actions/keys/keysAction'
import { sessionkeys, getKeyValue } from '../services/localStorage'
import { guestLogin } from '../redux/actions/user/userAction'
import { useDispatch } from 'react-redux'
import Router from '../router'

function RootContainer() {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchCookie()
  })
  const fetchCookie = async () => {
    console.log('userRes')
    const cookie = await dispatch(keysAction.getCookieStart())
    if (cookie) {
      await dispatch(keysAction.storeCookieStart(cookie))
    }
    const deviceId = await getKeyValue(sessionkeys.deviceId)
    // const firebaseUid = await getKeyValue(keys.firebaseUid)
    // const deviceId = sessionStorage.getItem(sessionkeys.deviceId)
    // console.log(firebaseUid, deviceId)
    if (deviceId && cookie) {
      let params = {
        deviceId,
        // deviceId,
        // firebaseUid,
      }
      const userRes = await dispatch(guestLogin(params))
      console.log(userRes)
    }
  }

  return <Router />
}
export default memo(RootContainer)
