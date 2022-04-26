import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const SignUp = () => {

    return (
        <AuthConsumer>
        {( {Auth} ) =>  {

            //If admin
            if (Auth === 'Admin') {
                return (
                    <div>
                        <p>You already signed in. Please sign out to sign up for another account.</p>
                    </div>
                )
            }

            //If logged in user
            else if (Auth === 'User') {
                return (
                    <div>
                        <p>You already signed in. Please sign out to sign up for another account.</p>
                    </div>
                )
            }

            //If guest
            else {
                return (
                    <div>
                        <p>Signup for in progress.</p>
                    </div>
                )
            }
        }}
    </AuthConsumer>
    );
};

export default SignUp;