import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const SignUp = () => {

    return (
        <AuthConsumer>
            {({ isAuth }) =>
                isAuth ? (
                    <div>
                        <p>You already signed in. Please sign out to sign up for another account.</p>
                    </div>
                ) : (
                    <div>
                        <p>Signup for in progress.</p>
                    </div>
                )
            }
        </AuthConsumer>
    );
};

export default SignUp;