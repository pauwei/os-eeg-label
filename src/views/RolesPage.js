import React from 'react';
import { AuthConsumer } from '../helpers/AuthContext';

const RolesPage = () => {
    return (
        <AuthConsumer>
            { ({ isAuth }) =>
                isAuth ? (
                    <div>
                        <p>This page is in progress. Only admin can view roles.</p>
                    </div>
                ) : (
                    <div>
                        <p>You are not authenticated to view the page.</p>
                    </div>
                )
            }
        </AuthConsumer>
    );
}

export default RolesPage;