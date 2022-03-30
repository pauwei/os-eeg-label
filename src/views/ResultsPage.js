import React from 'react';
import { AuthConsumer } from '../helpers/AuthContext';

const ResultsPage = () => {
    return (
        <AuthConsumer>
            { ({ isAuth }) =>
                isAuth ? (
                    <div>
                        <p>This page is in progress. You can view your progress here.</p>
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

export default ResultsPage;