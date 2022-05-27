import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { navigate } from '@reach/router';
import { AuthConsumer } from "../helpers/AuthContext";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [assoc, setAssoc] = useState("");
    const [edu, setEdu] = useState("");
    const [exp, setExp] = useState("");
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
                            <br />
                            <h2>Signup Below</h2>
                            <br />

                            <Form>      
                                <Card>
                                    <Card.Body>
                                        {/*Name*/}
                                        <Row>
                                            {/*First Name*/}
                                            <Col>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="signUpFirstName"
                                                >
                                                    <Form.Label style={{ float: 'left'}} >First Name</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter First Name"
                                                        onChange={(e) =>
                                                            setFname(e.target.value)
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>

                                            {/*Last Name*/}
                                            <Col>
                                                <Form.Group
                                                        className="mb-3"
                                                        controlId="signUpLastName"
                                                    >
                                                        <Form.Label style={{ float: 'left'}} >Last Name</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Enter Last Name"
                                                            onChange={(e) =>
                                                                setLname(e.target.value)
                                                            }
                                                        />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {/*Association*/}
                                        <Row>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="signUpAssociation"
                                            >
                                                <Form.Label style={{ float: 'left'}} >University / Company</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter University / Company"
                                                    onChange={(e) =>
                                                        setAssoc(e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Row>

                                        {/*Background Information*/}
                                        <Row>
                                            {/*Education Level*/}
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label style={{ float: 'left'}} >Education Level</Form.Label>
                                                    <Form.Select
                                                        onChange={(e) => setEdu(e.target.value)}
                                                    >
                                                        <option>Highest Degree Complete</option>
                                                        <option value="None">No schooling complete</option>
                                                        <option value="SomeHS">Some high school, no diploma</option>
                                                        <option value="HS">High school graduate, diploma or the equivalent (ex. GED)</option>
                                                        <option value="SomeCollege">Some college credit, no degree</option>
                                                        <option value="TradeSchool">Trade/technical/vocational training</option>
                                                        <option value="AA">Associate degree</option>
                                                        <option value="BS">Bachelor's degree</option>
                                                        <option value="MS">Master's degree</option>
                                                        <option value="Professional">Professional degree</option>
                                                        <option value="Ph.D.">Doctorate degree</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>

                                            {/*Experience*/}
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label style={{ float: 'left'}} >Experience with EEG Labeling</Form.Label>
                                                    <Form.Select
                                                        onChange={(e) => setExp(e.target.value)}
                                                    >
                                                        <option>Years of Experience</option>
                                                        <option value="<0.5">Less than 6 months</option>
                                                        <option value="0.5-1">6 to 12 months</option>
                                                        <option value="1-3">1 to 3 years</option>
                                                        <option value="4-6">4 to 6 years</option>
                                                        <option value="7+">7 or more years</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        
                                        <br />
                                        {/*Email*/}
                                        <Row>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="signUpEmail"
                                            >
                                                <Form.Label style={{ float: 'left'}} >Email address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Row>

                                        {/*Password*/}
                                        <Row>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="signUpPassword"
                                            >
                                                <Form.Label style={{ float: 'left'}} >Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter password"
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Row>

                                        {/*Confirm Password*/}
                                        <Row>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="signUpConfirmPassword"
                                            >
                                                <Form.Label style={{ float: 'left'}} >Confirm Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Re-type password"
                                                    onChange={(e) =>
                                                        setConfirmpass(e.target.value)
                                                    }
                                                />
                                            </Form.Group>
                                        </Row>
                                    
                                        <br />
                                        <Row>
                                            <Col>
                                            </Col>
                                            <Col>
                                                {/*Submit Button*/}
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    style={{ width: '50%'}}
                                                    onClick={() => {
                                                        //Check if any fields are empty
                                                        if (!fname || !lname || !assoc || !edu || !exp || !email || !password) {
                                                            alert('Please fill out all the fields.');
                                                            return;
                                                        }

                                                        //Check if passwords match
                                                        if (password !== confirmpass) {
                                                            alert('Please make sure the passwords match.');
                                                            return;
                                                        }

                                                        //Signup the user
                                                        signup({
                                                            fname,
                                                            lname,
                                                            assoc,
                                                            edu,
                                                            exp,
                                                            email,
                                                            password,
                                                        }).then(
                                                            () => {
                                                                setStatus(true);
                                                                setMessage(
                                                                    "Signup Success."
                                                                );
                                                                setTimeout(() => {
                                                                    navigate('/login');
                                                                }, 3000);
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
                                                    Signup
                                                </Button>
                                            </Col>
                                            <Col>
                                            </Col>                                 
                                        </Row>
                                    </Card.Body>
                                </Card>
                                {!message && (
                                    <Container style={{padding: '20px'}}>
                                        <a href="/login">Have an account? Login here</a>
                                    </Container>
                                )}
                            </Form>

                            <br />
                            {message && success && (
                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}
                            {message && !success && (
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

export default SignUp;
