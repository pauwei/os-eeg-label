import React from 'react';
import { AuthConsumer } from '../helpers/AuthContext';
import Sidebar from '../components/Sidebar';

const ResultsPage = () => {

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <Sidebar />
                            <p>This page is in progress. You can view your progress here.</p>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <Sidebar />
                            <p>This page is in progress. You can view your progress here.</p>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <Sidebar />
                            <p>You are not authenticated to view the page.</p>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
}

export default ResultsPage;