import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const LandingPage = () => {

    return (
        <AuthConsumer>
            {({ isAuth }) =>
                isAuth ? (
                    <div>
                        <p>Hey, you are authenticated. View your progress in leaderboard.</p>
                    </div>
                ) : (
                    <div>
                        <p>You are not authenticated. Your progress is not on leaderboard.</p>
                    </div>
                )
            }
        </AuthConsumer>
    );
};

export default LandingPage;