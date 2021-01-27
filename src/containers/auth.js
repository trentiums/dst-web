import { memo, useEffect } from 'react'
import * as keysAction from '../redux/actions/keys/keysAction'
import { useSelector } from 'react-redux'
import {
  keys,
  getKeyValue,
  // removeKey,
  tourSteps,
} from '../services/localStorage'
function Auth() {
  const { setTourStep, setEstimateCounter } = useSelector((state) => ({
    setTourStep: keysAction.setTourStep,
    setEstimateCounter: keysAction.setEstimateCounter,
  }))
  useEffect(() => {
    const fetchData = async () => {
      const step = await getKeyValue(keys.tourCurrentStep)
      const estimateCounter = await getKeyValue(keys.estimateCounter)
      setTourStep(step ? tourSteps[`step${step}`] : 0)
      setEstimateCounter(estimateCounter ? parseInt(estimateCounter) : 0)
      const isGetStarted = await getKeyValue(keys.getStarted)
      console.log(isGetStarted)
      // const route = isGetStarted ? 'TabArea' : 'OnBoardScreen'
      // this.props.navigation.replace(route)
    }
    fetchData()
  })
  return null
}
export default memo(Auth)
