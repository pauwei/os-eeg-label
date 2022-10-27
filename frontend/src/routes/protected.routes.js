import React from 'react';
import { Router } from '@reach/router';
import Dashboard from '../views/Dashboard';
import UsersPage from '../views/UsersPage';
import Logout from '../views/Logout';
import DataPage from '../views/DataPage';
import StatisticsPage from '../views/StatisticsPage';

const ProtectedRoutes = () => (
    <Router>
        <Dashboard path='/dashboard' />
        <UsersPage path='/users' />
        <DataPage path='/datalist' />
        <StatisticsPage path='/statistics' />
        <Logout path='/logout' />
    </Router>
);

export default ProtectedRoutes;