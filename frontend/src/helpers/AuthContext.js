import axios from "axios";
import React from "react";

const AuthContext = React.createContext();
const auth_API_URL = "http://localhost:8080/api/auth/";

class AuthProvider extends React.Component {
    state = { Auth: "Guest", Info: "Guest", Results: 0 };

    componentDidMount() {
        this.setState({
            Auth: localStorage.getItem("Auth"),
            Info: localStorage.getItem("Info"),
            Results: localStorage.getItem("Results"),
        });
    }

    authHeader = () => {
        let info = JSON.parse(localStorage.getItem("Info"));

        if (info.accessToken) {
            return { "x-access-token": info.accessToken };
        } else {
            return {};
        }
    };

    login = ({ email, password }) => {
        console.log("Login called");

        return axios
            .post(auth_API_URL + "signin", {
                email,
                password,
            })
            .then((response) => {
                let role = "Guest";

                if (response.data.roles.includes("ROLE_ADMIN")) {
                    role = "Admin";
                } else if (response.data.roles.includes("ROLE_USER")) {
                    role = "User";
                }

                let result = this.state.Results;

                if (response.data.accessToken) {
                    this.setState(
                        { Auth: role, Info: role, Results: result },
                        () => {
                            localStorage.setItem("Auth", role);
                            localStorage.setItem(
                                "Info",
                                JSON.stringify(response.data)
                            );
                            localStorage.setItem("Results", result);
                        }
                    );
                }

                return response.data;
            });
    };

    logout = () => {
        console.log("Logout called");

        this.setState({ Auth: "Guest", Info: "Guest", Results: 0 }, () => {
            localStorage.setItem("Auth", "Guest");
            localStorage.setItem("Info", "Guest");
            localStorage.setItem("Results", 0);
        });
    };

    signup = ({ email, password }) => {
        console.log("Signup called");

        return axios.post(auth_API_URL + "signup", {
            email,
            password,
        });
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    Auth: this.state.Auth,
                    Info: this.state.Info,
                    Results: this.state.Results,
                    authHeader: this.authHeader,
                    login: this.login,
                    logout: this.logout,
                    signup: this.signup,
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
