import React, { memo, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import HistoryModal from '../components/commonModals/historyModal'
import CalendarModal from '../components/commonModals/calendarModal'
import { NotificationManager } from 'react-notifications'
import "../style.css"
function LayoutScreen() {
    const initialState = {
        fields: {},
        errors: {},
    }
    // const [date, setDate] = useState('');
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedHistory, setSelectedHistory] = useState({ showModal: false })
    // const [historyIndex, setHistoryIndex] = useState(null)
    const [search, setSearch] = useState(initialState)
    // const history = useHistory()

    const enableCalendar = () => {
        setShow(true)
    }
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
    const handleChange = (e, field) => {
        let fields = search.fields
        let errors = search.errors
        fields[field] = e.target.value
        errors[field] = undefined
        setSearch({ ...search, fields, errors })
    }

    return (

        <div className="page_container">
            <HistoryModal selectedHistory={selectedHistory} setSelectedHistory={setSelectedHistory} />
            <div className="history-header-container">
                <form classname="row " style={{ width: "100%", display: 'flex' }}>
                    <div className="" style={{ display: 'flex', justifyContent: 'flex-end', flex: "0.25" }}>
                        <CalendarModal isShow={show} setShow={setShow} />
                        <i className="fa fa-calendar " style={{ fontSize: "24px" }} onClick={enableCalendar}></i>

                    </div>
                    <div className="col-md-8" style={{ display: 'flex', flex: "0.5" }}>
                        <input
                            type="search"
                            id="search"
                            className="searchBox"
                            style={{ width: '100%' }}
                            placeholder="Search"
                            onChange={(e) => handleChange(e, 'search')}
                        /></div>
                    <div className="" style={{ display: 'flex', flex: "0.25", padding: "5px 0 0 0" }}> <i class="fa fa-search fa-lg" onClick={handleSubmit}></i></div>
                </form>
            </div>
            <div className="col-md-8 history-content-list" >
                {[
                    {
                        issueName: 'ravi',
                        users: [{
                            issueName: "ravindra1",
                            card: "ONE"
                        }]
                    },
                    {
                        issueName: "ravindra1",
                        users: [{
                            issueName: "ravindra1",
                            card: "ONE"
                        }]
                    },
                    {
                        issueName: "ravindra2",
                        users: [{
                            issueName: "ravindra1",
                            card: "ONE"
                        }]
                    }
                ].map((historyObj, i) => (
                    <div className="insideRow" onClick={() =>
                        setSelectedHistory({ ...historyObj, showModal: true })
                    }>

                        <div className="insideRowA" style={{ display: "flex", flex: "0.5" }}>
                            <div>
                                01/29/2021
                            </div>
                            <div>
                                TEST
                            </div>
                        </div>
                        <div className="insideRowB" style={{ display: "flex", flex: "0.5" }}>
                            <div >
                                <b> ZERO</b>
                            </div>
                            <div>
                                <i class="fa fa-plus fa-lg"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="button mt-3 mb-3" style={{ width: "60%" }} onClick={handleSubmit}>
                <div className="buttonText"><b>Share</b></div>
            </div>
        </div >
    )
}
export default memo(LayoutScreen)
