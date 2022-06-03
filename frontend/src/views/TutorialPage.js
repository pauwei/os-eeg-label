import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { navigate } from '@reach/router';
import Sidebar from "../components/Sidebar";

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
                            <Container style={{padding: '20px'}}>
                                These tutorial pages assume you are comfortable with the 
                                basic concepts of EEG source analysis. If you are not, we 
                                encourage you to read some background literature.
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="diff" title="Differentiating Components">
                        <Card>
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
                                            Brain ICs usually contain small cortical patches
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Muscle</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            Muscle components represent the electrical activities of muscle tissues, 
                                            and the recordings of these muscle activities are called electromyography 
                                            (EMG). Muscle components are known to contain a broadband activity of high 
                                            frequency (equal to or above 20 Hz) due to combination of many motor unit 
                                            (MU) action potentials (MUAP). Since these MUAPs do not synchronize, the 
                                            EMG powers are usually more spread out than those of other signals. The 
                                            components could be viewed as dipolar; however, the dipoles will be 
                                            located outside the brain, near the skull. Additionally, the position of 
                                            these dipoles will present highly concentrated and shallow topography.

                                            <br/><br/>
                                            <ul>
                                                <li><b>Activity Power Spectrum</b></li>
                                                <ul>
                                                    <li>Power concentration in frequencies equal to or above 20 Hz</li>
                                                </ul>
                                                <li><b>Dipole and Topography</b></li>
                                                <ul>
                                                    <li>Could be dipolar located near the skull + more localized/concentrated topography</li>
                                                </ul>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Eye</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            Eye components are derived from eye movements. When the eye interacts with light, 
                                            the cells in the retina trigger nerve impulses, and the generated electrical 
                                            field can be modeled as an equivalent current dipole (ECD). The Eye components 
                                            can be divided further depending on the eye movements, horizontal, vertical, 
                                            rotation, or blinking. Although eye components generally present a power 
                                            concentration at around or below 5 Hz, the components could present different 
                                            characteristics with different eye movements. For instance, components associated 
                                            with vertical eye movements show ECDs near the eye area (either positive or 
                                            negative on both eyes). In the time series plot, the signal will indicate regular 
                                            spikes due to blinking. On the other hand, components with horizontal eye 
                                            movements will present topography in which ECD is located between the two eyes. 
                                            Therefore, one eye area will be positive or negative and the other eye will be 
                                            the opposite. Additionally, these horizontal eye movement components will indicate 
                                            time series plots which signal transitions to various values. 

                                            <br/><br/>
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
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Heart</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            Heart components contain electrical signals from the heart, which recording is 
                                            called electrocardiography (ECG/EKG). The heart ICs can be easily determined by 
                                            recognizing the QRS complex pattern on the Component Time Series plot. The power 
                                            of these complexes will also be placed at around 1Hz. Additionally, the heart is 
                                            located far from the EEG recording site. Therefore, the dipoles will be placed 
                                            further away from the brain, and the topography will represent a linear gradient. 
                                            In rare occasions, the topography could also represent localized projections when 
                                            an electrode is placed near the superficial vein or artery.

                                            <br/><br/>
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
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Line Noise</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            Line Noise components include any artifacts caused by any electrical systems near 
                                            the EEG system during recordings. Line Noise components show a strong level of power 
                                            at around 50 Hz or 60 Hz, causing a high peak at one of those frequencies in PSD. 
                                            When these components’ interferences are spatially stationary across the EEG system, 
                                            the Line Noise components are easy to discern. However, in other cases, the Line Noise 
                                            components are usually mixed with other types of components.

                                            <br/><br/>
                                            <ul>
                                                <li><b>Power Spectral Density</b></li>
                                                <ul>
                                                    <li>High peak at 50 Hz or 60 Hz</li>
                                                </ul>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Channel Noise</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            Channel Noise components are any recorded artifacts caused by physical interactions of 
                                            the EEG channels. These components represent a highly concentrated projection located 
                                            at a specific channel on each topography. Due to this feature, the Channel Noise 
                                            component could look similar to Muscle components. However, while the Power Spectral 
                                            Density (PSD) of Muscle components contain high peak above 20 Hz, the PSD of Channel 
                                            Noise components will rather have a 1/f spectrum. Also, either large, consistent or 
                                            both artifacts can be seen in the component activations.

                                            <br/><br/>
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
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>Other</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            Any ICs which features do not fall into any of the IC types mentioned above will fall 
                                            under other. In fact, most ICs are meaningless signals and actual signal components, 
                                            such as the Brain components, can be mixed with other components. The best method to 
                                            discern other components is to recognize the unusual characteristics in the features. 
                                            One characteristic to note is that other components could include non-dipolar topography. 
                                            Additionally, the last half of IC components tend to be classified as Other components; 
                                            therefore, when in doubt, looking at the component number could be a hint as well. 

                                            <br/><br/>
                                            <ul>
                                                <li>Characteristics that do not fit under any other categories</li>
                                                <li><b>Topography</b></li>
                                                <ul>
                                                    <li>Non-dipolar</li>
                                                </ul>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="howto" title="How to Label">
                        <Card>
                            <Container style={{padding: '20px'}}>
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
                            </Container>
                        </Card>
                    </Tab>
                    <Tab eventKey="practice" title="Practice Labeling">
                        <Card>
                            <Container style={{padding: '20px'}}>
                                <Container>
                                    Ready to practice? Follow the link below.
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
