import React, { memo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CalendarModal({ isShow, setShow }) {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [error, setError] = useState(null)
  const onDateChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <div>
      <Modal
        show={isShow}
        onHide={() => {
          setError(null)
          setShow(false)
        }}
      >
        <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center' }}>
          <Modal.Title> SELECT DATE RANGE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signin " onSubmit={() => {}}>
            {error && <div className="text-center error-msg mb-3">{error}</div>}
            <div className="row">
              <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                <DatePicker
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  onChange={onDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  shouldCloseOnSelect={startDate && endDate}
                  inline
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setError(null)
              setShow(false)
            }}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
            onClick={() => {
              console.log(startDate, endDate)
              if (!startDate) {
                setError('Please select start date.')
              } else if (!endDate) {
                setError('Please select end date.')
              } else {
                setError(null)
                setShow(false)
              }
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default memo(CalendarModal)
