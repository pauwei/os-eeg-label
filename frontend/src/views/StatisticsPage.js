import { React, useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { ArrowClockwise } from 'react-bootstrap-icons';
import axios from 'axios';
import Divider from '../components/Divider';
import { AuthConsumer } from '../helpers/AuthContext';

const StatisticsPage = () => {
    
    const [stats, setStats] = useState({});
    const [lastExp, setLastExp] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [weights, setWeights] = useState({});
    const [submitMessage, setSubmitMessage] = useState("");

    const getStatistics = () => {
        setRefresh(true);
        setSubmitMessage("");

        //Get statistics from dropbox api
        axios.get('/dropbox/statistics')
        .then((res) => {
            let rawData = res.data;

            //Set last experiment data and remove from object
            setLastExp(rawData.lastExp);
            delete rawData.lastExp

            //Set stats to rest of data
            setStats(rawData);

            //Update UI to reflect data status
            setRefresh(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const submitWeights = () => {
        setSubmitMessage("");
        let submittedWeight = 0.0;

        Object.keys(stats).forEach( (key) => {
            if (key in weights && weights.hasOwnProperty(key)) {
                submittedWeight = submittedWeight + parseFloat(weights[key]);

                //Check if value was valid
                if (isNaN(submittedWeight)) {
                    setSubmitMessage("Invalid weight for study " +  key + ".");
                    return;
                }
            } else {
                setSubmitMessage("Not all weights were assigned a value. Please assign a value even if it is 0.");
                return;
            }
        })

        if (isNaN(submittedWeight)) {
            setSubmitMessage("Invalid weight submitted.");
            return;
        } else if (submittedWeight < 0.9999 || submittedWeight > 1.0001) {
            setSubmitMessage("Total weight must be between 0.999 and 1.001.");
            return;
        }

        axios.post(
            '/dropbox/weights',
            weights
        ).then( (res) => {
            setSubmitMessage("Success");
        }).catch( (err) => {
            setSubmitMessage("Submission Unsuccessfuly: " + err);
        })
    }

    useEffect(() => {
        getStatistics();
    }, []);


    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div style={{paddingTop: '90px'}}>
                            <p>This is the statistics page. You can view the statistics related to components below.</p>
                            
                            <Container fluid style={{width: '75%'}}>
                                <Container>
                                    {refresh
                                        ? (
                                            <Button
                                                variant='primary'
                                                type='submit'
                                                onClick={getStatistics}
                                                style={{float: 'right'}}
                                            >
                                                <Spinner animation="border" />   
                                            </Button>
                                        )
                                        : (
                                            <Button
                                                variant='primary'
                                                type='submit'
                                                onClick={getStatistics}
                                                style={{float: 'right'}}
                                            >
                                                <ArrowClockwise /> &nbsp; Refresh
                                            </Button>
                                        )
                                        
                                    }
                                </Container>
                                

                                <Container>
                                    <div style={{paddingTop: '50px', paddingBottom: '10px'}}>
                                        <Divider title={"Labelling Statistics"} />
                                    </div>
                                    
                                    <Card
                                        bg='light'
                                        text='dark'
                                    >
                                        <Card.Header as='h3'>Component Statistics</Card.Header>
                                        <Table striped bordered hover >
                                            <thead>
                                                <tr>
                                                    <th>Study No.</th>
                                                    <th>No. Labeled Components</th>
                                                    <th>No. Components</th>
                                                    <th>Selection Weight</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(stats).map( (key, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{key}</td>
                                                            <td>{stats[key].completed}</td>
                                                            <td>{stats[key].total}</td>
                                                            <td>{stats[key].weight}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </Card>
                                    
                                    <Accordion style={{paddingTop: '30px'}}>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <b>Submit New Weighting System</b>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <p>
                                                    Valid weights are between 0.000 to 1.000. Please make sure 
                                                    that the sum of all weights when submitting is <b>1.000</b>
                                                </p>

                                                <Card>
                                                    <Card.Header>Submission Form</Card.Header>
                                                    <Form style={{padding: '15px'}}>
                                                        {Object.keys(stats).map( (key, index) => {
                                                            return (
                                                                <Form.Group as={Row} className={index} style={{padding: '5px'}}>
                                                                    <Form.Label column sm={5}>
                                                                        Selection Weight for Study {key}
                                                                    </Form.Label>
                                                                    <Col sm={5}>
                                                                        <Form.Control
                                                                            type="number"
                                                                            step="0.001"
                                                                            placeholder={`Enter a weight for study ${key}`}
                                                                            onChange={ (e) => {
                                                                                let tempWeight = weights;
                                                                                tempWeight[key] = e.target.value;
                                                                                setWeights(tempWeight);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
                                                            );
                                                        })}
                                                    </Form>

                                                    { submitMessage === "Success" && (
                                                        <Alert
                                                            key={'success'}
                                                            variant={'success'}
                                                        >
                                                            New Component Selection Weighting System Successfully Submitted!
                                                        </Alert>
                                                    )}

                                                    { (submitMessage !== "Success" && submitMessage.length !== 0) && (
                                                        <Alert
                                                            key={'warning'}
                                                            variant={'warning'}
                                                        >
                                                            {submitMessage}
                                                        </Alert>
                                                    )}


                                                    <Button
                                                        variant='primary'
                                                        type='submit'
                                                        onClick={submitWeights}
                                                        style={{marginTop: '10px'}}
                                                    >
                                                        Submit
                                                    </Button>
                                                    
                                                </Card>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>


                                    <div style={{paddingTop: '50px', paddingBottom: '10px'}}>
                                        <Divider title={"Labelling Logs"}/>
                                    </div>
                                    <Card
                                        bg='light'
                                        text='dark'
                                    >
                                        <Card.Header as='h3'>Component Selection</Card.Header>
                                        <Card.Text>
                                            <Table striped bordered hover
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Log Description</th>
                                                        <th>Metric</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Study from which last label was selected</td>
                                                        <td>{lastExp}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Text>
                                    </Card>
                                </Container>
                                
                            </Container>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <Container style={{paddingTop: '120px'}}>
                            <Card>
                                <Card.Header as='h3'>Sorry, looks like you are in the wrong place?</Card.Header>
                                <Card.Body>
                                    <Row style={{padding: '5px'}}>
                                        <p>You are not authorized to view the page.</p>
                                    </Row>
                                    <Row style={{padding: '5px'}}>
                                        <p>
                                            Please <a href="/logout">logout</a> and then login with correct credentials to access the page
                                        </p>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                    )
                }

                //If guest
                else {
                    return (
                        <Container style={{paddingTop: '120px'}}>
                            <Card>
                                <Card.Header as='h3'>Sorry, looks like you are in the wrong place?</Card.Header>
                                <Card.Body>
                                    <Row style={{padding: '5px'}}>
                                        <p>You are not authenticated to view the page.</p>
                                    </Row>
                                    <Row style={{padding: '5px'}}>
                                        <p>
                                            Please <a href="/login">login</a> with correct credentials to access the page
                                        </p>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
}

export default StatisticsPage;