import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import images, { cards } from '../assets/images'
import { teammates } from '../data/routesList'
import UserItem from '../components/userItem'

function IssueScreen() {
  const [issueName, setIssueName] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(1)
  const [wantsToVote, setWantsToVote] = useState(true)
  const history = useHistory()
  const handleSubmit = async (e) => {
    if (loading) return
    try {
      setLoading(true)
      e.preventDefault()
      if (selectedLayoutIndex && issueName) {
        history.push('/estimationScreen')
      }
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
        <div className="header-title">Teamspace Name</div>
      </div>
      <div className="box box-container">
        <form className="form-signin " onSubmit={handleSubmit}>
          <div className="avatarContainer mb-3">
            {teammates.map((item, i) => (
              <UserItem index={i} user={item} />
            ))}
          </div>
          <div className="row m-2 ml-3 mr-3">
            <button
              className="row"
              style={{ backgroundColor: '#ffffff', border: 0 }}
              onClick={() => history.push('/layoutScreen')}
            >
              <img
                src={cards.cardset.planningPokerBavarianCard}
                alt=""
                className="mr-2"
                style={{ objectFit: 'cover', height: 25, width: 25 }}
              />
              <div className="pr-3">Layout</div>
            </button>
            <div style={{ flex: 1 }}></div>
            <button className="row" style={{ backgroundColor: '#ffffff', border: 0 }}>
              <div>History</div>
              <i className="fa fa-history ml-2" style={{ fontSize: 25, color: '#0286be' }}></i>
            </button>
          </div>
          <div className="layout-container mb-3" scroll>
            {[1, 2, 3, 4, 5].map((card, index) => (
              <div onClick={() => setSelectedLayoutIndex(index + 1)}>
                <i className="fa fa-info-circle info-icon" />
                <img
                  src={cards.cardset.planningPokerBavarianCard}
                  className={`cardset-image ${
                    index + 1 === selectedLayoutIndex ? 'selected-layout-con' : 'layout-con'
                  }`}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-md-12">
              <input
                id="issueName"
                className={`form-control${issueName ? ' is-valid' : ''}`}
                placeholder="Issue Name"
                value={issueName}
                onChange={(e) => setIssueName(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <div
                className="row vote-sm-container mb-2 mr-0"
                onClick={() => setWantsToVote(!wantsToVote)}
              >
                <div>Vote as scrum master</div>
                <i
                  className={`${wantsToVote ? 'fa fa-check-square ' : 'fa fa-square-o '}  ml-1`}
                  style={{ fontSize: 22, color: wantsToVote ? '#6dbd8e' : '' }}
                ></i>
              </div>
            </div>
          </div>
          <div className="button" onClick={handleSubmit}>
            {loading && (
              <img src={images.loader} className="mr-2" width="20px" height="20px" alt="" />
            )}
            <div className="buttonText">Start Estimation</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default memo(IssueScreen)
