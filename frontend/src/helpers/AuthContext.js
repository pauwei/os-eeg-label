import axios from "axios";
import React from "react";

const AuthContext = React.createContext();
const auth_API_URL = "http://localhost:8080/api/auth/";

class AuthProvider extends React.Component {
    state = { Email: "guest", Domain: "guest", Weight: 1.0, Auth: "Guest", Info: "Guest", Name: "Guest" };

    componentDidMount() {
        this.setState({
            Email: localStorage.getItem("Email"),
            Domain: localStorage.getItem("Domain"),
            Weight: localStorage.getItem("Weight"),
            Auth: localStorage.getItem("Auth"),
            Info: localStorage.getItem("Info"),
            Name: localStorage.getItem("Name"),
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

                if (response.data.accessToken) {
                    this.setState(
                        { Email: response.data.email, Domain: response.data.domain, Weight: response.data.weight, Auth: role, Info: role, Name: response.data.fname },
                        () => {
                            localStorage.setItem("Email", response.data.email);
                            localStorage.setItem("Domain", response.data.domain);
                            localStorage.setItem("Weight", response.data.weight);
                            localStorage.setItem("Auth", role);
                            localStorage.setItem(
                                "Info",
                                JSON.stringify(response.data)
                            );
                            localStorage.setItem("Name", response.data.fname);
                        }
                    );
                }

                return response.data;
            });
    };

    logout = () => {
        console.log("Logout called");

        this.setState({ Email: "guest", Domain: "guest", Weight: 1.0, Auth: "Guest", Info: "Guest", Name: "Guest" }, () => {
            localStorage.setItem("Email", "guest");
            localStorage.setItem("Domain", "guest");
            localStorage.setItem("Weight", 1.0);
            localStorage.setItem("Auth", "Guest");
            localStorage.setItem("Info", "Guest");
            localStorage.setItem("Name", "Guest");
        });
    };

    signup = ({ fname, lname, assoc, edu, exp, email, password }) => {
        console.log("Signup called");
        
        const weight = 1.0;
        const domain = 'user';
        const components = [];

        //Initialize new user
        return axios.post(auth_API_URL + "signup", {
            fname,
            lname,
            assoc,
            edu,
            exp,
            domain,
            weight,
            email,
            password,
            components,
        });
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    Email: this.state.Email,
                    Domain: this.state.Domain,
                    Weight: this.state.Weight,
                    Auth: this.state.Auth,
                    Info: this.state.Info,
                    Name: this.state.Name,
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
