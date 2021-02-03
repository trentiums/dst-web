import React, { memo,useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CalendarModal({ isShow, setShow }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    const onDateChange = (dates) => {
        // console.log(Moment(date[0]).format("YYYY/MM/DD"))
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(startDate,"ssss",endDate)
    }
    //  const onDateSelect = (dates,endt) => {
    //         console.log(endt)
    //         const [start, end] = dates;
    //         setStartDate(start);
    //         setEndDate(end);
    //         console.log(startDate,"ssss",endDate)
    
    //     }
    return (
        <div>
            <Modal show={isShow} onHide={() => setShow(false)}>
                <Modal.Header closeButton style={{ display: "flex",justifyContent:"center" }}>
                    <Modal.Title> SELECT DATE RANGE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-signin " onSubmit={() => { }}>
                        <div className="row">
                            <div className="col-md-12" style={{ display: "flex",justifyContent:"center" }}>
                                <DatePicker
                                        maxDate={new Date()}
                                        selected={startDate}
                                        dateFormat="dd/MM/yyyy"
                                        // onSelect={onDateSelect}
                                        onChange={onDateChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        inline
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
                        Confirm
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default memo(CalendarModal)
