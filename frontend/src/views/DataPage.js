import { React, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ArrowClockwise } from 'react-bootstrap-icons';
import axios from 'axios';
import { AuthConsumer } from '../helpers/AuthContext';

const DataPage = () => {
    
    const [dataList, setDataList] = useState([]);
    const [refresh, setRefresh] = useState('Refresh Data List');

    const getDataList = () => {
        setRefresh('Refreshing . . .')

        axios.get('/dropbox/filenames')
        .then((res) => {
            let data = res.data;
            data.sort();

            let tableData = [];
            for (let i = 0; i < data.length - 1; i++) {
                let extIndex = data[i].lastIndexOf('.');

                if (data[i].substring(0, extIndex) === data[i + 1].substring(0, extIndex)) {
                    tableData.push({ 
                        name: data[i].substring(0, extIndex),
                        jpg: 'Yes',
                        mat: 'Yes'
                    });

                    i++;
                    continue;
                } else {
                    tableData.push({
                        name: data[i].substring(0, extIndex),
                        jpg: (data[i].substring(extIndex) === '.jpg' ? 'Yes' : 'No'),
                        mat: (data[i].substring(extIndex) === '.mat' ? 'Yes' : 'No')
                    });
                }
            }

            setDataList(tableData);
            setRefresh('Refresh Data List');
        });
    }

    useEffect(() => {
        getDataList();
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
                                    onClick={getDataList}
                                    style={{float: 'left', marginBottom: '10px'}}
                                >
                                    <ArrowClockwise /> &nbsp; {refresh}
                                </Button>
                                <Table striped bordered hover size="sm" >
                                    <thead>
                                        <tr>
                                            <th>Data Name</th>
                                            <th>JPG Data?</th>
                                            <th>Mat Data?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataList.map((datapoint) => {
                                            return (
                                                <tr>
                                                    <th>{datapoint.name}</th>
                                                    <th>{datapoint.jpg}</th>
                                                    <th>{datapoint.mat}</th>
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
}

export default DataPage;