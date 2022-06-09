import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { navigate } from '@reach/router';
import { AuthConsumer } from "../helpers/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        //Check if redirect has already been called
        if (redirect) {
            return;
        }

        //Check if user has logged in
        const email = localStorage.getItem("Email");
        if (!email || email === "guest") {
            return;
        }

        setTimeout(() => {
            navigate('/dashboard')
        }, 3000);
    });

    return (
        <AuthConsumer>
            {({ Auth, Name, login }) => {
                //If admin
                if (Auth === "Admin") {
                    return (
                        <div style={{paddingTop: '100px'}}>
                            <Container>
                                <Card>
                                    <Card.Header as="h3">Hi {Name}</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <p>
                                                You have been signed in as admin. 
                                                Labeling progress will been saved.
                                            </p>
                                        </Row>
                                        <Row>
                                            <p>
                                                You will be redirected to the 
                                                dashboard in 3 seconds
                                            </p>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </div>
                    );
                }

                //If logged in user
                else if (Auth === "User") {
                    return (
                        <div style={{paddingTop: '100px'}}>
                            <Container>
                                <Card>
                                    <Card.Header as="h3">Hi {Name}</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <p>
                                                You have been signed in. 
                                                Labeling progress will been saved.
                                            </p>
                                        </Row>
                                        <Row>
                                            <p>
                                                You will be redirected to the 
                                                dashboard in 3 seconds
                                            </p>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </div>
                    );
                }

                //If guest
                else {
                    return (
                        <Container style={{paddingTop: '100px'}}>
                            <br />
                            <h2>Login Below</h2>
                            <br />
                            <Form>
                                <Card>
                                    <Card.Body>

                                        {/* Email Address */}
                                        <Row>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="loginEmail"
                                            >
                                                <Form.Label style={{ float: 'left' }} >Email address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Row>

                                        {/* Password */}
                                        <Row>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="loginPassword"
                                            >
                                                <Form.Label style={{ float: 'left' }} >Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter password"
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Row>

                                        {/* Login Button */}
                                        <Row>
                                            <Col></Col>
                                            <Col>
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    onClick={() => {
                                                        //email lowercased on the backend

                                                        login({
                                                            email,
                                                            password,
                                                        }).then(
                                                            () => {
                                                                setRedirect(true);
                                                                setTimeout(() => {
                                                                    navigate('/dashboard')
                                                                }, 3000);
                                                            },
                                                            (reason) => {
                                                                console.error(reason);
                                                                setMessage("Login Failed.");
                                                            }
                                                        );
                                                    }}
                                                >
                                                    Login
                                                </Button>
                                            </Col>
                                            <Col></Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                {!message && (
                                    <Container style={{padding: '20px'}}>
                                        <a href="/signup">Don't have an account? Sign up here</a>
                                    </Container>
                                )}
                            </Form>

                            <br />
                            {message && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}
                        </Container>
                    );
                }
            }}
        </AuthConsumer>
    );
};

export default Login;
