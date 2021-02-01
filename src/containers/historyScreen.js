import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import HeaderBtn from '../components/headerBtn'
import { NotificationManager } from 'react-notifications'
import images, { cards } from '../assets/images'
import "../style.css"
import Calendar from 'react-calendar';
function LayoutScreen() {
    const initialState = {
        fields: {},
        errors: {},
    }
    const [loading, setLoading] = useState(false)
    const [historyIndex, setHistoryIndex] = useState(null)
    const [search, setSearch] = useState(initialState)
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
    const handleChange = (e, field) => {
        let fields = search.fields
        let errors = search.errors
        fields[field] = e.target.value
        errors[field] = undefined
        setSearch({ ...search, fields, errors })
    }


    return (
        <div className="page_container">
            <div className="history-header-container">
                <form classname="row " style={{ width: "100%", display: 'flex' }}>
                    <div className="" style={{ display: 'flex', flex: "0.25" }}> {/* <Calendar/> */}</div>
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
                    <div className="insideRow">
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
        </div>
    )
}
export default memo(LayoutScreen)
