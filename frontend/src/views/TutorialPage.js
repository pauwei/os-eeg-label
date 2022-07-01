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

//Importing images for brain
import brainscalptopography1 from "../images/brainscalptopography1.jpg";
import brainpsd1 from "../images/brainpsd1.png";
import brainpsd2 from "../images/brainpsd2.jpg";
import braindipole1 from "../images/braindipole1.jpg";
import brainppc1 from "../images/brainppc1.jpg";
import brainexample1 from "../images/brainexample1.jpg";
import brainexample2 from "../images/brainexample2.jpg";
import brainexample3 from "../images/brainexample3.jpg";

//Importing images for muscle
import musclescalptopography1 from "../images/musclescalptopography1.jpg";
import muscletimeseries1 from "../images/muscletimeseries1.png";
import muscledipole1 from "../images/muscledipole1.jpg";
import musclepsd1 from "../images/musclepsd1.jpg";
import muscleppc1 from "../images/muscleppc1.jpg";
import muscleppc2 from "../images/muscleppc2.jpg";
import muscleexample1 from "../images/muscleexample1.jpg";
import muscleexample2 from "../images/muscleexample2.jpg";
import muscleexample3 from "../images/muscleexample3.jpg";

//Importing images for eye
import eyeppc1 from "../images/eyeppc1.jpg";
import eyeexample1 from "../images/eyeexample1.jpg";
import eyeexample2 from "../images/eyeexample2.jpg";
import eyeexample3 from "../images/eyeexample3.jpg";
import eyeexample4 from "../images/eyeexample4.jpg";
import eyeexample5 from "../images/eyeexample5.jpg";

//Importing images for heart
import heartexample1 from "../images/heartexample1.jpg";
import heartexample2 from "../images/heartexample2.jpg";
import heartexample3 from "../images/heartexample3.jpg";

//Importing images for line noise
import linenoiseexample1 from "../images/linenoiseexample1.jpg";
import linenoiseexample2 from "../images/linenoiseexample2.jpg";

//Importing images for channel noise
import channelnoiseexample1 from "../images/channelnoiseexample1.jpg";
import channelnoiseexample2 from "../images/channelnoiseexample2.jpg";

//Importing images for other noise
import otherexample1 from "../images/otherexample1.jpg";
import otherexample2 from "../images/otherexample2.jpg";

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
                                            ICs of EEG data can be classified into different categories with the following being previously 
                                            used for classification: Brain, Muscle, Eye, Heart, Line Noise, Channel Noise and Other. Each 
                                            IC includes unique characteristics, and these characteristics can be viewed by looking at various 
                                            features of the components. Therefore, the classifications of ICs can be based on recognizing 
                                            characteristics from these features. However, this classification could be challenging since ICs 
                                            might not be fully separated sometimes and contain characteristics of more than one class. Hence, 
                                            when labeling ICs, users need to fully understand the characteristics of various classes and choose 
                                            one or multiple classifications for each IC component. The following sections are provided to give 
                                            brief descriptions of the characteristics of each classification pertains.  
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
                                                    <b>Scalp topography</b>: illustrates the projection of electrical source activity onto the scalp electrode.
                                                </li>
                                                <li>
                                                    <b>Time series</b> (aka activation, time course): change in voltage of the IC over time
                                                </li>
                                                <li>
                                                    <b>Continuous data</b> (aka epoched activity): the large colored image represents a raster 
                                                    image formed by a collection of single-trial data epochs with IC activation coded by color. 
                                                    Below this image is the standard trial average activation ERP. However, because the experimental 
                                                    paradigm is not known, data has been epoched in 2s windows and not to any experimental event; 
                                                    therefore, the ERP is not very informative and will not be discussed further in this tutorial.  
                                                </li>
                                                <li>
                                                    <b>Dipole</b>: a model of electric potentials generated by synchronous populations of neurons 
                                                    composed of two equal and opposite charges separated by a small distance.  
                                                </li>
                                                <li>
                                                    <b>Power spectral density (PSD)</b>: describes the power of a signal (i.e., the squared amplitude) as a function of its frequency.
                                                </li>
                                                <li>
                                                    <b>Scalp topography</b>: illustrates the projection of electrical source activity onto the scalp electrode.
                                                </li>
                                                <li>
                                                    <b>IC activiation</b>: change in voltage of the IC over time (i.e., IC time series)
                                                </li>
                                                <li>
                                                    <b>Power-power coupling (PPC)</b>: provides temporal information about spectral power 
                                                    by calculating spectral covariance. PPC occurs when the amplitude of oscillatory activity 
                                                    in different frequencies covaries over time. Spectral covariance can be illustrated by a 
                                                    square matrix plot called a comodulogram (or comodugram), where red indicates positive coupling 
                                                    (correlation) and blue indicates negative coupling (anti-correlation).
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Brain</Accordion.Header>
                                        <Accordion.Body style={{textAlign: 'left'}}>
                                            <Divider title={"Summary"} />
                                            <br/>
                                            Brain ICs contain any kind of brain activity. These components are believed to be 
                                            generated from local synchronous activity in one cortical patch (an area of cortex 
                                            that comprises several thousands of cortical neurons) or sometimes more patches if 
                                            they are well-connected. Due to the location and anatomical characteristics of these 
                                            small cortical patches, the brain components present dipolar projections onto the scalp 
                                            topography. The resultant scalp topography depends on the location and orientation 
                                            of the field potentials generated by synchronously active neurons.  
                                            
                                            <br/><br/>
                                            The brain signals that usually get captured through EEG tend to occur most prominently at 
                                            lower frequencies: between 1 to 30Hz (even though higher frequencies also reflect functional 
                                            brain activity) where 10 Hz (alpha wave) is the most often observed peak in the power 
                                            spectrum. The power spectral density of brain components has a 1/f profile, with the 
                                            power being greatest at the lowest frequencies and decreasing rapidly as frequency 
                                            increases. An additional feature to pay attention to is the cross-frequency power-power 
                                            coupling (PPC) plot. Brain components show cross-frequency PPC (red) in the lower frequency 
                                            ranges (&lt;30Hz in the lower left quadrant and extending up to the middle of the plot), near 
                                            the positive-correlation diagonal line. Also, these components present anti-correlation on 
                                            the other corners (top left and bottom right) of the plot, which is depicted as blue.   

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Scalp topography</b></li>
                                                <ul>
                                                    <li>Dependent on location and dipole moment (radial, oblique, or tangential) dipolar topography.</li>
                                                    <li>Diffuse</li>
                                                    <img src={brainscalptopography1} alt="brain scalp topography" width="40%"/>
                                                </ul>
                                                <br/>
                                                <li><b>Time series</b></li>
                                                <ul>
                                                    <li>Visible ERP with epoched data</li>
                                                    <li>May see low frequency (theta to alpha) oscillatory activity in time series data</li>
                                                </ul>
                                                <br/>
                                                <li><b>Continuous data</b></li>
                                                <br/>
                                                <li><b>Power Spectral Density (PSD)</b></li>
                                                <ul>
                                                    <li>Inverse relationship (1/f)</li>
                                                    <li>Peak between 1 to 30 Hz often with high theta power between 3 to 7 Hz in anterior components and 10 Hz power peaks for central and more posterior components</li>
                                                    <img src={brainpsd1} alt="Brain IC Activity" width="40%"/>
                                                    <img src={brainpsd2} alt="Brain IC Activity with time series" width="40%"/>
                                                </ul>
                                                <br/>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>Located in the grey matter of the head model</li>
                                                    <li>Residual variance &lt;15%</li>
                                                    <img src={braindipole1} alt="brain dipole" width="40%"/>
                                                </ul>
                                                <br/>
                                                <li><b>Cross-frequency power-power coupling (PPC)</b></li>
                                                <ul>
                                                    <li>Higher cross-frequency PPC between 1 Hz and 30 Hz</li>
                                                    <ul>
                                                        <li>Near the positive-correlation diagonal line</li>
                                                    </ul>
                                                    <li>Anti-correlation further from the positive-correlation line</li>
                                                    <ul>
                                                        <li>Depicted as blue on the top left and bottom right corners of the plot</li>
                                                    </ul>
                                                    <img src={brainppc1} alt="brain cross-frequency ppc" width="40%"/>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src={brainexample1} alt="Brain example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic' }}>Example #1 of Brain Data </figcaption>
                                                <p>
                                                    This component is an example of a Brain IC as indicated by several features including the topography, dipole location 
                                                    and power spectrum. The scalp topography contains a smooth dipolar projection (in this case a tangential dipole) pointing 
                                                    towards a dipole located inside the brain (see dipole position). Although the power spectrum contains a small peak at 60 Hz, 
                                                    which means the IC contains Line Noise (refer to Line Noise section), a strong peak in power is located at around 10 Hz. These 
                                                    features indicate a Brain IC, which is further supported by the cross-frequency PPC plot, with a high correlation located in the 
                                                    lower frequency range (lower left corner) at around 9 to 10 Hz.
                                                </p>
                                                <br/>
                                                <img src={brainexample2} alt="Brain example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Brain Data </figcaption>
                                                <p>
                                                    Same as the example above, the topography, dipole, power spectrum and cross-frequency PPC of this component present characteristics 
                                                    of a Brain IC. The high peak shown in the power spectrum and cross-frequency PPC occurred at a lower frequency than in the previous 
                                                    example, but the strongest correlations can be seen within the range of 1 to 20 Hz. 
                                                </p>
                                                <br/>
                                                <img src={brainexample3} alt="Brain example 3" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #3 of Brain Data </figcaption>
                                                <p>
                                                    The figure is an example of a radially projecting Brain component originating from a more anterior location compared to the previous 
                                                    examples. While the scalp topography and dipole position show characteristics of a Brain component, the power spectrum (very pronounced 
                                                    low-frequency peak and an additional peak/plateau around 20 Hz) and the cross-frequency PPC (no strong cross correlation in the lower left 
                                                    quadrant) show mixed featured that are not necessarily indicative of a brain component. This could be indicative of a Brain component with 
                                                    additional features from a non-brain component.
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
                                            Muscle components represent the electrical activities of muscle tissues, and the recordings of these muscle activities are called electromyography (EMG). 
                                            Muscle components are known to contain broadband activity with power dominant in the 50-150 Hz range due to combination of many motor unit (MU) action 
                                            potentials (MUAP). The amplitude of muscle activity can range between 0-10 mV (peak-to-peak). Since these MUAPs do not synchronize, the EMG powers are 
                                            usually spread out over a wider frequency range than those of other signals. The components could be viewed as dipolar; however, the dipoles will most 
                                            often be located outside the brain, near the skull. Dependent on the muscle location (neck or skull), the dipolar projection on the scalp topography 
                                            will be concentrated and located near the skull. Additionally, muscle components may present parallel lines (parallel to the positive correlation line) 
                                            at higher frequency levels on cross-frequency PPC plots.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Scalp Topography</b></li>
                                                <ul>
                                                    <li>Could be dipolar located near the skull</li>
                                                    <li>more localized/concentrated topography</li>
                                                    <img src={musclescalptopography1} alt="muscle scalp topography" width="40%" />
                                                </ul>
                                                <br/>
                                                <li><b>Time series</b></li>
                                                <ul>
                                                    <li>May see bursts of high amplitude, high frequency activity</li>
                                                    <img src={muscletimeseries1} alt="muscle time series" width="40%" />
                                                </ul>
                                                <br/>
                                                <li><b>Continuous data</b></li>
                                                <ul>
                                                    <li>Epoched activity may be inconsistent across trials depending on task(s)</li>
                                                </ul>
                                                <br/>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>May be located near skull or scalp</li>
                                                    <li>Typically has residual variance &gt;15%</li>
                                                    <img src={muscledipole1} alt="muscle dipole" width="40%" />
                                                </ul>
                                                <li><b>PSD</b></li>
                                                <ul>
                                                    <li>Power concentration in frequencies equal to or above 20 Hz</li>
                                                    <img src={musclepsd1} alt="muscle activity power spectrum" width="40%" />
                                                </ul>
                                                <br/>
                                                <li><b>Cross-frequency PPC</b></li>
                                                <ul>
                                                    <li>Broadband correlation (i.e. power coupling) in frequencies &lt;20 Hz</li>
                                                    <li>Could see parallel lines at higher frequency levels</li>
                                                    <div style={{display: 'flex', width: '100%'}}>
                                                        <img src={muscleppc1} alt="muslce cross-frequency ppc" width="40%"/>
                                                        <img src={muscleppc2} alt="muscle parallel lines" width="60%" />
                                                    </div>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src={muscleexample1} alt="Muscle example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Muscle Data </figcaption>
                                                <br/>
                                                <img src={muscleexample2} alt="Muscle example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Muscle Data </figcaption>
                                                <p>
                                                    Example #1 and #2 represent Muscle ICs. The topographies contain highly concentrated and dipolar projections. The 
                                                    locations of both dipoles are shallow, meaning the dipoles are located near the skull. The power spectrums and 
                                                    cross-frequency PPCs also present clear clues of Muscle IC due to higher power and concentration past a frequency 
                                                    value of 10 Hz, especially past 20 Hz.
                                                </p>
                                                <br/>
                                                <img src={muscleexample3} alt="Muscle example 3" width="100%" style={{border: '2px solid #D3D3D3'}} />
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
                                            Due to the negatively charged retina and a less negatively charged cornea, the two eyes can be modeled as an equivalent 
                                            current dipole (ECD). In addition to movement of the eyes inducing electrical fields that are recorded in the EEG, the 
                                            muscle activity that moves the eyes and closes the eye lids contribute electrical activity that is recorded with EEG. 
                                            The Eye components can be divided further depending on the eye movements, horizontal, vertical, rotation, or blinking. 
                                            Although eye components generally present a power concentration at around or below 5 Hz, the components could present 
                                            different characteristics with different eye movements. For instance, components associated with vertical eye movements 
                                            show ECDs near the eye area and the time series plots will indicate regular high-amplitude activity due to blinking. 
                                            Components with horizontal eye movements will present topographies with lateralized positive and negative poles. These 
                                            horizontal eye movement components also will indicate time series plots which signal transitions to various values often 
                                            with high velocity indicating saccadic eye movements. Eye components often contain more than one dimension of eye movements 
                                            (blink and horizontal movements and / or muscle activity of eye movement). Additionally, the Eye components show block(s) of 
                                            high cross-frequency PPC near each end of the positive correlation line on the cross-frequency PPC plot.   

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Scalp Topography</b></li>
                                                <ul>
                                                    <li>Higher concentration near the eye area</li>
                                                    <ul>
                                                        <li>Vertical eye movements: Both eyes could be either positive or negative</li>
                                                        <li>Horizontal eye movements: Two eyes could be opposite of each other (one positive, one negative)</li>
                                                    </ul>
                                                </ul>
                                                <li><b>IC Time Series</b></li>
                                                <ul>
                                                    <li>Regular peaks that represent blinks (for vertical eye movements)</li>
                                                </ul>
                                                <li><b>Continuous data</b></li>
                                                <ul>
                                                    <li>Changes in IC RMS uV over time across most trials</li>
                                                </ul>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>Dipoles located at eye areas</li>
                                                </ul>
                                                <li><b>PSD</b></li>
                                                <ul>
                                                    <li>Peak at or below 5 Hz</li>
                                                </ul>
                                                <li><b>Cross-frequency PPC</b></li>
                                                <ul>
                                                    <li>Block(s) of high correlation near the edges of the positive-correlation line (top right and/or bottom left)</li>
                                                    <img src={eyeppc1} alt="eye cross-frequency ppc" width="90%" />
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src={eyeexample1} alt="Eye Blinks example" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example of Eye Blinks</figcaption>
                                                <br/>
                                                <img src={eyeexample2} alt="Eye Vertical example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Eye Vertical Data</figcaption>
                                                <br/>
                                                <img src={eyeexample3} alt="Eye Vertical example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Eye Vertical Data</figcaption>
                                                <p>
                                                    This component has a mixture of eye features (dipole location near eye, frontal scalp topography, high spectral 
                                                    power &lt;8 Hz) and muscle activity (plateau of PSD starting at 20 Hz).
                                                </p>
                                                <p>
                                                    The two examples above are Eye components. Both components show higher concentrated projections near the eye areas, 
                                                    and the projections are positive for both eyes. More detailed projection locations can be viewed by looking at the 
                                                    position of dipoles, which are located near the eyes. High powers and correlations occurring below 5 Hz can be seen 
                                                    on the power spectrum and cross-frequency PPC plots as well. Additionally, frequent high peaks in time series plots 
                                                    refer to eye blinks.
                                                </p>
                                                <br/>
                                                <img src={eyeexample4} alt="Eye Horizontal example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Eye Horizontal Data </figcaption>
                                                <br/>
                                                <img src={eyeexample5} alt="Eye Horizontal example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Eye Horizontal Data </figcaption>
                                                <p>
                                                    This component has a mixture of horizontal movement and blink-related eye activity.
                                                </p>
                                                <p>
                                                    The next two examples are primarily horizontal Eye components. The scalp topographies are concentrated near the eyes 
                                                    like the previous Eye IC examples, but the projections are dipolar (one is positive, and the other is negative). The 
                                                    dipoles are located near the eyes and the power spectrum shows high power below 5 Hz. The high power can be seen on the 
                                                    cross-frequency PPC where the plots contain large correlations between 2-15 Hz.
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
                                                Heart components contain electrical signals from the heart, which recording is called electrocardiography (ECG/EKG). The heart 
                                                ICs can sometimes be easily determined by recognizing a clear QRS complex in the Component Time Series plot. However, often, only 
                                                the R-peak might be observable in the time series plot. The power of Heart ICs is most pronounced in the low frequency range 
                                                around 1Hz. Additionally, the heart is located far from the EEG recording site. Therefore, the dipoles will be placed further 
                                                away from the brain, and the topography will represent a linear gradient. In rare occasions, the topography could also represent 
                                                localized projections when an electrode is placed near the superficial vein or artery.  
                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Scalp Topography</b></li>
                                                <ul>
                                                    <li>Linear gradient</li>
                                                    <li>(Rarely) localized/concentrated projections</li>
                                                </ul>
                                                <li><b>IC time Series</b></li>
                                                <ul>
                                                    <li>QRS complexes</li>
                                                </ul>
                                                <li><b>Continuous data</b></li>
                                                <ul>
                                                    <li>Changes in IC RMS uV over time across most trials</li>
                                                </ul>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>Placed far away from the brain</li>
                                                </ul>
                                                <li><b>PSD</b></li>
                                                <ul>
                                                    <li>Peak at only around 1 Hz</li>
                                                </ul>
                                                <li><b>Cross-frequency PPC</b></li>
                                                <ul>
                                                    <li>No clear pattern- might demonstrate patterns of other classes that are mixed in</li>
                                                </ul>
                                                
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src={heartexample1} alt="Heart example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Heart Data </figcaption>
                                                <p>
                                                    This component is primarily a heart component since it shows distinct QRS complexes on the time series plot and 
                                                    lower location of the dipole (in or near the neck). The component is most likely mixed with other types of signals 
                                                    as indicated by the power spectrum which contains multiple peaks (e.g. peak at 50 Hz; refer to Line Noise section).
                                                </p>
                                                <br/>
                                                <img src={heartexample2} alt="Heart example 2" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Heart Data </figcaption>
                                                <br/>
                                                <img src={heartexample3} alt="Heart example 3" width="90%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #3 of Heart Data </figcaption>
                                                <p>
                                                    The two ICs are also examples of heart components because of the gradient projections on the topographies, QRS 
                                                    complexes in the time series plots, dipole locations placed far away from the brain and peaks at around 1-4 Hz, 
                                                    as well as some additional low frequency peaks representing other aspects of the ECG. Nonetheless, same as the 
                                                    previous example, the component is also mixed with some other components.
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
                                            Line Noise components include any artifacts caused by any electrical systems near the EEG system during recordings. 
                                            Line Noise components show a strong level of power at around 50 Hz or 60 Hz, causing a high peak at one of those 
                                            frequencies in PSD. When these components’ interferences are spatially stationary across the EEG system, the Line 
                                            Noise components are easy to discern. However, in other cases, the Line Noise components are usually mixed with 
                                            other types of components.  

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Scalp Topography</b></li>
                                                <ul>
                                                    <li>No typical topography, can be distributed across the entire scalp, localized to single electrodes or mixtures thereof</li>
                                                </ul>
                                                <li><b>Time series</b></li>
                                                <ul>
                                                    <li>No specific characteristics other than a high frequency (50 Hz or 60 Hz) activity</li>
                                                </ul>
                                                <li><b>Continuous data</b></li>
                                                <ul>
                                                    <li>Near zero RMS uV across all trials</li>
                                                </ul>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>When topography is multipolar, high residual variance without consistent location</li>
                                                </ul>
                                                <li><b>PSD</b></li>
                                                <ul>
                                                    <li>High peak at 50 Hz or 60 Hz</li>
                                                </ul>
                                                <li><b>Cross-frequency PPC</b></li>
                                                <ul>
                                                    <li>May see no correlation at 50 or 60 Hz</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src={linenoiseexample1} alt="Line Noise example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Line Noise Data </figcaption>
                                                <br/>
                                                <img src={linenoiseexample2} alt="Line Noise example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Line Noise Data </figcaption>
                                                <p>
                                                    These components are clearly Line Noise components because of drastic peaks at 60 Hz. The PPC correlation 
                                                    is zero at 60 Hz. Also, the other features are not necessarily representations of other classifications.
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
                                            Channel Noise components are any recorded artifacts introduced by the electrodes (e.g. movement at 
                                            the electrolyte-skin interface). These components represent a highly concentrated projection located 
                                            at a specific channel on each topography. Due to this feature, the Channel Noise component could 
                                            look similar to Muscle components. However, while the Power Spectral Density (PSD) of Muscle 
                                            components contain high peak above 20 Hz, the PSD of Channel Noise components will rather have 
                                            a 1/f spectrum. Also, either large, consistent or both artifacts can be seen in the component 
                                            activations.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li><b>Scalp topography</b></li>
                                                <ul>
                                                    <li>Extremely concentrated projection at a specific channel location</li>
                                                </ul>
                                                <li><b>Time series</b></li>
                                                <ul>
                                                    <li>Large and/or consistent artifacts</li>
                                                </ul>
                                                <li><b>Continuous data</b></li>
                                                <ul>
                                                    <li>May have only a small percentage of trials with activity</li>
                                                </ul>
                                                <li><b>Dipole</b></li>
                                                <ul>
                                                    <li>Superficial, outside of brain</li>
                                                </ul>
                                                <li><b>PSD</b></li>
                                                <ul>
                                                    <li>1/f spectrum</li>
                                                </ul>
                                                <li><b>Crossfrequency PPC</b></li>
                                                <ul>
                                                    <li>No consistent pattern</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src={channelnoiseexample1} alt="Channel Noise example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Channel Noise Data </figcaption>
                                                <br/>
                                                <img src={channelnoiseexample2} alt="Channel Noise example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #2 of Channel Noise Data </figcaption>
                                                <p>
                                                    Both components are examples of Channel Noise. One important feature reflecting Channel Noise with 
                                                    high probability is the clearly localized and concentrated projections on the scalp topographies. 
                                                    The center of such a projection is often located around one electrode with an extrapolation of 
                                                    activity to all neighboring electrodes. In addition, these components also have mix of channel and 
                                                    line noise, which is illustrated by the PSD having a peak at 50 or 60 Hz with an otherwise visible 
                                                    1/f trend.
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
                                            In fact, several ICs might reflect meaningless signals and actual signal components, such as the 
                                            Brain components, can be mixed with Other components. The best method to discern Other components 
                                            is to recognize the unusual characteristics in the features. One characteristic to note is that 
                                            Other components could include non-dipolar topography.

                                            <br/><br/>
                                            <Divider title={"Characteristics"} />
                                            <ul>
                                                <li>Characteristics that do not fit under any other categories</li>
                                                <li><b>Scalp topography</b></li>
                                                <ul>
                                                    <li>Non-dipolar</li>
                                                </ul>
                                            </ul>

                                            <br/>
                                            <Divider title={"Examples"} />
                                            <Container>
                                                <br/>
                                                <img src={otherexample1} alt="Other example 1" width="100%" style={{border: '2px solid #D3D3D3'}} />
                                                <figcaption style={{textAlign: 'center', fontStyle: 'italic'}}>Example #1 of Other Data </figcaption>
                                                <br/>
                                                <img src={otherexample2} alt="Other example 2" width="100%" style={{border: '2px solid #D3D3D3'}} />
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
