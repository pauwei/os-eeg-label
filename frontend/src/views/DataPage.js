import { React, useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ArrowClockwise } from 'react-bootstrap-icons';
import axios from 'axios';
import { AuthConsumer } from '../helpers/AuthContext';
import { CSVLink } from 'react-csv';

const DataPage = () => {
    
    const csvLink = useRef();
    const downloadStatus = useRef(false);

    const [dataList, setDataList] = useState([]);
    const [refresh, setRefresh] = useState('Refresh Data List');
    const [compData, setCompData] = useState([]);
    const [downloadData, setDownloadData] = useState([]);

    const downloadLabelData = () => {
        //Check that component data is not empty
        if (compData.length === 0) {
            console.log("Error! No data available to download. Refreshing list . . .");
            getDataList();
        }

        //Set download status to true
        downloadStatus.current = true;

        //Format data to be downloaded in excel format
        let excelData = [];
        for (let i = 0; i < compData.length; i++) {
            const labels = compData[i].labels;

            for (let j = 0; j < labels.length; j++) {
                excelData.push({
                    name: compData[i].name,
                    email: labels[j].email,
                    domain: labels[j].domain,
                    weight: labels[j].weight,
                    brain: labels[j].tags.includes("Brain") ? 1 : 0,
                    muscle: labels[j].tags.includes("Muscle") ? 1 : 0,
                    eye: labels[j].tags.includes("Eye") ? 1 :0,
                    heart: labels[j].tags.includes("Heart") ? 1 : 0,
                    linenoise: labels[j].tags.includes("Line Noise") ? 1 : 0,
                    channoise: labels[j].tags.includes("Channel Noise") ? 1 : 0,
                    other: labels[j].tags.includes("Other") ? 1 : 0,
                });
            }
        }

        //Set download data
        setDownloadData(excelData);
    }

    const getDataList = () => {
        setRefresh('Refreshing . . .')

        //Set download status to false
        downloadStatus.current = false;

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
                for (let i = 0; i < dropboxData.length; i++) {
                    //Get the index of extension of the file string
                    let extIndex = dropboxData[i].lastIndexOf('.');

                    //Find if the element exists in MongoDB
                    const datum = mongodbData.find(element => element.name === dropboxData[i]);

                    //Create data based on element existence
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

                //Update UI to reflect data view
                setDataList(tableData);
                setRefresh('Refresh Data List');
                setCompData(mongodbData);
            });
        });
    }

    useEffect(() => {
        getDataList();
    }, []);

    useEffect(() => {
        if (downloadStatus.current) {
            //Click link to download data
            csvLink.current.link.click();
            
        } else {
            downloadStatus.current = true;
            return;
        }
    }, [downloadData]);

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
                                <Button
                                    variant='primary'
                                    type='submit'
                                    onClick={downloadLabelData}
                                    style={{float: 'right', marginBottom: '10px'}}
                                >
                                    Export Label Data
                                </Button>
                                <CSVLink
                                    data={downloadData}
                                    filename='icmobi_label_data_export.csv'
                                    className='hidden'
                                    ref={csvLink}
                                    target='_blank'
                                />

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