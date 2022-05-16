import React from "react";
import { AuthConsumer } from "../helpers/AuthContext";
import Sidebar from "../components/Sidebar";

const LandingPage = () => {
    return (
        <AuthConsumer>
            {({ Auth }) => {
                //If admin
                if (Auth === "Admin") {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px'}}>
                                <p>
                                    You are authenticated as an admin. Your progress
                                    is on the leaderboard.
                                </p>
                            </div>
                            
                        </div>
                    );
                }

                //If logged in user
                else if (Auth === "User") {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px'}}>
                                <p>
                                    You are authenticated as a user. Your progress
                                    is on the leaderboard.
                                </p>
                            </div>
                        </div>
                    );
                }

                //If guest
                else {
                    return (
                        <div>
                            <Sidebar />
                            <div style={{paddingLeft: '250px'}}>
                                <p>
                                    You are not authenticated. Your progress is not
                                    on the leaderboard.
                                </p>
                            </div>
                        </div>
                    );
                }
            }}
        </AuthConsumer>
    );
};

export default LandingPage;