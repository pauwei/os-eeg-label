import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { ArrowClockwise } from 'react-bootstrap-icons';
import axios from 'axios';
import { AuthConsumer } from "../helpers/AuthContext";

const UsersPage = () => {

    const [userList, setUserList] = useState([]);

    const getUserList = () => {

        axios.get('/api/users/userlist')
        .then( (res) => {
            setUserList(res.data);
        });
    }

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <p>This page is in progress. You can view the data that can be pulled from dropbox.</p>
                            
                            <Container fluid style={{width: '75%'}}>
                                <Button
                                    variant='primary'
                                    type='submit'
                                    onClick={getUserList}
                                    style={{float: 'left', marginBottom: '10px'}}
                                >
                                    <ArrowClockwise /> &nbsp; Refresh
                                </Button>
                                <Table striped bordered hover size="sm" >
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Domain</th>
                                            <th>Components Labeled</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList.map((user) => {
                                            return (
                                                <tr key={user.email}>
                                                    <th>{user.email}</th>
                                                    <th>{user.domain}</th>
                                                    <th>{user.components.length}</th>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Container>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <p>You are not authenticated to view the page.</p>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <p>You are not authenticated to view the page.</p>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default UsersPage;
