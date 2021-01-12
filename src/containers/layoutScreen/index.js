import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import HeaderBtn from '../../components/headerBtn'
import { NotificationManager } from 'react-notifications'
import images, { cards } from '../../assets/images'
import './layoutScreen.css'

function LayoutScreen() {
  const [loading, setLoading] = useState(false)
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(null)
  const history = useHistory()
  const handleSubmit = async (e) => {
    if (loading) return
    try {
      setLoading(true)
      e.preventDefault()
      // history.push('/')
      // write your code here
      setLoading(false)
    } catch (error) {
      NotificationManager.error(
        error?.message ||
          error?.response?.data?.messsage ||
          error.toString() ||
          'Server error. Please try again',
      )
      setLoading(false)
    }
  }
  return (
    <div className="page_container">
      <div className="header-container">
        <div className="row header-title align-items-center">
          <HeaderBtn iconName={images.back} onClick={() => history.push('/issueScreen')} />
          <div className="pl-2 pt-1">Pick your design</div>
        </div>
      </div>
      <div className="row m-0 p-0 justify-content-center">
        {[
          '#ea5153',
          '#CEBCFF',
          '#FAC78C',
          '#c4da90',
          '#969FDD',
          '#4796C6',
          '#ED9494',
          '#D66464',
          '#D11F1F',
          '#F6D965',
          '#BCEDA8',
          '#EDE8B4',
        ].map((color, i) => (
          <div
            className={`col-md-3 layout-item m-3`}
            onClick={(e) => {
              handleSubmit(e)
              setSelectedLayoutIndex(i)
            }}
          >
            {i === selectedLayoutIndex ? (
              <div className="check-ring check-ring-icon">
                <i className="fa fa-check" />
              </div>
            ) : (
              <div className="check-ring"></div>
            )}
            <img
              src={cards.cardset.fibonacciPokerBavarianCardH}
              alt=""
              className={`layout-image ${i === selectedLayoutIndex ? 'selected-layout' : ''}`}
            />
            <div className="gradient-container">
              <div className="gradient-text">BAVARIAN Planning Poker</div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="button" onClick={handleSubmit}>
        {loading && <img src={images.loader} className="mr-2" width="20px" height="20px" alt="" />}
        <div className="buttonText">Start Estimation</div>
      </div> */}
    </div>
  )
}
export default memo(LayoutScreen)
