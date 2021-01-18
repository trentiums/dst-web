import React, { memo } from 'react'
import { Button, Modal } from 'react-bootstrap'
import images from '../../assets/images'

function infoModal({ description, isShow, setShow, onClick }) {
  return (
    <Modal show={isShow} onHide={() => setShow(false)} backdrop="static">
      <Modal.Body>
        <div className="row m-0 p-0 justify-content-center align-items-center text-center">
          <img src={images.logo} alt="" width={100} height={100} />
          <div>{description}</div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={() => onClick('No')}>
          No
        </Button>
        <Button
          style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
          onClick={() => onClick('Yes')}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default memo(infoModal)
