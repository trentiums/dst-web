import React, { memo, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { useSelector } from 'react-redux'
import images from '../../assets/images'
import Api from '../../services/api'
import { showMessageCloseEstimation } from '../../services/hintText'
import HeaderBtn from '../../components/headerBtn'
import InfoModal from '../../components/commonModals/infoModal'
import IssueNameModal from '../../components/commonModals/issueNameModal'
import ResultModal from '../../components/commonModals/resultModal'
import HorizontalCardList from '../../components/horizontalCardList'
import CustomPieChart from '../../components/customPieChart'
import './resultScreen.css'

function ResultScreen() {
  const initialData = [
    { title: '1', value: 80, color: '#ab7094' },
    { title: '2', value: 70, color: '#fabd5d' },
    { title: '3', value: 50, color: '#005F8C' },
    { title: '4', value: 45, color: '#6dbd8e' },
    { title: '5', value: 20, color: '#565655' },
  ]
  const [data, setData] = useState(initialData)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isShow, setShow] = useState(false)
  const [changeIssueName, setChangeIssueName] = useState(false)
  const [resultModal, setResultModal] = useState(false)

  const history = useHistory()
  const { user } = useSelector((state) => ({
    user: state.user,
  }))
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
      <IssueNameModal isShow={changeIssueName} setShow={setChangeIssueName} />
      <ResultModal isShow={resultModal} setShow={setResultModal} />
      <div className="header-container">
        <HeaderBtn iconName={images.close} onClick={() => setShow(true)} />
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
        <div className="button" onClick={() => setResultModal(true)}>
          Next
        </div>
      </div>
      <div className="box box-container">
        <div className="row justify-content-center">
          <CustomPieChart
            data={data}
            onClick={(e, selectedIndex) => {
              setSelectedSegment(selectedIndex)
              if (selectedIndex === selectedSegment) {
                setData(initialData)
                setSelectedSegment(null)
              } else {
                let newData = data.map((dataItem, i) => {
                  if (i === selectedIndex) return { ...dataItem, color: initialData[i].color }
                  return { ...dataItem, color: '#ccc' }
                })
                setData(newData)
              }
            }}
          />
        </div>
        {selectedSegment ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="./profile" style={{ width: '100px', textAlign: 'center' }}>
              <img
                src={`${Api.defaults.baseURL}${user.photoPath}`}
                height="80px"
                width="80px"
                alt=""
              ></img>
              <span className="userNameText">{user.nickName}</span>
            </Link>
          </div>
        ) : (
          <HorizontalCardList onClick={handleSubmit} />
        )}
      </div>
    </div>
  )
}
export default memo(ResultScreen)
