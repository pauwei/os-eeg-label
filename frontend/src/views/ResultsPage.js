import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Trophy } from 'react-bootstrap-icons';
import { AuthConsumer } from '../helpers/AuthContext';
import Sidebar from '../components/Sidebar';

const FULLY_LABELED_THRESHOLD = 4;

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
    const [fullyLabeled, setFullyLabeled] = useState(0);


    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    const getUserData = () => {
        if (userList && pstats && lboard) {
            return;
        }

        axios.get('/api/users/userlist')
        .then( (res) => {
            //setting user list
            setUserList(res.data);
        });
    }

    const getCompData = () => {
        if (total) {
            return;
        }

        axios.get('/api/components/complist')
        .then( (res) => {
            //Setting overall stats
            setOstats(res.data);
        })
    }

    //Await until after user list is set
    useEffect(() => {
        if (!userList) {
            return;
        }

        const email = localStorage.getItem("Email");

        if (email && email !== "guest") {
            setPstats(userList.find(user => email === user.email));
        }

        //Sort users and get top results
        userList.sort((a, b) => (a.components.length < b.components.length) ? 1 : -1);

        const nor = 10;
        setLboard(userList.slice(0, nor));
    }, [userList])

    //Await until after overall stats have been set
    useEffect(() => {
        if (!ostats) {
            return;
        }

        let sum = 0;
        let fullyLabeledCount = 0;
        for (let i = 0; i < ostats.length; i++) {
            sum += ostats[i].labels.length;
            if (ostats[i].labels.length >= FULLY_LABELED_THRESHOLD) {
                fullyLabeledCount += 1;
            }
        }

        setFullyLabeled(fullyLabeledCount);
        setTotal(sum);
    }, [ostats])

    //Page reload use effect
    useEffect(() => {
        //Get leaderboard data
        getUserData();
        getCompData();

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
                            <div style={{paddingLeft: width > 768 ? "250px" : "0px", paddingTop: '90px'}}>
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
                                                                    <td>Unique Components Labeled</td>
                                                                    <td>{ostats.length}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Components Labeled</td>
                                                                    <td>{total}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>{`Fully Labeled Components (${FULLY_LABELED_THRESHOLD} Or More Labels)`}</td>
                                                                    <td>{fullyLabeled}</td>
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
                                                    <Container style={{paddingTop: '20px'}}>
                                                        <Table bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2">{pstats.fname}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Domain</td>
                                                                    <td>{pstats.domain}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Components Labeled</td>
                                                                    <td>{pstats.components.length}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Container>
                                                ) : (
                                                    <Container style={{paddingTop: '20px', paddingBottom: '20px'}}>
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
                                                                    <td>{index + 1}</td>
                                                                    { index < 3 ? (
                                                                        <td>{user.fname} <Trophy /></td>
                                                                    ) : (
                                                                        <td>{user.fname}</td>
                                                                    )}
                                                                    <td>{user.components.length}</td>
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
                            <div style={{paddingLeft: width > 768 ? "250px" : "0px", paddingTop: '90px'}}>
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
                                                                    <td>Unique Components Labeled</td>
                                                                    <td>{ostats.length}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Components Labeled</td>
                                                                    <td>{total}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>{`Fully Labeled Components (${FULLY_LABELED_THRESHOLD} Or More Labels)`}</td>
                                                                    <td>{fullyLabeled}</td>
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
                                                    <Container style={{paddingTop: '20px'}}>
                                                        <Table bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2">{pstats.fname}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Domain</td>
                                                                    <td>{pstats.domain}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Components Labeled</td>
                                                                    <td>{pstats.components.length}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Container>
                                                ) : (
                                                    <Container style={{paddingTop: '20px', paddingBottom: '20px'}}>
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
                                                                    <td>{index + 1}</td>
                                                                    { index < 3 ? (
                                                                        <td>{user.fname} <Trophy /></td>
                                                                    ) : (
                                                                        <td>{user.fname}</td>
                                                                    )}
                                                                    <td>{user.components.length}</td>
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
                            <div style={{paddingLeft: width > 768 ? "250px" : "0px", paddingTop: '90px'}}>
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
                                                                    <td>Unique Components Labeled</td>
                                                                    <td>{ostats.length}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Total Components Labeled</td>
                                                                    <td>{total}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>{`Fully Labeled Components (${FULLY_LABELED_THRESHOLD} Or More Labels)`}</td>
                                                                    <td>{fullyLabeled}</td>
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
                                                    <Container style={{paddingTop: '20px'}}>
                                                        <Table bordered hover size="sm">
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2">{pstats.fname}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Domain</td>
                                                                    <td>{pstats.domain}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Components Labeled</td>
                                                                    <td>{pstats.components.length}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Container>
                                                ) : (
                                                    <Container style={{paddingTop: '20px', paddingBottom: '20px'}}>
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
                                                                    <td>{index + 1}</td>
                                                                    { index < 3 ? (
                                                                        <td>{user.fname} <Trophy /></td>
                                                                    ) : (
                                                                        <td>{user.fname}</td>
                                                                    )}
                                                                    <td>{user.components.length}</td>
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