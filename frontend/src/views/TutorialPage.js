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

//Importing example images - currently pulling from word doc
// import brain1002001 from "../images/1002001.jpg";
// import brain6003002 from "../images/6003002.jpg";
// import eyevert5014001 from "../images/5014001.jpg";
// import eyevert1001001 from "../images/1001001.jpg";
// import eyehorz1005006 from "../images/1005006.jpg";
// import eyehorz6004002 from "../images/6004002.jpg";
// import muscle2012010 from "../images/2012010.jpg";
// import muscle5013014 from "../images/5013014.jpg";
// import heart5013001 from "../images/5013001.jpg";
// import heart3007012 from "../images/3007012.jpg";
// import linno1005059 from "../images/1005059.jpg";
// import linno1008026 from "../images/1008026.jpg";
// import channo2012033 from "../images/2012033.jpg";
// import channo6003033 from "../images/6003033.jpg";
// import other5013007 from "../images/5013007.jpg";
// import other5012016 from "../images/5012016.jpg";

//Importing practice images
import step1 from "../images/howtolabel_01.jpg";
import step2 from "../images/howtolabel_02.jpg";
import step3 from "../images/howtolabel_03.jpg";


const TutorialPage = () => {

    //Webpage of content can be seen on https://sway.office.com/PHFEUcvlOfTRODVv?authoringPlay=true&publish

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
                                For information on independent component analysis and 
                                component rejection, please see <a href="https://eeglab.org/tutorials/06_RejectArtifacts/RunICA.html">https://eeglab.org/tutorials/06_RejectArtifacts/RunICA.html</a>

                                <br/><br/>
                                <h4><Badge bg="info">References</Badge></h4>
                                <Container>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item style={{paddingLeft: '36px', textIndent: '-36px'}} action href="https://eeglab.org/">
                                            A. Delorme et al. “EEGLAB Wiki.” https://eeglab.org/ (accessed June 5, 2022).
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{paddingLeft: '36px', textIndent: '-36px'}} action href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2895624/">
                                            A. Delorme, T. Sejnowski, and S. Makeig, “Enhanced detection of artifacts in EEG data using higher-order statistics and independent component analysis,” Neuroimage, 34(4), pp. 1443-1449, 2007.
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{paddingLeft: '36px', textIndent: '-36px'}} action href="https://pubmed.ncbi.nlm.nih.gov/15102499/">
                                            A. Delorme and S. Makeig, “EEGLAB: an open source toolbox for analysis of single-trial EEG dynamics including independent component analysis,” Journal of neuroscience methods, 134(1), pp. 9-21, 2004
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{paddingLeft: '36px', textIndent: '-36px'}} action href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6595408/">
                                            L. Pion-Tonachini, K. Kreutz-Delgado, and S. Makeig, “ICLabel: An automated electroencephalographic independent component classifier, dataset, and website,” NeuroImage, 198, pp.181-197, August 2019.
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{paddingLeft: '36px', textIndent: '-36px'}} action href="https://labeling.ucsd.edu/tutorial/overview">
                                            L. Pion-Tonachini. "ICLabel Tutorial: EEG Independent Component Labeling." https://labeling.ucsd.edu/tutorial/overview (accessed June 1, 2022).
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{paddingLeft: '36px', textIndent: '-36px'}} action href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7763560/">
                                            N. Thammasan and M. Miyakoshi, “Cross-frequency power-power coupling analysis: a useful cross-frequency measure to classify ICA-decomposed EEG,” Sensors, 20(24), p. 7040, December 2020.
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Container>
                                
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
                                        <Accordion.Header>Feature Definitions</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            ICA-decomposed EEG data can be described with a variety of features from the 
                                            time-domain, frequency-domain, time-frequency domain, spatial domain. The features 
                                            selected for IC labeling in this project are defined here.   
                                            
                                            <br/><br/>
                                            <ul>
                                                <li>
                                                    <b>Power spectral density (PSD)</b>: describes the power of a signal as a function of frequency
                                                </li>
                                                <li>
                                                    <b>Scalp topography</b>: illustrates the projection of electrical source activity onto the scalp electrode.
                                                </li>
                                                <li>
                                                    <b>IC activiation</b>: change in voltage of the IC over time (i.e., IC time series)
                                                </li>
                                                <li>
                                                    <b>Power-power coupling (PPC)</b>: provides temporal information about spectral power by calculating spectral 
                                                    covariance. PPC occurs when the amplitude of oscillatory activity in different frequencies covaries over time. 
                                                    Spectral covariance can be illustrated by a square matrix plot called a comodulogram (or comodugram), where red 
                                                    indicates positive coupling (correlation) and blue indicates negative coupling (anti-correlation).
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Brain</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Brain ICs contain any brain activities. These components are believed to be 
                                            generated from local synchronous activity in one cortical patch (an area of 
                                            cortex that comprises several thousands of cortical neurons) or sometimes two 
                                            patches if they are well-connected. Due to the location and anatomical characteristics 
                                            of these small cortical patches, the brain components present dipolar projections 
                                            onto the scalp topography. The resultant scalp topography depends on the 
                                            location and orientation of the field potentials generated by synchronously 
                                            active neurons.  
                                            
                                            <br/><br/>
                                            The brain signals that usually get captured through EEG tend to occur at lower 
                                            frequencies: between 5 to 30Hz where 10 Hz (alpha wave) is the most often. The 
                                            power spectral density of brain components has a 1/f profile, with the power 
                                            being greatest at the lowest frequencies and decreasing rapidly as frequency 
                                            increases. An additional feature to pay attention to is the cross-frequency 
                                            power-power coupling (PPC) plot. Brain components show cross-frequency PPC (red) 
                                            at around 5 Hz and 30 Hz (located at the middle of the plot), near the 
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
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/wXLuP_ox1rJ50X?quality=480" alt="brain activity power spectrum" width="40%"/>
                                                </ul>
                                                <br/>
                                                <li><b>Topograhy</b></li>
                                                <ul>
                                                    <li>Smoothly varying dipolar</li>
                                                    <li>Diffuse</li>
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/7I4MaceFfjlRMH?quality=480" alt="brain topography" width="40%"/>
                                                </ul>
                                                <br/>
                                                <li><b>IC activity</b></li>
                                                <ul>
                                                    <li>Visible ERP with epoched data</li>
                                                    <li>May see alpha oscillatory activity in time series data</li>
                                                    <li>Epoched activity should be consistently active across trials</li>
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/0tkRISX0e-KWl9?quality=640" alt="brain ic activity" width="60%"/>
                                                </ul>
                                                <br/>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>Located in the brain area</li>
                                                    <li>Residual variance &lt;15%</li>
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/NYInU37w3ROtkg?quality=480" alt="brain dipole" width="40%"/>
                                                </ul>
                                                <br/>
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
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/NxkScUP4Sr7IXA?quality=480" alt="brain cross-frequency ppc " />
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/9JSin45CHYfsDq?quality=640" alt="Brain example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic' }}>Example #1 of Brain Data </figcaption>
                                                <p>
                                                    This component is an example of a Brain IC. Clear clues are given in the topography, dipole and power spectrum. 
                                                    The scalp topography contains a smooth dipolar projection. This projection is clearly located inside the brain, 
                                                    which could be identified by looking at the dipole position. Although the power spectrum contains a small peak at 
                                                    60 Hz, which means a little bit of Line Noise could be mixed in (refer to Line Noise section), a high peak is 
                                                    located at around 10 Hz. These clues to Brain IC could also be supported by the cross-frequency PPC plot, where 
                                                    a higher correlation is located at around 9 to 10 Hz.
                                                </p>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/Je_nZFQH93krXb?quality=640" alt="Brain example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Brain Data </figcaption>
                                                <p>
                                                    Same as the example above, the topography, dipole, power spectrum and cross-frequency PPC of this component clearly 
                                                    present characteristics of a Brain IC. The high peak shown in the power spectrum and cross-frequency PPC occurred at 
                                                    a lower frequency than in the previous example, but the frequency value is still within the range of 5 to 30 Hz.
                                                </p>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/QFVDn30vOzkkus?quality=640" alt="Brain example 3" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #3 of Brain Data </figcaption>
                                                <p>
                                                    The figure is also an example of a Brain component originating from a different location than the previous examples. 
                                                    While the scalp topography, dipole position and power spectrum are showing characteristics of a Brain component, 
                                                    the cross-frequency PPC is not showing any signs of a brain component. However, a component can still be considered a 
                                                    certain type even with an absence of one or two features as long as other features strongly direct to a certain classification.
                                                </p>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Muscle</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                                Muscle components represent the electrical activities of muscle tissues, and the 
                                                recordings of these muscle activities are called electromyography (EMG). Muscle 
                                                components are known to contain a broadband activity of high frequency (equal to 
                                                or above 20 Hz) due to combination of many motor unit (MU) action potentials (MUAP). 
                                                Since these MUAPs do not synchronize, the EMG powers are usually more spread out 
                                                than those of other signals. The components could be viewed as dipolar; however, 
                                                the dipoles will most often be located outside the brain, near the skull. The 
                                                dipolar projection on the scalp topography also will be highly concentrated and 
                                                located near the skull (could be called as being “shallow”). Additionally, muscle 
                                                components present parallel lines (parallel to the positive correlation line) at 
                                                higher frequency levels on cross-frequency PPC plots.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Activity Power Spectrum</b></li>
                                                <ul>
                                                    <li>Power concentration in frequencies equal to or above 20 Hz</li>
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/JMhqdxsbSZg0Zs?quality=400" alt="muscle activity power spectrum" width="40%" />
                                                </ul>
                                                <br/>
                                                <li><b>Scalp Topography</b></li>
                                                <ul>
                                                    <li>Could be dipolar located near the skull</li>
                                                    <li>more localized/concentrated topography</li>
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/u90H9VaEBhJuTV?quality=400" alt="muscle scalp topography" width="40%" />
                                                </ul>
                                                <br/>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>May be located near skull or scalp</li>
                                                    <li>Typically has residual variance &gt;15%</li>
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/6BzLbFgMk60JLt?quality=400" alt="muscle dipole" width="40%" />
                                                </ul>
                                                <br/>
                                                <li><b>IC activity</b></li>
                                                <ul>
                                                    <li>High amplitude, high frequency time series activity</li>
                                                    <li>Epoched activity may be inconsistent across trials depending on task(s)</li>
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/OI0b7MViPvriuP?quality=480" alt="muscle ic activity" width="60%" />
                                                </ul>
                                                <br/>
                                                <li><b>Cross-frequency PPC</b></li>
                                                <ul>
                                                    <li>Broadband correlation (i.e. power coupling) in frequencies &lt;20 Hz</li>
                                                    <li>Could see parallel lines at higher frequency levels</li>
                                                    <div style={{display: 'flex', width: '100%'}}>
                                                        <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/ELNKrHWUOOpQkc?quality=640" alt="muslce cross-frequency ppc" width="40%"/>
                                                        <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/tNQoJ2c_D7nzeu?quality=800" alt="muscle parallel lines" width="60%" />
                                                    </div>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/dcelveScxhEYl7?quality=640" alt="Muscle example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Muscle Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/5eAdJehJwDpIxh?quality=640" alt="Muscle example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Muscle Data </figcaption>
                                                <p>
                                                    Example #1 and #2 represent Muscle ICs. The topographies contain highly concentrated and dipolar projections. The 
                                                    locations of both dipoles are shallow, meaning the dipoles are located near the skull. The power spectrums and 
                                                    cross-frequency PPCs also present clear clues of Muscle IC due to higher power and concentration past a frequency 
                                                    value of 10 Hz, especially past 20 Hz.
                                                </p>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/xaW1x_TNaAZYD-?quality=480" alt="Muscle example 3" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #3 of Muscle Data </figcaption>
                                                <p>
                                                    This example could be confusing or a little challenging to label due to its scalp topography and dipole location. 
                                                    The topography is not localized, and the dipole is located near the eye and the lower location of the head. 
                                                    However, the component is clearly a Muscle component due to the power spectrum and cross-frequency PPC. Both 
                                                    plots show a high power and correlation after 20 Hz. Also, although the location of the dipole could be 
                                                    confusing, it is located near the skull, which also supports the IC as a Muscle component.
                                                </p>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
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
                                                the Eye components show block(s) of high cross-frequency PPC near each end of the 
                                                positive correlation line on the cross-frequency PPC plot. 

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>PSD</b></li>
                                                <ul>
                                                    <li>Peak at or below 5 Hz</li>
                                                </ul>
                                                <li><b>Scalp Topography</b></li>
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
                                                    <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/2_pZYQOcq8M4CR?quality=1920" alt="eye cross-frequency ppc" width="90%" />
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/QIUaeTB9Y2Wudk?quality=960" alt="Eye Vertical example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Eye Vertical Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/j0g4RudAAIjRMy?quality=640" alt="Eye Vertical example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Eye Vertical Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/1zoCr_B1zKcIih?quality=640" alt="Eye Vertical example 3" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Eye Vertical Data </figcaption>
                                                <p>
                                                    The three examples above are vertical Eye components. Both components show higher concentrated projections near the eye areas, 
                                                    and the projections are positive for both eyes. More detailed projection locations can be viewed by looking at the position of 
                                                    dipoles, which are located near the eyes. High powers and correlations occurring below 5 Hz can be seen on the power spectrum 
                                                    and cross-frequency PPC plots as well. Additionally, frequent high peaks in time series plots refer to eye blinks.
                                                </p>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/3vtJd0WAkeJifM?quality=640" alt="Eye Horizontal example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Eye Horizontal Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/_HH3PRB5Ic7aGa?quality=640" alt="Eye Horizontal example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Eye Horizontal Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/EK1qCsqvx-NzAX?quality=640" alt="Eye Horizontal example 3" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #3 of Eye Horizontal Data </figcaption>
                                                <p>
                                                    The three examples above are horizontal Eye components. The scalp topographies also show higher concentrations near the eyes 
                                                    like the previous Eye IC examples, but the projections are dipolar (one is positive, and the other is negative). Therefore, 
                                                    the dipoles are located near the eyes and the power spectrum shows higher power before 5 Hz. The higher power can be seen 
                                                    on the cross-frequency PPC where the plots contain higher correlations before about 5 to 10 Hz.
                                                </p>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Heart</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                                Heart components contain electrical signals from the heart, which recording is called electrocardiography (ECG/EKG). 
                                                The heart ICs can be easily determined by recognizing the QRS complex pattern on the Component Time Series plot. 
                                                The power of these complexes will also be placed at around 1Hz. Additionally, the heart is located far from the 
                                                EEG recording site. Therefore, the dipoles will be placed further away from the brain, and the topography will 
                                                represent a linear gradient. In rare occasions, the topography could also represent localized projections when 
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
                                            <Container>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/WHCDjLbDCZt85t?quality=640" alt="Heart example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Heart Data </figcaption>
                                                <p>
                                                    This component is not the best example of a Heart component. The component is clearly a heart component 
                                                    since it shows distinct QRS complexes on the time series plot and lower location of the dipole. However, 
                                                    the component is most likely mixed with other types of signals. Firstly, the scalp topography does not 
                                                    show a linear gradient. Secondly, the power spectrum contains multiple peaks. For instance, the component 
                                                    seems to be mixed with a Line Noise component (refer to Line Noise section) due to a peak at 50 Hz.
                                                </p>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/CXNikXhQSVCJwi?quality=640" alt="Heart example 2" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Heart Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/fYyOFFTn8Mf4kT?quality=640" alt="Heart example 3" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #3 of Heart Data </figcaption>
                                                <p>
                                                    The two ICs are also examples of heart components because of the gradient projections on the topographies, 
                                                    QRS complexes in the time series plots, dipole locations placed far away from the brain and peaks at around 
                                                    1Hz. Nonetheless, same as the previous example, the component is also mixed with some other components
                                                </p>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
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
                                            <Container>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/AFFKUYsWfT-pqs?quality=640" alt="Line Noise example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Line Noise Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/AFFKUYsWfT-pqs?quality=640" alt="Line Noise example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Line Noise Data </figcaption>
                                                <p>
                                                    These components are clearly Line Noise components because of drastic peaks at 60 Hz. Also, the 
                                                    other features are not necessarily representations of other classifications.
                                                </p>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
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
                                            <Container>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/P_qs7JOzoZ0OZy?quality=640" alt="Channel Noise example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Channel Noise Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/-uv9Rc4EpqXjgE?quality=640" alt="Channel Noise example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Channel Noise Data </figcaption>
                                                <p>
                                                    Both components are examples of Channel Noise. The biggest clues are the highly localized and 
                                                    concentrated projections on the scalp topographies. The center of higher projections is located 
                                                    where an EEG electrode would be placed. Also, other than a little bit of line noise at 50 or 60 Hz 
                                                    on the power spectrum, the plot shows a 1/f trend.
                                                </p>
                                                <br/>
                                            </Container>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>Other</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                                Any ICs which features do not fall into any of the IC types mentioned above will fall under Other. 
                                                In fact, most ICs are meaningless signals and actual signal components, such as the Brain components, 
                                                can be mixed with Other components. The best method to discern Other components is to recognize the 
                                                unusual characteristics in the features. One characteristic to note is that Other components could 
                                                include non-dipolar topography. 

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
                                            <Container>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/jqE6ADj5TQ3_a1?quality=640" alt="Other example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Other Data </figcaption>
                                                <br/>
                                                <img src="https://sway.office.com/s/PHFEUcvlOfTRODVv/images/OhaQcnIsRGC-4R?quality=640" alt="Other example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Other Data </figcaption>
                                                <p>
                                                    These components are examples of Other ICs. All the features are not 
                                                    correspondent to any other classifications previously mentioned.
                                                </p>
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
