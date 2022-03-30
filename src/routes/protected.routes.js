import React from 'react';
import { Router } from '@reach/router';
import Dashboard from '../views/Dashboard';
import RolesPage from '../views/RolesPage';
import ResultsPage from '../views/ResultsPage';

const ProtectedRoutes = () => (
    <Router>
        <Dashboard path='/dashboard' />
        <RolesPage path='/roles' />
        <ResultsPage path='/results' />
    </Router>
);

export default ProtectedRoutes;