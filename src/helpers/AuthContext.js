import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { Auth: 'Guest', Name: 'Guest', Results: 0 };

    componentDidMount() {
        this.setState( {Auth: localStorage.getItem('Auth'), Name: localStorage.getItem('Name'), Results: localStorage.getItem('Results')})
    }

    login = ({email, password}) => {
        console.log('Login Called');

        let role = 'Guest';
        if (email === 'admin@ufl.edu'){
            role = 'Admin'
        } else if( email === 'user@ufl.edu') {
            role = 'User';
        }

        let result = this.state.Results;

        this.setState( { Auth: role, Name: role, Results: result }, () => {
            localStorage.setItem('Auth', role);
            localStorage.setItem('Name', role);
            localStorage.setItem('Results', result);
        });
    };

    logout = () => {
        console.log('Logout called');

        this.setState({ Auth: 'Guest', Name: 'Guest', Results: 0}, () => {
            localStorage.setItem('Auth', 'Guest');
            localStorage.setItem('Name', 'Guest');
            localStorage.setItem('Results', 0);
        });
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    Auth: this.state.Auth,
                    Name: this.state.Name,
                    Results: this.state.Results,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };