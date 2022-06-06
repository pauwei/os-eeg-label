import { React, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingSpinner from "../components/LoadingSpinner";
import LabelModal from "../components/LabelModal";
import { AuthConsumer } from "../helpers/AuthContext";

import Sidebar from "../components/Sidebar";

const PracticePage = () => {

    //Loading variables
    const [isLoading, setIsLoading] = useState(false);

    //Width variables
    const [width, setWidth] = useState(window.innerWidth);

    //Label image data
    const [labelImage, setLabelImage] = useState(null);
    const [labelFile, setLabelFile] = useState("");

    //Checkbox values
    const [brain, setBrain] = useState(false);
    const [muscle, setMuscle] = useState(false);
    const [eye, setEye] = useState(false);
    const [heart, setHeart] = useState(false);
    const [linenoise, setLinenoise] = useState(false);
    const [channoise, setChannoise] = useState(false);
    const [other, setOther] = useState(false);

    //List of checkbox values
    const [prac, setPrac] = useState(null);

    //Submission
    const [status, setStatus] = useState("");

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    const submitResults = () => {
        let tags = [];

        //Save the results temporarily
        //Results will be pushed to label modal
        if (brain) { tags.push("Brain"); }
        if (muscle) { tags.push("Muscle"); }
        if (eye) { tags.push("Eye"); }
        if (heart) { tags.push("Heart"); }
        if (linenoise) { tags.push("Line Noise"); }
        if (channoise) { tags.push("Channel Noise"); }
        if (other) { tags.push("Other"); }

        setPrac(tags);

        //Set status to always success since no submission is required
        setStatus("success");
    };

    const getNext = () => {
        setStatus("");
        getImage();
    }

    const getImage = () => {
        //While getting image, loading is true
        setIsLoading(true);
        
        //Set all checkboxes to blank
        setBrain(false);
        setMuscle(false);
        setEye(false);
        setHeart(false);
        setLinenoise(false);
        setChannoise(false);
        setOther(false);

        //Get image file name first then the image data
        axios.get(
            '/dropbox/imagefile',
            { 
                params: {
                    email: localStorage.getItem("Email"),
                },
            }
        ).then ((response) => {
            //Set the image file
            setLabelFile(response.data);

            //Get the corresponding image file data
            axios
                .get("/dropbox/imagedata", {
                    responseType: "arraybuffer",
                    params: {
                        imagefile: response.data,
                    },
                })
                .then((res) => {
                    const base64 = btoa(
                        new Uint8Array(res.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                        )
                    );
                    setLabelImage(base64);
                    setIsLoading(false);
                })
                .catch(() => {
                    //TODO
                    //Unable to get image
                    setIsLoading(false);
                });;
        })
        .catch(() => {
            //TODO
            //Unable to get image
            if (isLoading) setIsLoading(false);
            if (status) setStatus("");
        });
    };

    useEffect(() => {
        if (!status)
            getImage();

        //Get window size
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <AuthConsumer>
            {({ Auth }) => {
                return (
                    <div>
                        {width > 768 && <Sidebar /> }
                        <div style={{paddingLeft: width > 768 ? "250px" : "0px", paddingTop: '90px'}}>
                            <h2>
                                Labeling Practice
                            </h2>
                            <p>
                                Results will not be stored for practice.
                            </p>
                            { isLoading ?
                                <LoadingSpinner /> :
                                <div
                                    style={{
                                        display: 'flex',
                                        position: "relative",
                                        opacity: status ? "0.33" : "1.0",
                                    }}
                                >
                                    
                                    <img
                                        src={`data:image/jpeg;charset=utf-8;base64,${labelImage}`}
                                        alt="Labeling data"
                                        width="80%"
                                        height="auto"
                                        style={{border: '2px solid #C0C2C9'}}
                                    />

                                    <div>
                                    <Form.Group
                                                className="flex-row"
                                                controlId="formBasicCheckbox"
                                            >
                                                <Form.Check
                                                    id="brain"
                                                    type="checkbox"
                                                    label="Brain"
                                                    checked={brain}
                                                    style={{textAlign: 'left', paddingLeft: '40px', borderRadius: '10px', background: '#00A5E0', margin: '10px'}}
                                                    onChange={(e) => setBrain(e.target.checked)}
                                                />
                                                <Form.Check
                                                    id="muscle"
                                                    type="checkbox"
                                                    label="Muscle"
                                                    checked={muscle}
                                                    style={{textAlign: 'left', paddingLeft: '40px', borderRadius: '10px', background: '#EF9CDA', margin: '10px'}}
                                                    onChange={(e) => setMuscle(e.target.checked)}
                                                />
                                                <Form.Check
                                                    id="eye"
                                                    type="checkbox"
                                                    label="Eye"
                                                    checked={eye}
                                                    style={{textAlign: 'left', paddingLeft: '40px', borderRadius: '10px', background: '#89A1EF', margin: '10px'}}
                                                    onChange={(e) => setEye(e.target.checked)}
                                                />
                                                <Form.Check
                                                    id="heart"
                                                    type="checkbox"
                                                    label="Heart"
                                                    checked={heart}
                                                    style={{textAlign: 'left', paddingLeft: '40px', borderRadius: '10px', background: '#FECEF1', margin: '10px'}}
                                                    onChange={(e) => setHeart(e.target.checked)}
                                                />
                                                <Form.Check
                                                    id="linenoise"
                                                    type="checkbox"
                                                    label="Line Noise"
                                                    checked={linenoise}
                                                    style={{textAlign: 'left', paddingLeft: '40px', borderRadius: '10px', background: '#C2EABD', margin: '10px'}}
                                                    onChange={(e) => setLinenoise(e.target.checked)}
                                                />
                                                <Form.Check
                                                    id="channoise"
                                                    type="checkbox"
                                                    label="Chan Noise"
                                                    checked={channoise}
                                                    style={{textAlign: 'left', paddingLeft: '40px', borderRadius: '10px', background: '#32CBFF', margin: '10px'}}
                                                    onChange={(e) => setChannoise(e.target.checked)}
                                                />
                                                <Form.Check
                                                    id="other"
                                                    type="checkbox"
                                                    label="Other"
                                                    checked={other}
                                                    style={{textAlign: 'left', paddingLeft: '40px', borderRadius: '10px', background: '#DCF2B0', margin: '10px'}}
                                                    onChange={(e) => setOther(e.target.checked)}
                                                />
                                            </Form.Group>
                                        <Button
                                            variant="info"
                                            type="submit"
                                            onClick={submitResults}
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            }

                            <br />
                            {status === "success" && (
                                <Container style={{width: '50%'}}>
                                    <Card
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    Label Successfully Submitted.
                                                </Col>
                                                <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <LabelModal open={true} getStatus={true} compName={labelFile} compData={null} pracData={prac}/>
                                                    <Button variant="primary" onClick={getNext}>
                                                        Next
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Container>
                            )}
                            {status === "failed" && (
                                <Container style={{width: '50%'}}>
                                <Card
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                Label Submission Unsuccessful.
                                            </Col>
                                            <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <LabelModal open={true} getStatus={true} compName={labelFile} compData={null} pracData={prac}/>
                                                <Button variant="primary" onClick={getNext}>
                                                    Next
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Container>
                            )}
                        </div>
                    </div>
                );
            }}
        </AuthConsumer>
    );
};

export default PracticePage;
