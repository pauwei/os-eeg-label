import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { navigate } from '@reach/router';
import Sidebar from "../components/Sidebar";

const ContactUs = () => {

    const [key, setKey] = useState('back');

    const changeTab = (k) => {
        navigate('/contact#' + k);
    }

    useEffect(() => {
        //Get id from relative pathname
        const path = window.location.href;
        const tab = path.substring(path.lastIndexOf("#") + 1);

        //Use id to set tab
        if (tab !== "contribute" && tab !== "feedback" && tab !== "qa" && tab !== "info") {
            setKey("feedback");
        } else {
            setKey(tab);
        }
    }, [window.location.href]);

    return (
        <div>
            <Sidebar />
            <Container style={{paddingLeft: '250px', paddingTop: '100px'}}>
                <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(k) => changeTab(k)}
                    className="mb-3"
                >
                    <Tab eventKey="feedback" title="Feedback">
                        <Card>
                            <Container style={{padding: '20px'}}>
                                <Container style={{textAlign: 'left'}}>
                                    <Alert variant="info">
                                        We are working on creating a feedback form to make it
                                        easier for you to give us feedback. If you need to give 
                                        immediate feedback, please go to
                                        the <a href="/contact#info">Contact Info Tab</a> to
                                        get information on how to reach us.
                                    </Alert>
                                </Container>
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="contribute" title="Contributing Data">
                        <Card>
                            <Container style={{padding: '20px'}}>
                                <Container style={{textAlign: 'left'}}>
                                    <Alert variant="info">
                                        We are working on creating forms that will make it easier for you 
                                        to reach out and contribute data to our project. In the meantime,
                                        please email either of the following to begin the process of 
                                        contributing data to the project:

                                        <br/><br/>
                                        <ul>
                                            <li><a href="mailto:jacobsen.noelle@ufl.edu">jacobsen.noelle@ufl.edu</a></li>
                                            <li><a href="mailto:icmobiproject@gmail.com">icmobiproject@gmail.com</a></li>
                                        </ul>
                                    </Alert>
                                </Container>
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="qa" title="Q&A">
                        <Card>
                            <Container style={{padding: '20px'}}>
                                <Container style={{textAlign: 'left'}}>
                                    We will update this section with the most frequent questions
                                    and their answers.
                                </Container>
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="info" title="Contact Info">
                        <Card>
                            <Container style={{padding: '20px'}}>
                                <Container style={{textAlign: 'left'}}>
                                    For data contributions, questions, comments, or concerns, 
                                    please email either of the following:

                                    <br/><br/>
                                    <ul>
                                        <li><a href="mailto:jacobsen.noelle@ufl.edu">jacobsen.noelle@ufl.edu</a></li>
                                        <li><a href="mailto:icmobiproject@gmail.com">icmobiproject@gmail.com</a></li>
                                    </ul>
                                </Container>
                            </Container>
                        </Card>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default ContactUs;
