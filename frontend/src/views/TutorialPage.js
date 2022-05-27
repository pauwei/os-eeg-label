import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import { navigate } from '@reach/router';
import Sidebar from "../components/Sidebar";

const TutorialPage = () => {

    const [key, setKey] = useState('back');

    const changeTab = (k) => {
        navigate('/tutorial#' + k);
    }

    useEffect(() => {
        //Get id from relative pathname
        const path = window.location.href;
        const tab = path.substring(path.lastIndexOf("#") + 1);

        //Use id to set tab
        setKey(tab);
    }, [window.location.href]);

    return (
        <div>
            <Sidebar />
            <Container style={{paddingLeft: '250px', paddingTop: '20px'}}>
                <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(k) => changeTab(k)}
                    className="mb-3"
                >
                    <Tab eventKey="back" title="Background Literature">
                        These tutorial pages assume you are comfortable with the 
                        basic concepts of EEG source analysis. If you are not, we 
                        encourage you to read some background literature.
                    </Tab>
                    <Tab eventKey="diff" title="Differentiating Components">
                        This section discusses some basic guidelines for 
                        differentiating components.
                    </Tab>
                    <Tab eventKey="howto" title="How to Label">
                        This section discusses how to label components on this 
                        website.
                    </Tab>
                    <Tab eventKey="practice" title="Practice Labeling">
                        <Container style={{margin: '20px'}}>
                            Ready to practice? Follow the link below.
                        </Container>
                        <Container>
                            <Button variant="info"  href="/practice">
                                Go to Practice Page
                            </Button>
                        </Container>
                    </Tab>

                </Tabs>
            </Container>
        </div>
    );
};

export default TutorialPage;
