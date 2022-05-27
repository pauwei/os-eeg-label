import * as React from "react";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import hnl from "../logos/HNLLogo_UF.png";
import tu from "../logos/Logo_TU-noBackground.png";

const Sidebar = () => {
    return (
        <Nav
            className="col-md-12 d-none d-md-block bg-light sidebar"
            style={{
                display: "inline-block",
                position: "absolute",
                width: "250px",
                height: "100%",
                left: 0,
                zIndex: 100,
                padding: "48px 0 0",
                boxShadow: "inset -1px 0 0 rgba(0, 0, 0, .1)",
            }}
        >
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Overview</Accordion.Header>
                    <Accordion.Body>
                        <Nav.Link href="/overview#intro">Introduction</Nav.Link>
                        <Nav.Link href="/overview#about">About this Project</Nav.Link>
                        <Nav.Link href="/overview#contribute">Why and How to Contribute</Nav.Link>
                        <Nav.Link href="/overview#acknowledgments">Acknowledgements</Nav.Link>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Tutorial</Accordion.Header>
                    <Accordion.Body>
                        <Nav.Link href="/tutorial#back">Background Literature</Nav.Link>
                        <Nav.Link href="/tutorial#diff">Differentiating Components</Nav.Link>
                        <Nav.Link href="/tutorial#howto">How to Label</Nav.Link>
                        <Nav.Link href="/tutorial#practice">Practice Labeling</Nav.Link>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Labeling</Accordion.Header>
                    <Accordion.Body>
                        <Nav.Link href="/label">Start Labeling</Nav.Link>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Resources</Accordion.Header>
                    <Accordion.Body>
                        <Nav.Link href="">Leave a comment</Nav.Link>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div style={{width: '250px', margin: 'auto', position: 'fixed', bottom: "30px"}}>
                <Row>
                    <Col style={{paddingRight: 0}}>
                        <img src={hnl} alt="HNL Logo" width="80px"/>
                    </Col>
                    <Col style={{paddingLeft: 0}}>
                        <img src={tu} alt="TU Logo" width="80px"/>
                    </Col>
                </Row>
            </div>
        </Nav>
        // <Nav
        //     className="col-md-12 d-none d-md-block bg-light sidebar"
        //     style={{
        //         display: "inline-block",
        //         position: "absolute",
        //         width: "250px",
        //         height: "100%",
        //         left: 0,
        //         zIndex: 100,
        //         padding: "48px 0 0",
        //         boxShadow: "inset -1px 0 0 rgba(0, 0, 0, .1)",
        //     }}
        // >
        //     <Nav.Link href="/lorem">Overview</Nav.Link>
        //     <Nav.Link href="/lorem">How does this help us?</Nav.Link>
        //     <Nav.Link href="/lorem">Labelling Tutorial</Nav.Link>
        //     <Nav.Link href="/lorem">Labelling Practice</Nav.Link>
        //     <Nav.Link href="/lorem">Telling Components Apart</Nav.Link>
        //     <Nav.Link href="/lorem">Leave a Comment</Nav.Link>
        // </Nav>
    );
};

export default Sidebar;
