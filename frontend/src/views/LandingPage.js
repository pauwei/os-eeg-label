import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { AuthConsumer } from "../helpers/AuthContext";
import Sidebar from "../components/Sidebar";

const LandingPage = () => {
    return (
        <AuthConsumer>
            {({ Auth, Name }) => {
                //If admin
                if (Auth === "Admin") {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px', paddingTop: '100px'}}>
                            <Container >
                                    <Card>
                                        <Card.Header as='h3'>Welcome to ICMoBI</Card.Header>
                                        <Container 
                                            style={{
                                                paddingTop: '20px',
                                                paddingLeft: '40px',
                                                paddingRight: '40px',
                                                paddingBottom: '20px',
                                                textAlign: 'left'
                                            }}
                                        >
                                            This is a collaborative project dedicated to 
                                            identifying Independent Components of Mobile Brain Imaging. 
                                            Our objectives are to 1) help train researchers to 
                                            differentiate between neural and non-neural independent 
                                            components (ICs) extracted from EEG data using independent 
                                            component analysis and 2) collect crowd-sourced labels for 
                                            independent components.
                                        </Container>
                                    </Card>
                                    <Row style={{paddingTop: '30px'}}>
                                        <Col>
                                            <Card>
                                                <Card.Header as='h5'>Still Figuring Things Out?</Card.Header>
                                                <Container 
                                                    style={{
                                                        paddingTop: '20px',
                                                        paddingLeft: '40px',
                                                        paddingRight: '40px',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    Checkout some of the resources to learn more about 
                                                    or test out your knowledge on EEG labeling.
                                                </Container>
                                                <Container style={{padding: '20px'}}>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/overview">Learn more about the project?</a>
                                                    </Row>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/tutorial#back">Interested in the background?</a>
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Header as='h5'>Ready To Begin Labeling?</Card.Header>
                                                <Container 
                                                    style={{
                                                        paddingTop: '20px',
                                                        paddingLeft: '40px', 
                                                        paddingRight: '40px', 
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    Hi {Name}! You have logged in. You can either 
                                                    choose to practice or start contributing 
                                                    via the labeling page
                                                </Container>
                                                <Container style={{padding: '20px'}}>
                                                    <Row style={{padding: '5px'}}>
                                                        <Col>
                                                            <Button variant="info" href="/practice">Practice</Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="primary" href="/label">Go Label</Button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    );
                }

                //If logged in user
                else if (Auth === "User") {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px', paddingTop: '100px'}}>
                                <Container >
                                    <Card>
                                        <Card.Header as='h3'>Welcome to ICMoBI</Card.Header>
                                        <Container 
                                            style={{
                                                paddingTop: '20px',
                                                paddingLeft: '40px',
                                                paddingRight: '40px',
                                                paddingBottom: '20px',
                                                textAlign: 'left'
                                            }}
                                        >
                                            This is a collaborative project dedicated to 
                                            identifying Independent Components of Mobile Brain Imaging. 
                                            Our objectives are to 1) help train researchers to 
                                            differentiate between neural and non-neural independent 
                                            components (ICs) extracted from EEG data using independent 
                                            component analysis and 2) collect crowd-sourced labels for 
                                            independent components.
                                        </Container>
                                    </Card>
                                    <Row style={{paddingTop: '30px'}}>
                                        <Col>
                                            <Card>
                                                <Card.Header as='h5'>Still Figuring Things Out?</Card.Header>
                                                <Container 
                                                    style={{
                                                        paddingTop: '20px',
                                                        paddingLeft: '40px',
                                                        paddingRight: '40px',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    Checkout some of the resources to learn more about 
                                                    or test out your knowledge on EEG labeling.
                                                </Container>
                                                <Container style={{padding: '20px'}}>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/overview">Learn more about the project?</a>
                                                    </Row>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/tutorial">Interested in the background?</a>
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Header as='h5'>Ready To Begin Labeling?</Card.Header>
                                                <Container 
                                                    style={{
                                                        paddingTop: '20px',
                                                        paddingLeft: '40px', 
                                                        paddingRight: '40px', 
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    Hi {Name}! You have logged in. You can either 
                                                    choose to practice or start contributing 
                                                    via the labeling page
                                                </Container>
                                                <Container style={{padding: '20px'}}>
                                                    <Row style={{padding: '5px'}}>
                                                        <Col>
                                                            <Button variant="info" href="/practice">Practice</Button>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="primary" href="/label">Go Label</Button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    );
                }

                //If guest
                else {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px', paddingTop: '100px'}}>
                                <Container >
                                    <Card>
                                        <Card.Header as='h3'>Welcome to ICMoBI</Card.Header>
                                        <Container 
                                            style={{
                                                paddingTop: '20px',
                                                paddingLeft: '40px',
                                                paddingRight: '40px',
                                                paddingBottom: '20px',
                                                textAlign: 'left'
                                            }}
                                        >
                                            This is a collaborative project dedicated to 
                                            identifying Independent Components of Mobile Brain Imaging. 
                                            Our objectives are to 1) help train researchers to 
                                            differentiate between neural and non-neural independent 
                                            components (ICs) extracted from EEG data using independent 
                                            component analysis and 2) collect crowd-sourced labels for 
                                            independent components.
                                        </Container>
                                    </Card>
                                    <Row style={{paddingTop: '30px'}}>
                                        <Col>
                                            <Card>
                                                <Card.Header as='h5'>Still Figuring Things Out?</Card.Header>
                                                <Container 
                                                    style={{
                                                        paddingTop: '20px',
                                                        paddingLeft: '40px',
                                                        paddingRight: '40px',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    Checkout some of the resources to learn more about 
                                                    or test out your knowledge on EEG labeling.
                                                </Container>
                                                <Container style={{padding: '20px'}}>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/overview">Learn more about the project?</a>
                                                    </Row>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/tutorial#back">Interested in the background?</a>
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Header as='h5'>Ready To Begin Labeling?</Card.Header>
                                                <Container 
                                                    style={{
                                                        paddingTop: '20px',
                                                        paddingLeft: '40px', 
                                                        paddingRight: '40px', 
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    Please login to contribute to labeling
                                                    and have your progress recorded.
                                                </Container>
                                                <Container style={{padding: '20px'}}>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/signup">Don't have an account? Sign up here</a>
                                                    </Row>
                                                    <Row style={{padding: '5px'}}>
                                                        <a href="/login">Have an account? Login here</a>
                                                    </Row>
                                                </Container>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    );
                }
            }}
        </AuthConsumer>
    );
};

export default LandingPage;
