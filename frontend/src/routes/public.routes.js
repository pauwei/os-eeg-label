import React from "react";
import { Router } from "@reach/router";
import LandingPage from "../views/LandingPage";
import LabelPage from "../views/LabelPage";
import SignUp from "../views/SignUp";
import Login from "../views/Login";
import ResultsPage from "../views/ResultsPage";
import OverviewPage from "../views/OverviewPage";
import TutorialPage from "../views/TutorialPage";
import PracticePage from "../views/PracticePage";
import ContactUs from "../views/ContactUs";

const PublicRoutes = () => (
    <Router>
        <LandingPage path="/" />
        <LabelPage path="label" />
        <ResultsPage path="/results" />
        <OverviewPage path="/overview" />
        <TutorialPage path="/tutorial" />
        <PracticePage path="/practice" />
        <ContactUs path="/contact" />
        <SignUp path="signup" />
        <Login path="login" />
    </Router>
);

export default PublicRoutes;
