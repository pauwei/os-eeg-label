import React from 'react';
import { AuthConsumer } from "../helpers/AuthContext";

const LabelPage = () => {

    return (
        <AuthConsumer>
            {({ isAuth }) =>
                isAuth ? (
                    <div>
                        <p>Hey, you are authenticated. Your labelling progress will be stored.</p>
                    </div>
                ) : (
                    <div>
                        <p>You are not authenticated. Your labelling progress will not be stored</p>
                    </div>
                )
            }
        </AuthConsumer>
    );
};

export default LabelPage;