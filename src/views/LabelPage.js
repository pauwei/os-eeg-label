import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const LabelPage = () => {

    return (
        <AuthConsumer>
            {( {Auth} ) =>  {

                //If admin
                if (Auth === 'Admin') {
                    return (
                        <div>
                            <p>Hey, you are authenticated. Your labelling progress will be stored.</p>
                        </div>
                    )
                }

                //If logged in user
                else if (Auth === 'User') {
                    return (
                        <div>
                            <p>Hey, you are authenticated. Your labelling progress will be stored.</p>
                        </div>
                    )
                }

                //If guest
                else {
                    return (
                        <div>
                            <p>You are not authenticated. Your labelling progress will not be stored</p>
                        </div>
                    )
                }
            }
                
            }
        </AuthConsumer>
    );
};

export default LabelPage;