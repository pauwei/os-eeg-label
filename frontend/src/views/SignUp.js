import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { AuthConsumer } from "../helpers/AuthContext";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setStatus] = useState("");

    return (
        <AuthConsumer>
            {({ Auth, signup }) => {
                //If admin
                if (Auth === "Admin") {
                    return (
                        <div>
                            <p>
                                You already signed in. Please sign out to sign
                                up for another account.
                            </p>
                        </div>
                    );
                }

                //If logged in user
                else if (Auth === "User") {
                    return (
                        <div>
                            <p>
                                You already signed in. Please sign out to sign
                                up for another account.
                            </p>
                        </div>
                    );
                }

                //If guest
                else {
                    return (
                        <Container>
                            <Container fluid>
                                <h2>Signup Below</h2>
                                <br />
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="signUpEmail"
                                    >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="signUpPassword"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="button"
                                        onClick={() => {
                                            signup({
                                                email,
                                                password,
                                            }).then(
                                                () => {
                                                    console.log(
                                                        "Signup Success."
                                                    );
                                                    setStatus(true);
                                                    setMessage(
                                                        "Signup Success."
                                                    );
                                                },
                                                (reason) => {
                                                    console.log(reason); //Fix
                                                    setStatus(false);
                                                    setMessage(
                                                        "Signup Failed."
                                                    );
                                                }
                                            );
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                                <br />
                                {message && success && (
                                    <div
                                        class="alert alert-success"
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                )}
                                {message && !success && (
                                    <div
                                        class="alert alert-danger"
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                )}
                            </Container>
                        </Container>
                    );
                }
            }}
        </AuthConsumer>
    );
};

export default SignUp;
