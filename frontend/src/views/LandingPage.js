import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { AuthConsumer } from "../helpers/AuthContext";
import Sidebar from "../components/Sidebar";

const LandingPage = () => {
    return (
        <AuthConsumer>
            {({ Auth }) => {
                //If admin
                if (Auth === "Admin") {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px'}}>
                                <p>
                                    You are logged in as an admin. Your labeling progress will
                                    be recorded.
                                </p>
                            </div>
                            
                        </div>
                    );
                }

                //If logged in user
                else if (Auth === "User") {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px'}}>
                                <p>
                                    You are logged in as a user. Your labeling progress will
                                    be recorded.
                                </p>
                            </div>
                        </div>
                    );
                }

                //If guest
                else {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px'}}>
                                <p>
                                    You are not logged in. Please login to contribute to labeling
                                    and have your progress recorded.
                                </p>
                                <Container>
                                    <Row style={{padding: '20px'}}>
                                        <a href="/signup">Don't have an account? Sign up here</a>
                                    </Row>
                                    <Row style={{padding: '20px'}}>
                                        <a href="/login">Have an account? Login here</a>
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
