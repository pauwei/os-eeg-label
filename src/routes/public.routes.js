import React from 'react';
import { Router } from '@reach/router';
import LandingPage from '../views/LabelPage';
import LabelPage from '../views/LabelPage';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';

const PublicRoutes = () => (
    <Router>
        <LandingPage path='/' />
        <LabelPage path='label' />
        <SignIn path='signin' />
        <SignUp path='signup' />
    </Router>
);

export default PublicRoutes;