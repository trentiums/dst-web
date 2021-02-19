import React, { memo } from 'react'
import { Button, Modal } from 'react-bootstrap'

function EditTeamspace({ isShow, setShow }) {
  return (
    <div>
      <Modal show={isShow} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teamspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signin " onSubmit={() => {}}>
            <div className="row">
              <div className="col-md-12">
                <input
                  id="name"
                  className={`form-control${
                    // registerDetails?.errors?.firstName ? ' is-invalid' : ''
                    ''
                  }`}
                  placeholder="Name"
                  // value={registerDetails?.fields?.firstName || ''}
                  onChange={(e) => {}}
                />
              </div>
              <div className="col-md-12 mt-3">
                <textarea
                  id="description"
                  rows={4}
                  className={`form-control${
                    // registerDetails?.errors?.firstName ? ' is-invalid' : ''
                    ''
                  }`}
                  placeholder="Description(Optional)"
                  // value={registerDetails?.fields?.firstName || ''}
                  onChange={(e) => {}}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
            onClick={() => setShow(false)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default memo(EditTeamspace)
