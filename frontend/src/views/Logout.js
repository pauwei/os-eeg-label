import { React, useEffect, useContext } from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { navigate } from '@reach/router';
import { AuthContext, AuthConsumer } from "../helpers/AuthContext";

const Logout = () => {

    const context = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            context.logout();
            navigate('/login')
        }, 3000);
    });

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <Container style={{paddingTop: '120px'}} >
                                <Card>
                                    <Card.Header as='h3'>Bye Bye Bye</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <p>Hey, progress has been saved. Sign back in to view any changes.</p>
                                        </Row>
                                        <Row>
                                            <p>You will be redirected in 3 seconds</p>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <Container style={{paddingTop: '120px'}}>
                                <Card>
                                    <Card.Header as='h3'>See you next time!</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <p>Hey, thanks for labelling. Have a great day!</p>
                                        </Row>
                                        <Row>
                                            <p>You will be redirected in 3 seconds</p>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <Container style={{paddingTop: '120px'}}>
                                <Card>
                                    <Card.Header as='h3'>Sorry, looks like you are in the wrong place?</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <p>You are not authenticated. Please login.</p>
                                        </Row>
                                        <Row>
                                            <p>You will be redirected in 3 seconds</p>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default Logout;