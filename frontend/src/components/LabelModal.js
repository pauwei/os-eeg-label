import { React, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

const LabelModal = (props) => {
    const { open, getStatus, compName, compData, pracData } = props;

    const [show, setShow] = useState(open);
    const [data, setData] = useState(null);

    const componentData = () => {
        if(!data && getStatus) {
            axios.get(
                '/api/components/component',
                {
                    params: {
                        name: compName
                    },
                }
            ).then( (response) => {
                setData(response.data.labels);
                setShow(true);
            }).catch( (error) => {
                setShow(true);
            });
        } else if (!data && !getStatus) {
            setData(compData);
            setShow(true)
        } else {
            setShow(true);
        }
    }

    useEffect(() => {
        componentData();
    }, [data])

    return (
        <div>
            <Button variant="primary" onClick={componentData} style={{marginRight: '10px'}}>
                Show Results
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {compName.substring(0, compName.lastIndexOf('.'))} Results
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data ? (
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Domain</th>
                                    <th>Brain</th>
                                    <th>Muscle</th>
                                    <th>Eye</th>
                                    <th>Heart</th>
                                    <th>Line Noise</th>
                                    <th>Channel Noise</th>
                                    <th>Other</th>
                                    <th>?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map( (datapoint) => {
                                    return (
                                        <tr key={datapoint.email}>
                                            <th>{datapoint.domain}</th>
                                            <th>{datapoint.tags.includes("Brain") ? "✓" : ""}</th>
                                            <th>{datapoint.tags.includes("Muscle") ? "✓" : ""}</th>
                                            <th>{datapoint.tags.includes("Eye") ? "✓" : ""}</th>
                                            <th>{datapoint.tags.includes("Heart") ? "✓" : ""}</th>
                                            <th>{datapoint.tags.includes("Line Noise") ? "✓" : ""}</th>
                                            <th>{datapoint.tags.includes("Channel Noise") ? "✓" : ""}</th>
                                            <th>{datapoint.tags.includes("Other") ? "✓" : ""}</th>
                                            <th>{datapoint.tags.includes("Unsure") ? "✓" : ""}</th>
                                        </tr>
                                    );
                                })}
                                {pracData && (
                                    <tr key='practice' style={{backgroundColor: '#C2EABD'}}>
                                        <th>Your Submission</th>
                                        <th>{pracData.includes("Brain") ? "✓" : ""}</th>
                                        <th>{pracData.includes("Muscle") ? "✓" : ""}</th>
                                        <th>{pracData.includes("Eye") ? "✓" : ""}</th>
                                        <th>{pracData.includes("Heart") ? "✓" : ""}</th>
                                        <th>{pracData.includes("Line Noise") ? "✓" : ""}</th>
                                        <th>{pracData.includes("Channel Noise") ? "✓" : ""}</th>
                                        <th>{pracData.includes("Other") ? "✓" : ""}</th>
                                        <th>{pracData.includes("Unsure") ? "✓" : ""}</th>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        
                        <div className="alert alert-danger" role="alert">
                            No Data Retrieved (You Are The First To Label This Component!)
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default LabelModal