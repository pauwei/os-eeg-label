import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthConsumer } from "../helpers/AuthContext";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AuthConsumer>
            {( {Auth, login} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <p>{Auth}</p>
                            <p>Hey, you already signed in. Feel free to go to the labelling page.</p>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <p>{Auth}</p>
                            <p>Hey, you already signed in. Feel free to go to the labelling page.</p>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <Container>
                            <Container fluid>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={() => { login({email, password})}}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                                <p>You are not authenticated. Please make sure you signup before signing in. {Auth}</p>
                            </Container>
                        </Container>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default Login;