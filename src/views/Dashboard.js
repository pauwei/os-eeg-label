import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const Dashboard = () => {

    return (
        <AuthConsumer>
            {({ isAuth }) =>
                isAuth ? (
                    <div>
                        <p>Hey, you are authenticated. Your progress is below.</p>
                    </div>
                ) : (
                    <div>
                        <p>You are not authenticated. Please login.</p>
                    </div>
                )
            }
        </AuthConsumer>
    );
};

export default Dashboard;