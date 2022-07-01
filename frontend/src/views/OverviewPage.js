import React from "react";
import Container from "react-bootstrap/Container";
import Sidebar from "../components/Sidebar";

const OverviewPage = () => {
    return (
        <div>
            <Sidebar />
            <Container style={{paddingLeft: '250px', paddingTop: '90px'}}>
                <Container id="intro" className="Introduction">
                    <br/>
                    <h2>Introduction</h2>
                    <p style={{textAlign: 'left'}}>
                        Welcome to ICMoBI- a collaborative project dedicated to 
                        identifying Independent Components of Mobile Brain Imaging. 
                        Our objectives are to 1) help train researchers to 
                        differentiate between neural and non-neural independent 
                        components (ICs) extracted from EEG data using independent 
                        component analysis and 2) collect crowd-sourced labels for 
                        independent components. 
                    </p>
                </Container>
                <Container id="about" className="About">
                    <br/>
                    <h2>About this Project</h2>
                    <p style={{textAlign: 'left'}}>
                        The primary aim of this project is to automatically identify 
                        brain and non-brain components in mobile EEG data. Muscle, eye, 
                        and cardiac signals and other often unwanted signals contaminate 
                        EEG acquired during active human motion. Current classifiers for 
                        labeling ICs were mainly or entirely trained with stationary EEG 
                        data, which does not fully represent the data content of mobile EEG 
                        studies (e.g., ICLabel, MARA, IC_MARC). Training a component classifier 
                        with mobile EEG data may lead to better model performance in classifying 
                        ICs from mobile recordings than existing models. Therefore, we will be 
                        developing a new machine learning model using data contributed from a 
                        large variety of MoBI studies. The goal is to reduce time and bias in 
                        EEG data analyses due to subjective data reduction by automatically 
                        classifying brain, muscle, and other types of ICs. We intend to eventually 
                        integrate this classifier into EEGlab so it can easily be applied to any 
                        MoBI dataset.   
                    </p>
                </Container>
                <Container id="contribute" className="Contribute">
                    <br/>
                    <h2>Why and How to Contribute</h2>
                    <p style={{textAlign: 'left'}}>
                        The end result of this project will be an automated IC 
                        classifier integrated in EEGlab for your use and benefit.
                    </p>
                    <p style={{textAlign: 'left'}}>
                        How can you help? By contributing <a href="/contact#contribute">your data</a> and/or time! 
                    </p>
                    <p style={{textAlign: 'left'}}>
                        Manually distinguishing between brain and non-brain ICs requires extensive time 
                        and expertise. Processing EEG data from mobile experiments is challenging enough 
                        already; we don’t want labeling components to be an additional burden. We are 
                        attempting to develop an automated IC classifier specifically for mobile EEG 
                        data that will provide suggestions that can help to make the analyses more objective 
                        and replicable across labs. Developing this classifier requires a large amount of data 
                        and corresponding labels to yield the most successful outcome. Therefore, we are 
                        kindly requesting to collect and use 1) various mobile EEG datasets from different 
                        research groups and 2) crowd labels from users like yourself. So far we have over 
                        15,500 ICs from 121 datasets. We are collecting labels for a subset of these ICs by 
                        asking you and other members of the MoBI community to label as many as you can. Both 
                        the labeled and unlabeled data will be used to train and optimize the classifier. We 
                        will release the final model as an EEGLAB plug-in.  
                    </p>
                </Container>
                <Container id="acknowledgments" className="Acknowledgements">
                    <br/>
                    <h2>Acknowledgments</h2>
                    <p style={{textAlign: 'left'}}>
                        We’d like to thank Luca Pion-Tonachini for his advice and creating ICLabel, 
                        which inspired this project.
                    </p>
                    <p style={{textAlign: 'left'}}>
                        This project is supported by the National Institutes of Health 
                        and National Science Foundation under grants T32- NS082128 and 
                        NSF 1835317. 
                    </p>
                    <p style={{textAlign: 'left'}}>
                        Primary support was provided by the Human Neuromechanics 
                        Laboratory at the University of Florida and Berlin Mobile 
                        Brain/Body Imaging Laboratory at the Technical University 
                        of Berlin.
                    </p>
                </Container>
            </Container>
        </div>
    );
};

export default OverviewPage;
