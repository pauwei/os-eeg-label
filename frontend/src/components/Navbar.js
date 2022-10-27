import * as React from 'react';
import { AuthConsumer } from '../helpers/AuthContext'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Nav from 'react-bootstrap/Nav'
import icmobi from '../logos/ICMOBI_logoArtboard_1.svg'

const ResponsiveAppBar = () => {

    return (
        <AuthConsumer>
            {({Auth, Name}) => {

                if (Auth === 'Admin') {
                    return (
                        <Navbar bg="light" fixed="top" expand={false}>
                            <Container fluid>
                                <Navbar.Brand href="/">
                                    <img src={icmobi} alt="ICMOBI logo" height="50px" style={{paddingLeft: '10%'}}/>
                                </Navbar.Brand>
                                <Nav className="flex-row">
                                    <Nav.Link className="mx-5" href="/label">Label</Nav.Link>
                                    <Nav.Link className="mx-5" href="/results">Leaderboard</Nav.Link>   
                                </Nav>

                                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                                <Navbar.Offcanvas
                                    id="offcanvasNavbar"
                                    aria-labelledby="offcanvasNavbarLabel"
                                    placement="end"
                                >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id="offcanvasNavbarLabel">Hi {Name}</Offcanvas.Title>
                                </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                            <Nav.Link href="/users">Users</Nav.Link>
                                            <Nav.Link href="/datalist">Data</Nav.Link>
                                            <Nav.Link href="/statistics">Statistics</Nav.Link>
                                            <Nav.Link href="/logout">Logout</Nav.Link>
                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                    )
                }

                else if (Auth === 'User') {
                    return (
                        <Navbar bg="light" fixed="top" expand={false}>
                            <Container fluid>
                                <Navbar.Brand href="/">
                                    <img src={icmobi} alt="ICMOBI logo" height="50px" style={{paddingLeft: '10%'}}/>
                                </Navbar.Brand>
                                <Nav className="flex-row">
                                    <Nav.Link className="mx-5" href="/label">Label</Nav.Link>
                                    <Nav.Link className="mx-5" href="/results">Leaderboard</Nav.Link>   
                                </Nav>
        
                                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                                <Navbar.Offcanvas
                                    id="offcanvasNavbar"
                                    aria-labelledby="offcanvasNavbarLabel"
                                    placement="end"
                                >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id="offcanvasNavbarLabel">Hi {Name}</Offcanvas.Title>
                                </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                            <Nav.Link href="/logout">Logout</Nav.Link>
                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                            </Container>
                        </Navbar>
                    )
                }


                else {
                    return (
                        <Navbar bg="light" fixed="top" expand={false}>
                            <Container fluid>
                                <Navbar.Brand href="/">
                                    <img src={icmobi} alt="ICMOBI logo" height="50px" style={{paddingLeft: '10%'}}/>
                                </Navbar.Brand>
                                <Nav className="flex-row">
                                    <Nav.Link className="mx-5" href="/label">Label</Nav.Link>
                                    <Nav.Link className="mx-5" href="/results">Leaderboard</Nav.Link>   
                                </Nav>
                                
    
                                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                                <Navbar.Offcanvas
                                    id="offcanvasNavbar"
                                    aria-labelledby="offcanvasNavbarLabel"
                                    placement="end"
                                >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id="offcanvasNavbarLabel">Hi {Name}</Offcanvas.Title>
                                </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link href="/signup">Signup</Nav.Link>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                        </Nav>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                                
                            </Container>
                        </Navbar>
                        )
                    }
            }}
            
        </AuthConsumer>
    );
}

export default ResponsiveAppBar;