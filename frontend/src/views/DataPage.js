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
    const [compData, setCompData] = useState([]);

    const getDataList = () => {
        setRefresh('Refreshing . . .')

        //Get filenames from dropbox
        axios.get('/dropbox/filenames')
        .then((res) => {
            let dropboxData = res.data;
            dropboxData.sort();

            //Get filenames from MongoDB
            axios.get('/api/components/complist')
            .then((res) => {
                let mongodbData = res.data;
                
                let tableData = [];
                for (let i = 0; i < dropboxData.length - 1; i++) {
                    //Get the index of exten
                    let extIndex = dropboxData[i].lastIndexOf('.');
                    const datum = mongodbData.find(element => element.name === dropboxData[i]);

                    if (typeof datum !== 'undefined') {
                        tableData.push({
                            name: dropboxData[i].substring(0, extIndex),
                            dropbox: 'Yes',
                            mongodb: 'Yes',
                            labels: datum.labels.length,
                        });
                    } else {
                        tableData.push({
                            name: dropboxData[i].substring(0, extIndex),
                            dropbox: 'Yes',
                            mongodb: 'No',
                            labels: 0,
                        });
                    }
                }

                setCompData(mongodbData);
                setDataList(tableData);
                setRefresh('Refresh Data List');
            });
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
                        <div style={{paddingTop: '90px'}}>
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
                                            <th>Dropbox</th>
                                            <th>MongoDB</th>
                                            <th>No. Labels</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataList.map((datapoint) => {
                                            return (
                                                <tr key={datapoint.name}>
                                                    <th>{datapoint.name}</th>
                                                    <th>{datapoint.dropbox}</th>
                                                    <th>{datapoint.mongodb}</th>
                                                    <th>{datapoint.labels}</th>
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