import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AuthConsumer } from "../helpers/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    return (
        <AuthConsumer>
            {({ Auth, login }) => {
                //If admin
                if (Auth === "Admin") {
                    return (
                        <div>
                            <p>{Auth}</p>
                            <p>
                                Hey, you already signed in. Feel free to go to
                                the labelling page.
                            </p>
                        </div>
                    );
                }

                //If logged in user
                else if (Auth === "User") {
                    return (
                        <div>
                            <p>{Auth}</p>
                            <p>
                                Hey, you already signed in. Feel free to go to
                                the labelling page.
                            </p>
                        </div>
                    );
                }

                //If guest
                else {
                    return (
                        <Container>
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
                                                        login({
                                                            email,
                                                            password,
                                                        }).then(
                                                            () => {
                                                                console.log(
                                                                    "Login Success."
                                                                );
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
                            <p>
                                You are not authenticated. Please make sure
                                you signup before signing in. {Auth}
                            </p>
                        </Container>
                    );
                }
            }}
        </AuthConsumer>
    );
};

export default Login;
