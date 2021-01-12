import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import images, { cards } from '../../assets/images'
import { showMessageCloseEstimation } from '../../services/hintText'
import HeaderBtn from '../../components/headerBtn'
import InfoModal from '../../components/commonModals/infoModal'
import IssueNameModal from '../../components/commonModals/issueNameModal'
import './estimationScreen.css'

function EstimationScreen() {
  const [loading, setLoading] = useState(false)
  const [checkLoader, setCheckLoader] = useState(false)
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(null)
  const [isShow, setShow] = useState(false)
  const [changeIssueName, setChangeIssueName] = useState(false)
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
  const onClosePressed = (field) => {
    setShow(false)
    switch (field) {
      case 'Yes':
        history.push('./issueScreen')
        break
      default:
        break
    }
  }
  return (
    <div className="page_container">
      <InfoModal
        isShow={isShow}
        setShow={setShow}
        onClick={onClosePressed}
        description={showMessageCloseEstimation.closeEstimationQue}
      />
      <IssueNameModal
        isShow={changeIssueName}
        setShow={setChangeIssueName}
        onClick={onClosePressed}
        description={showMessageCloseEstimation.closeEstimationQue}
      />
      <div className="header-container">
        <HeaderBtn
          iconName={images.close}
          onClick={() => {
            setShow(true)
            // history.push('/issueScreen')
          }}
        />
        <div className="header-title">
          Teamspace Name
          <span
            style={{ color: '#0286be', cursor: 'pointer' }}
            onClick={() => setChangeIssueName(true)}
          >
            {' '}
            | <i className="fa fa-group mr-2" style={{ fontSize: 16 }} />
            IssueName
          </span>
        </div>
        <div className="button" onClick={() => history.push('/resultScreen')}>
          {loading ? (
            <img src={images.loader} className="mr-2" width="20px" height="20px" alt="" />
          ) : (
            'Next'
          )}
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
            style={{ backgroundColor: color }}
            className={`col-md-2 layout-item ${
              i === selectedLayoutIndex ? 'selected-layout' : ''
            } m-3`}
            onClick={(e) => {
              setCheckLoader(true)
              handleSubmit(e)
              setSelectedLayoutIndex(i)
              setTimeout(() => {
                setCheckLoader(false)
              }, 1000)
            }}
          >
            {['top-left', 'bottom-left', 'top-right', 'bottom-right'].map((style) => (
              <div className={`number num-${style}`}>{i}</div>
            ))}
            {i === selectedLayoutIndex && (
              <div className="check">
                <i className="fa fa-check" />
              </div>
            )}
            {selectedLayoutIndex !== null && i !== selectedLayoutIndex && (
              <div className="check check-number">{selectedLayoutIndex}</div>
            )}
            {i === selectedLayoutIndex && checkLoader && (
              <div className="check-container">
                <div className="center-check">
                  <i className="fa fa-check" />
                </div>
              </div>
            )}
            <img
              src={cards.cardset.DELEGATION_POKER_DEFAULT.card1middle}
              alt=""
              className="layout-image"
            />
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
export default memo(EstimationScreen)
