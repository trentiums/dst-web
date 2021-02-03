import React, { memo } from 'react'
import { Button, Modal } from 'react-bootstrap'
import images from '../../assets/images'

function HistoryModal({ selectedHistory, setSelectedHistory }) {
    return (
        <div>
            <Modal show={selectedHistory.showModal} onHide={() => setSelectedHistory({...selectedHistory, showModal: false})}>
                <Modal.Header closeButton >
                    <Modal.Title> <img src={images.logo} className="logoImg" height="40px" width="40px" alt=""></img></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-signin " onSubmit={() => { }}>
                        <div className="row">
                            <div className="col-md-12" style={{ display: "flex" }}>
                                <div style={{ display: "flex", flex: "0.5", justifyContent: "center" }}>
                                    01/29/2021
                                </div>
                                <div style={{ display: "flex", flex: "0.5", justifyContent: "center" }}>
                                    <b> ZERO</b>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <input
                                    id="name"
                                    className={`form-control${
                                        // registerDetails?.errors?.firstName ? ' is-invalid' : ''
                                        ''
                                        }`}
                                        value={selectedHistory?.issueName || ''}
                                    placeholder="Issue"
                                    onChange={(e) => { }}
                                />
                            </div>
                            <div className="col-md-12 mt-3" style={{ display: "flex", flexDirection: "column" }}>
                                {[
                                    {
                                        name: "ravindra1",
                                        card: "ONE"
                                    },
                                    {
                                        name: "ravindra2",
                                        card: "TWO"
                                    }
                                ].map((data,i) => (
                                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                        {console.log(selectedHistory.users,"check")}

                                        <div style={{ display: "flex", flex: "0.5", justifyContent: "center" }}>
                                            {data.name}
                                        </div>
                                        <div style={{ display: "flex", flex: "0.5", justifyContent: "center" }}>
                                             {data.card}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() =>  setSelectedHistory({...selectedHistory, showModal: false})}>
                        Close
          </Button>
                    <Button
                        style={{ backgroundColor: '#6dbd8e', borderColor: '#7dce9f' }}
                        onClick={() =>  setSelectedHistory({...selectedHistory, showModal: false})}
                    >
                        Create
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default memo(HistoryModal)
