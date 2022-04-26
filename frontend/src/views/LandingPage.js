import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const LandingPage = () => {

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <p>You are authenticated. Your progress is on the leaderboard.</p>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <p>You are authenticated. Your progress is on the leaderboard.</p>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <p>You are not authenticated. Your progress is not on the leaderboard.</p>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default LandingPage;