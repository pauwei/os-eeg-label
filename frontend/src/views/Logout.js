import { React, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import { AuthContext, AuthConsumer } from "../helpers/AuthContext";

const Logout = () => {

    const context = useContext(AuthContext);

    useEffect(() => {
        setTimeout(() => {
            context.logout();
            navigate('/login')
        }, 5000);
    });

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <p>Hey, progress has been saved. Sign back in to view any changes.</p>
                            <p>You will be redirected in 5 seconds</p>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <p>Hey, thanks for labelling. Have a great day!</p>
                            <p>You will be redirected in 5 seconds</p>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <p>You are not authenticated. Please login.</p>
                            <p>You will be redirected in 5 seconds</p>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default Logout;