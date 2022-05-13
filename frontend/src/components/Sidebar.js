import * as React from "react";
import Nav from "react-bootstrap/Nav";

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
            <Nav.Link href="/lorem">Overview</Nav.Link>
            <Nav.Link href="/lorem">How does this help us?</Nav.Link>
            <Nav.Link href="/lorem">Labelling Tutorial</Nav.Link>
            <Nav.Link href="/lorem">Labelling Practice</Nav.Link>
            <Nav.Link href="/lorem">Telling Components Apart</Nav.Link>
            <Nav.Link href="/lorem">Leave a Comment</Nav.Link>
        </Nav>
    );
};

export default Sidebar;
