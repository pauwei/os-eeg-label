import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/esm/Badge";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { navigate } from '@reach/router';
import Sidebar from "../components/Sidebar";
import Divider from "../components/Divider";

//Importing example images
import brain01 from "../images/1002001.jpg";
import brain02 from "../images/6003002.jpg";
import eyevert01 from "../images/5014001.jpg";
import eyevert02 from "../images/1001001.jpg";
import eyehorz01 from "../images/1005006.jpg";
import eyehorz02 from "../images/6004002.jpg";
import muscle01 from "../images/2012010.jpg";
import muscle02 from "../images/5013014.jpg";
import heart01 from "../images/5013001.jpg";
import heart02 from "../images/3007012.jpg";
import linno01 from "../images/1005059.jpg";
import linno02 from "../images/1008026.jpg";
import channo01 from "../images/2012033.jpg";
import channo02 from "../images/6003033.jpg";
import other01 from "../images/5013007.jpg";
import other02 from "../images/5012016.jpg";

//Importing practice images
import step1 from "../images/howtolabel_01.jpg";
import step2 from "../images/howtolabel_02.jpg";
import step3 from "../images/howtolabel_03.jpg";


const TutorialPage = () => {

    const [key, setKey] = useState('back');

    const changeTab = (k) => {
        navigate('/tutorial#' + k);
    }

    useEffect(() => {
        //Get id from relative pathname
        const path = window.location.href;
        const tab = path.substring(path.lastIndexOf("#") + 1);

        //Use id to set tab
        if (tab !== "back" && tab !== "diff" && tab !== "howto" && tab !== "practice") {
            setKey("back");
        } else {
            setKey(tab);
        }
    }, [window.location.href]);

    return (
        <div>
            <Sidebar />
            <Container style={{paddingLeft: '250px', paddingTop: '100px'}}>
                <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(k) => changeTab(k)}
                    className="mb-3"
                >
                    <Tab eventKey="back" title="Background Literature">
                        <Card>
                            <Container style={{padding: '20px', textAlign: 'left'}}>
                                These tutorial pages assume you are comfortable with the 
                                basic concepts of EEG source analysis. If you are not, we 
                                encourage you to read some background literature.

                                <br/><br/>
                                <h4><Badge bg="info">References</Badge></h4>
                                <ListGroup variant="flush">
                                    <ListGroup.Item action href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6595408/">L. Pion-Tonachini, K. Kreutz-Delgado, and S. Makeig, “ICLabel: An automated electroencephalographic independent component classifier, dataset, and website,” NeuroImage, 198, pp.181-197, August 2019.</ListGroup.Item>
                                    <ListGroup.Item action href="https://labeling.ucsd.edu/tutorial/overview">L. Pion-Tonachini. "ICLabel Tutorial: EEG Independent Component Labeling." https://labeling.ucsd.edu/tutorial/overview (accessed June 1, 2022).</ListGroup.Item>
                                    <ListGroup.Item action href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7763560/">N. Thammasan and M. Miyakoshi, “Cross-frequency power-power coupling analysis: a useful cross-frequency measure to classify ICA-decomposed EEG,” Sensors, 20(24), p. 7040, December 2020.</ListGroup.Item>
                                    <ListGroup.Item action href="https://eeglab.org/">A. Delorme et al. “EEGLAB Wiki.” https://eeglab.org/ (accessed June 5, 2022). </ListGroup.Item>
                                </ListGroup>
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="diff" title="Differentiating Components">
                        <Card style={{marginBottom: '40px'}}>
                            <Container style={{padding: '20px'}}>
                                <Accordion defaultActiveKey={['0']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Overview</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            ICs of EEG data can be classified into 7 different categories: 
                                            Brain, Muscle, Eye, Heart, Line Noise, Channel Noise and Other. 
                                            Each IC includes unique characteristics, and these characteristics 
                                            can be viewed through looking at various features of the component. 
                                            Therefore, the classifications of ICs can be predicted by recognizing 
                                            characteristics from the features. The following sections are to 
                                            give brief descriptions of characteristics each classification pertains.  
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Brain</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Brain ICs contain any brain activities. These components are believed to be 
                                            generated from local synchronous activity in one cortical path (sometimes two 
                                            if they are well-connected). Due to these small patches, the Brain components 
                                            present dipolar projections onto the scalp topography. The brain signals that 
                                            usually get captured through EEG tend to occur at lower frequencies: between 
                                            5 to 30Hz where 10 Hz (alpha wave) is the most often. Depending on the 
                                            frequencies, the signal could also indicate repeated patterns. These Brain 
                                            components generally present an inversed relationship in the Power Spectral 
                                            Density plot. An additional feature to pay attention to is the cross-frequency 
                                            power-power coupling (PPC) plot. Brain components show cross-frequency PPC 
                                            (red) at around 5 Hz and 30 Hz (located at the middle of the plot), near the 
                                            positive-correlation diagonal line. Also, these components present anti-correlation 
                                            on the other corners (top left and bottom right) of the plot, which is depicted 
                                            as blue.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Activity Power Spectrum</b></li>
                                                <ul>
                                                    <li>Inverse relationship (1/f)</li>
                                                    <li>Peak between 5 to 30 Hz (10 Hz the most common)</li>
                                                </ul>
                                                <li><b>Topograhy</b></li>
                                                <ul>
                                                    <li>Smoothly varying dipolar</li>
                                                </ul>
                                                <li><b>Event Related Potential (ERP)</b></li>
                                                <ul>
                                                    <li>Visible ERP with epoched data</li>
                                                </ul>
                                                <li><b>Cross-frequency power-power coupling (PPC)</b></li>
                                                <ul>
                                                    <li>Higher cross-frequency PPC between 5 Hz and 30 Hz</li>
                                                    <ul>
                                                        <li>Near the positive-correlation diagonal line</li>
                                                    </ul>
                                                    <li>Anti-correlation further from the positive-correlation line</li>
                                                    <ul>
                                                        <li>Depicted as blue on the top left and bottom right corners of the plot</li>
                                                    </ul>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container style={{paddingLeft: '10%'}}>
                                                <br/>
                                                <img src={brain01} alt="Brain example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic' }}>Example #1 of Brain Data </figcaption>
                                                <br/>
                                                <img src={brain02} alt="Brain example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Brain Data </figcaption>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Muscle</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Muscle components represent the electrical activities of muscle tissues, 
                                            and the recordings of these muscle activities are called electromyography 
                                            (EMG). Muscle components are known to contain a broadband activity of high 
                                            frequency (equal to or above 20 Hz) due to combination of many motor unit 
                                            (MU) action potentials (MUAP). Since these MUAPs do not synchronize, the 
                                            EMG powers are usually more spread out than those of other signals. The 
                                            components could be viewed as dipolar; however, the dipoles will be 
                                            located outside the brain, near the skull. Additionally, the position of 
                                            these dipoles will present highly concentrated and shallow topography. 
                                            Additionally, muscle components present parallel lines (parallel to the 
                                            positive correlation line) at higher frequency levels on cross-frequency 
                                            PPC plots. 

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Activity Power Spectrum</b></li>
                                                <ul>
                                                    <li>Power concentration in frequencies equal to or above 20 Hz</li>
                                                </ul>
                                                <li><b>Dipole and Topography</b></li>
                                                <ul>
                                                    <li>Could be dipolar located near the skull + more localized/concentrated topography</li>
                                                </ul>
                                                <li><b>Cross-frequency PPC</b></li>
                                                <ul>
                                                    <li>Parallel lines at higher frequency levels</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container style={{paddingLeft: '10%'}}>
                                                <br/>
                                                <img src={muscle01} alt="Muscle example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Muscle Data </figcaption>
                                                <br/>
                                                <img src={muscle02} alt="Muscle example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Muscle Data </figcaption>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Eye</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Eye components are derived from eye movements. When the eye interacts with light, 
                                            the cells in the retina trigger nerve impulses and the generated electrical field 
                                            can be modeled as an equivalent current dipole (ECD). The Eye components can be 
                                            divided further depending on the eye movements, horizontal, vertical, rotation, or 
                                            blinking. Although eye components generally present a power concentration at around 
                                            or below 5 Hz, the components could present different characteristics with different 
                                            eye movements. For instance, components associated with vertical eye movements show 
                                            ECDs near the eye area (either positive or negative on both eyes). In the time series 
                                            plot, the signal will indicate regular spikes due to blinking. On the other hand, 
                                            components with horizontal eye movements will present topography in which ECD is 
                                            located between the two eyes. Therefore, one eye area will be positive or negative 
                                            and the other eye will be the opposite. These horizontal eye movement components also 
                                            will indicate time series plots which signal transitions to various values. Additionally, 
                                            the Eye components show block(s) of high cross-frequency PPC near each end of the positive 
                                            correlation line on the cross-frequency PPC plot.   

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>PSD</b></li>
                                                <ul>
                                                    <li>Peak at or below 5 Hz</li>
                                                </ul>
                                                <li><b>Topography</b></li>
                                                <ul>
                                                    <li>Higher concentration near the eye area</li>
                                                    <ul>
                                                        <li>Vertical eye movements: Both eyes could be either positive or negative</li>
                                                        <li>Horizontal eye movements: Two eyes could be opposite of each other (one positive, one negative)</li>
                                                    </ul>
                                                </ul>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>Dipoles located at eye areas</li>
                                                </ul>
                                                <li><b>Time Series</b></li>
                                                <ul>
                                                    <li>Regular peaks that represent blinks (for vertical eye movements)</li>
                                                </ul>
                                                <li><b>Cross-frequency PPC</b></li>
                                                <ul>
                                                    <li>Block(s) of high correlation near the edges of the positive-correlation line (top right and/or bottom left)</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container style={{paddingLeft: '10%'}}>
                                                <br/>
                                                <img src={eyevert01} alt="Eye Vertical example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Eye Vertical Data </figcaption>
                                                <br/>
                                                <img src={eyevert02} alt="Eye Vertical example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Eye Vertical Data </figcaption>
                                                <br/>
                                                <img src={eyehorz01} alt="Eye Horizontal example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <br/>
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Eye Horizontal Data </figcaption>
                                                <br/>
                                                <img src={eyehorz02} alt="Eye Horizontal example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Eye Horizontal Data </figcaption>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Heart</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Heart components contain electrical signals from the heart, which recording is 
                                            called electrocardiography (ECG/EKG). The heart ICs can be easily determined by 
                                            recognizing the QRS complex pattern on the Component Time Series plot. The power 
                                            of these complexes will also be placed at around 1Hz. Additionally, the heart is 
                                            located far from the EEG recording site. Therefore, the dipoles will be placed 
                                            further away from the brain, and the topography will represent a linear gradient. 
                                            In rare occasions, the topography could also represent localized projections when 
                                            an electrode is placed near the superficial vein or artery.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Component Time Series</b></li>
                                                <ul>
                                                    <li>QRS complexes</li>
                                                </ul>
                                                <li><b>Power Spectral Density</b></li>
                                                <ul>
                                                    <li>Peak at only around 1 Hz</li>
                                                </ul>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>Placed far away from the brain</li>
                                                </ul>
                                                <li><b>Topography</b></li>
                                                <ul>
                                                    <li>Linear gradient</li>
                                                    <li>(Rarely) localized/concentrated projections</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container style={{paddingLeft: '10%'}}>
                                                <br/>
                                                <img src={heart01} alt="Heart example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Heart Data </figcaption>
                                                <br/>
                                                <img src={heart02} alt="Heart example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Heart Data </figcaption>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Line Noise</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Line Noise components include any artifacts caused by any electrical systems near 
                                            the EEG system during recordings. Line Noise components show a strong level of power 
                                            at around 50 Hz or 60 Hz, causing a high peak at one of those frequencies in PSD. 
                                            When these components’ interferences are spatially stationary across the EEG system, 
                                            the Line Noise components are easy to discern. However, in other cases, the Line Noise 
                                            components are usually mixed with other types of components.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Power Spectral Density</b></li>
                                                <ul>
                                                    <li>High peak at 50 Hz or 60 Hz</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container style={{paddingLeft: '10%'}}>
                                                <br/>
                                                <img src={linno01} alt="Line Noise example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Line Noise Data </figcaption>
                                                <br/>
                                                <img src={linno02} alt="Line Noise example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Line Noise Data </figcaption>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Channel Noise</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Channel Noise components are any recorded artifacts caused by physical interactions of 
                                            the EEG channels. These components represent a highly concentrated projection located 
                                            at a specific channel on each topography. Due to this feature, the Channel Noise 
                                            component could look similar to Muscle components. However, while the Power Spectral 
                                            Density (PSD) of Muscle components contain high peak above 20 Hz, the PSD of Channel 
                                            Noise components will rather have a 1/f spectrum. Also, either large, consistent or 
                                            both artifacts can be seen in the component activations.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Topography</b></li>
                                                <ul>
                                                    <li>Extremely concentrated projection at a specific channel location</li>
                                                </ul>
                                                <li><b>Power Spectral Density</b></li>
                                                <ul>
                                                    <li>1/f spectrum</li>
                                                </ul>
                                                <li><b>Component Time Series</b></li>
                                                <ul>
                                                    <li>Large and/or consistent artifacts</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container style={{paddingLeft: '10%'}}>
                                                <br/>
                                                <img src={channo01} alt="Channel Noise example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Channel Noise Data </figcaption>
                                                <br/>
                                                <img src={channo02} alt="Channel Noise example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Channel Noise Data </figcaption>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Other</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Any ICs which features do not fall into any of the IC types mentioned above will fall 
                                            under other. In fact, most ICs are meaningless signals and actual signal components, 
                                            such as the Brain components, can be mixed with other components. The best method to 
                                            discern other components is to recognize the unusual characteristics in the features. 
                                            One characteristic to note is that other components could include non-dipolar topography. 
                                            Additionally, the last half of IC components tend to be classified as Other components; 
                                            therefore, when in doubt, looking at the component number could be a hint as well. 

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li>Characteristics that do not fit under any other categories</li>
                                                <li><b>Topography</b></li>
                                                <ul>
                                                    <li>Non-dipolar</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container style={{paddingLeft: '10%'}}>
                                                <br/>
                                                <img src={other01} alt="Other example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Other Data </figcaption>
                                                <br/>
                                                <img src={other02} alt="Other example 1" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Other Data </figcaption>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="howto" title="How to Label">
                        <Card style={{marginBottom: '40px'}}>
                            <Container style={{padding: '20px'}}>
                                <Accordion defaultActiveKey={['0']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>General Info</Accordion.Header>
                                        <Accordion.Body>
                                            <Container style={{textAlign: 'left'}}>
                                                This section discusses how to label components on this 
                                                website.

                                                <br/><br/>
                                                <ul>
                                                    <li><b>Component Number</b></li>
                                                    <ul>
                                                        <li>The last three digits represent the component number</li>
                                                        <li>i.e. IC1001088 represents 88th component</li>
                                                    </ul>
                                                </ul>

                                                <Alert variant="warning">
                                                    Note: The following instructions apply specifically to the labeling page. The practice page may differ slightly.
                                                </Alert>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Step 1: Submitting</Accordion.Header>
                                        <Accordion.Body>
                                            <Container style={{textAlign: 'left'}} >
                                                <br/>
                                                <Divider title={"Example Page"} />
                                                <br/>
                                                <img src={step1} alt="Step 1 for labelling" width="90%" />
                                                
                                                <br/><br/>
                                                <Divider title={"Instructions"} />
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item><Badge pill bg="info">1</Badge> Image containing data that needs to be labeled</ListGroup.Item>
                                                    <ListGroup.Item><Badge pill bg="info">2</Badge> Tags for the possible types of data. Check all that apply</ListGroup.Item>
                                                    <ListGroup.Item><Badge pill bg="info">3</Badge> Skip if you are unsure of what type of data the image is showing</ListGroup.Item>
                                                    <ListGroup.Item><Badge pill bg="info">4</Badge> Make sure you have checked the tags you want and submit</ListGroup.Item>
                                                </ListGroup>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Step 2: Viewing Results</Accordion.Header>
                                        <Accordion.Body>
                                            <Container style={{textAlign: 'left'}} >
                                                <br/>
                                                <Divider title={"Example Page"} />
                                                <br/>
                                                <img src={step2} alt="Step 2 for labelling" width="90%" />
                                                
                                                <br/><br/>
                                                <Divider title={"Instructions"} />
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item><Badge pill bg="info">1</Badge> Modal will automatically popup with labeling results</ListGroup.Item>
                                                    <ListGroup.Item><Badge pill bg="info">2</Badge> The last entry is your submission for you to compare with others</ListGroup.Item>
                                                    <ListGroup.Item><Badge pill bg="info">3</Badge> Select either button to close the results modal</ListGroup.Item>
                                                </ListGroup>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Step 3: Moving On</Accordion.Header>
                                        <Accordion.Body>
                                            <Container style={{textAlign: 'left'}} >
                                                <br/>
                                                <Divider title={"Example Page"} />
                                                <br/>
                                                <img src={step3} alt="Step 3 for labelling" width="90%" />
                                                
                                                <br/><br/>
                                                <Divider title={"Instructions"} />
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item><Badge pill bg="info">1</Badge> Click on the <Badge bg="primary">Show Results</Badge> button to open result modal and see results again</ListGroup.Item>
                                                    <ListGroup.Item><Badge pill bg="info">2</Badge> Click on the <Badge bg="primary">Next</Badge> button to move onto labeling the next component</ListGroup.Item>
                                                </ListGroup>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="practice" title="Practice Labeling">
                        <Card>
                            <Container style={{padding: '20px'}}>
                                <Container>
                                    Ready to practice? Click on the button below.
                                </Container>
                                <Container style={{padding: '20px'}}>
                                    <Button variant="info"  href="/practice">
                                        Go to Practice Page
                                    </Button>
                                </Container>
                            </Container>
                        </Card>
                    </Tab>

                </Tabs>
            </Container>
        </div>
    );
};

export default TutorialPage;
