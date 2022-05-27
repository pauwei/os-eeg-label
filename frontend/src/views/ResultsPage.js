import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { AuthConsumer } from '../helpers/AuthContext';
import Sidebar from '../components/Sidebar';

const ResultsPage = () => {

    //Width variables
    const [width, setWidth] = useState(window.innerWidth);

    //user list
    const [userList, setUserList] = useState(null);

    //Leaderboard list
    const [lboard, setLboard] = useState(null);

    //personal stats
    const [pstats, setPstats] = useState(null);

    //overall stats
    const [ostats, setOstats] = useState(null);
    const [total, setTotal] = useState(0);


    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    const getData = () => {
        axios.get('/api/users/userlist')
        .then( (res) => {
            setUserList(res.data);

            const email = localStorage.getItem("Email");

            if (email && email !== "guest") {
                setPstats(userList.find(user => email === user.email));
            }

            //Sort users and get top results
            userList.sort((a, b) => (a.components.length < b.components.length) ? 1 : -1);

            const nor = 10;
            setLboard(userList.slice(0, nor));
        });

        axios.get('/api/components/complist')
        .then( (res) => {
            //console.log(res.data);
            setOstats(res.data);

            let sum = 0;
            for (let i = 0; i < ostats.length; i++) {
                sum += ostats[i].labels.length;
            }

            setTotal(sum);
        })
    }

    useEffect(() => {
        //Get leaderboard data
        getData();

        //Get window size
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    });

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            {width > 768 && <Sidebar /> }
                            <div style={{paddingLeft: width > 768 ? "250px" : "0px"}}>
                                <Container>
                                    <Row style={{padding: '20px'}}>
                                        <Col>
                                            <Card>
                                                <Card.Header as="h5">Overall IC Stats</Card.Header>
                                                <Container style={{paddingTop: '20px'}}>
                                                    <Table bordered hover size="sm">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan="2">Component Stats</th>
                                                            </tr>
                                                        </thead>
                                                        {ostats && (
                                                            <tbody>
                                                                <tr>
                                                                    <th>Unique Components Labeled</th>
                                                                    <th>{ostats.length}</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Components Labeled</th>
                                                                    <th>{total}</th>
                                                                </tr>
                                                            </tbody>
                                                        )}
                                                        
                                                    </Table>
                                                </Container>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Header as="h5">Personal Stats</Card.Header>
                                                {pstats ? (
                                                    <Container>
                                                        <Table bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2">{pstats.fname}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Domain</th>
                                                                    <th>{pstats.domain}</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>Components Labeled</th>
                                                                    <th>{pstats.components.length}</th>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Container>
                                                ) : (
                                                    <Container style={{paddingTop: '20px'}}>
                                                        Please <a href="/signup">signup</a> or <a href="/login">login</a> to 
                                                        view your personal stats.
                                                    </Container>
                                                )}
                                                
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{padding: '20px'}}>
                                        <Card>
                                            <Card.Header as="h4">Labeling Leaderboard</Card.Header>
                                            <Container style={{paddingTop: '20px'}}>
                                                <Table bordered hover size="sm" >
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Name</th>
                                                            <th>No. Components Labeled</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lboard && lboard.map((user, index) => {
                                                            return (
                                                                <tr key={user.fname}>
                                                                    <th>{index + 1}</th>
                                                                    <th>{user.fname}</th>
                                                                    <th>{user.components.length}</th>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Container>
                                        </Card>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            {width > 768 && <Sidebar /> }
                            <div style={{paddingLeft: width > 768 ? "250px" : "0px"}}>
                                <Container>
                                    <Row style={{padding: '20px'}}>
                                        <Col>
                                            <Card>
                                                <Card.Header as="h5">Overall IC Stats</Card.Header>
                                                <Container style={{paddingTop: '20px'}}>
                                                    <Table bordered hover size="sm">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan="2">Component Stats</th>
                                                            </tr>
                                                        </thead>
                                                        {ostats && (
                                                            <tbody>
                                                                <tr>
                                                                    <th>Unique Components Labeled</th>
                                                                    <th>{ostats.length}</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Components Labeled</th>
                                                                    <th>{total}</th>
                                                                </tr>
                                                            </tbody>
                                                        )}
                                                        
                                                    </Table>
                                                </Container>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Header as="h5">Personal Stats</Card.Header>
                                                {pstats ? (
                                                    <Container>
                                                        <Table bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2">{pstats.fname}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Domain</th>
                                                                    <th>{pstats.domain}</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>Components Labeled</th>
                                                                    <th>{pstats.components.length}</th>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Container>
                                                ) : (
                                                    <Container style={{paddingTop: '20px'}}>
                                                        Please <a href="/signup">signup</a> or <a href="/login">login</a> to 
                                                        view your personal stats.
                                                    </Container>
                                                )}
                                                
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{padding: '20px'}}>
                                        <Card>
                                            <Card.Header as="h4">Labeling Leaderboard</Card.Header>
                                            <Container style={{paddingTop: '20px'}}>
                                                <Table bordered hover size="sm" >
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Name</th>
                                                            <th>No. Components Labeled</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lboard && lboard.map((user, index) => {
                                                            return (
                                                                <tr key={user.fname}>
                                                                    <th>{index + 1}</th>
                                                                    <th>{user.fname}</th>
                                                                    <th>{user.components.length}</th>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Container>
                                        </Card>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            {width > 768 && <Sidebar /> }
                            <div style={{paddingLeft: width > 768 ? "250px" : "0px"}}>
                                <Container>
                                    <Row style={{padding: '20px'}}>
                                        <Col>
                                            <Card>
                                                <Card.Header as="h5">Overall IC Stats</Card.Header>
                                                <Container style={{paddingTop: '20px'}}>
                                                    <Table bordered hover size="sm">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan="2">Component Stats</th>
                                                            </tr>
                                                        </thead>
                                                        {ostats && (
                                                            <tbody>
                                                                <tr>
                                                                    <th>Unique Components Labeled</th>
                                                                    <th>{ostats.length}</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Components Labeled</th>
                                                                    <th>{total}</th>
                                                                </tr>
                                                            </tbody>
                                                        )}
                                                        
                                                    </Table>
                                                </Container>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Header as="h5">Personal Stats</Card.Header>
                                                {pstats ? (
                                                    <Container>
                                                        <Table bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2">{pstats.fname}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Domain</th>
                                                                    <th>{pstats.domain}</th>
                                                                </tr>
                                                                <tr>
                                                                    <th>Components Labeled</th>
                                                                    <th>{pstats.components.length}</th>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Container>
                                                ) : (
                                                    <Container style={{paddingTop: '20px'}}>
                                                        Please <a href="/signup">signup</a> or <a href="/login">login</a> to 
                                                        view your personal stats.
                                                    </Container>
                                                )}
                                                
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row style={{padding: '20px'}}>
                                        <Card>
                                            <Card.Header as="h4">Labeling Leaderboard</Card.Header>
                                            <Container style={{paddingTop: '20px'}}>
                                                <Table bordered hover size="sm" >
                                                    <thead>
                                                        <tr>
                                                            <th>Ranking</th>
                                                            <th>Name</th>
                                                            <th>No. Components Labeled</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lboard && lboard.map((user, index) => {
                                                            return (
                                                                <tr key={user.fname}>
                                                                    <th>{index + 1}</th>
                                                                    <th>{user.fname}</th>
                                                                    <th>{user.components.length}</th>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Container>
                                        </Card>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
}

export default ResultsPage;