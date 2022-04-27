import React from 'react';
import { Router } from '@reach/router';
import Dashboard from '../views/Dashboard';
import RolesPage from '../views/RolesPage';
import Logout from '../views/Logout';
import DataPage from '../views/DataPage';

const ProtectedRoutes = () => (
    <Router>
        <Dashboard path='/dashboard' />
        <RolesPage path='/roles' />
        <DataPage path='datalist' />
        <Logout path='/logout' />
    </Router>
);

export default ProtectedRoutes;