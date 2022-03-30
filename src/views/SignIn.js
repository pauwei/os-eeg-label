import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const SignIn = () => {

    return (
        <AuthConsumer>
            {({ isAuth }) =>
                isAuth ? (
                    <div>
                        <p>Hey, you already signed in. Feel free to go to the labelling page.</p>
                    </div>
                ) : (
                    <div>
                        <p>You are not authenticated. Please make sure you signup before signing in.</p>
                    </div>
                )
            }
        </AuthConsumer>
    );
};

export default SignIn;