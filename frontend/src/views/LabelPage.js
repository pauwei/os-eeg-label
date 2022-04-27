import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AuthContext, AuthConsumer } from '../helpers/AuthContext';

import Sidebar from '../components/Sidebar';

const LabelPage = () => {
    const context = useContext(AuthContext);

    const [labelImage, setLabelImage] = useState(null);

    const submitResults = () => {
        //Save the results


        //Get the next image
        getImage();
    }

    const getImage = () => {
        axios.get('/dropbox/image', {
            responseType: "arraybuffer",
            params: {
                id: context.Name
            }
        })
        .then((res) => {
            const base64 = btoa(
                new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            setLabelImage(base64);
        });
    }

    useEffect(() => {
        getImage();
    },[]);


    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <Sidebar />
                            <p>Hey, you are authenticated. Your labelling progress will be stored.</p>
                            <div style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
                                <img src={`data:image/jpeg;charset=utf-8;base64,${labelImage}`} alt="Labelling data" width="1070" height="547" />
                                <div>
                                    <Form.Group className="flex-row" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Brain" />
                                        <Form.Check type="checkbox" label="Muscle" />
                                        <Form.Check type="checkbox" label="Eye" />
                                        <Form.Check type="checkbox" label="Heart" />
                                        <Form.Check type="checkbox" label="Line Noise" />
                                        <Form.Check type="checkbox" label="Chan Noise" />
                                        <Form.Check type="checkbox" label="Other" />
                                        <Form.Check type="checkbox" label="?" />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={submitResults}
                                        style={{position: 'absolute', bottom: 0}}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <Sidebar />
                            <p>Hey, you are authenticated. Your labelling progress will be stored.</p>
                            <div style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
                                <img src={`data:image/jpeg;charset=utf-8;base64,${labelImage}`} alt="Labelling data" width="1070" height="547" />
                                <div>
                                    <Form.Group className="flex-row" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Brain" />
                                        <Form.Check type="checkbox" label="Muscle" />
                                        <Form.Check type="checkbox" label="Eye" />
                                        <Form.Check type="checkbox" label="Heart" />
                                        <Form.Check type="checkbox" label="Line Noise" />
                                        <Form.Check type="checkbox" label="Chan Noise" />
                                        <Form.Check type="checkbox" label="Other" />
                                        <Form.Check type="checkbox" label="?" />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={submitResults}
                                        style={{position: 'absolute', bottom: 0}}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <Sidebar />
                            <p>You are not authenticated. Your labelling progress will not be stored</p>
                            <div style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
                                <img src={`data:image/jpeg;charset=utf-8;base64,${labelImage}`} alt="Labelling data" width="1070" height="547" />
                                <div>
                                    <Form.Group className="flex-row" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Brain" />
                                        <Form.Check type="checkbox" label="Muscle" />
                                        <Form.Check type="checkbox" label="Eye" />
                                        <Form.Check type="checkbox" label="Heart" />
                                        <Form.Check type="checkbox" label="Line Noise" />
                                        <Form.Check type="checkbox" label="Chan Noise" />
                                        <Form.Check type="checkbox" label="Other" />
                                        <Form.Check type="checkbox" label="?" />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={submitResults}
                                        style={{position: 'absolute', bottom: 0}}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default LabelPage;