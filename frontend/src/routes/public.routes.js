import React from "react";
import { Router } from "@reach/router";
import LandingPage from "../views/LandingPage";
import LabelPage from "../views/LabelPage";
import SignUp from "../views/SignUp";
import Login from "../views/Login";
import ResultsPage from "../views/ResultsPage";
import LoremIpsum from "../views/LoremIpsum";
import OverviewPage from "../views/OverviewPage";
import TutorialPage from "../views/TutorialPage";
import PracticePage from "../views/PracticePage";

const PublicRoutes = () => (
    <Router>
        <LandingPage path="/" />
        <LabelPage path="label" />
        <ResultsPage path="/results" />
        <LoremIpsum path="/lorem" />
        <OverviewPage path="/overview" />
        <TutorialPage path="/tutorial" />
        <PracticePage path="/practice" />
        <SignUp path="signup" />
        <Login path="login" />
    </Router>
);

export default PublicRoutes;
