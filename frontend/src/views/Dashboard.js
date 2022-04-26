import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const Dashboard = () => {

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <p>Hey, you are authenticated. Your progress is below.</p>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <p>Hey, you are authenticated. Your progress is below.</p>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <p>You are not authenticated. Please login.</p>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default Dashboard;