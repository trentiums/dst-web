import React, { memo } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { cards } from '../../assets/images'

function ResultModal({ isShow, setShow }) {
  return (
    <div>
      <Modal show={isShow} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Scrum master closed issue with 2.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row m-0 p-0 justify-content-center">
            <div style={{ backgroundColor: '#ea5153' }} className={`col-md-6 layout-item m-3`}>
              {['top-left', 'bottom-left', 'top-right', 'bottom-right'].map((style) => (
                <div className={`number num-${style}`}>1</div>
              ))}
              <img
                src={cards.cardset.DELEGATION_POKER_DEFAULT.card1middle}
                alt=""
                className="layout-image"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
            onClick={() => setShow(false)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default memo(ResultModal)
