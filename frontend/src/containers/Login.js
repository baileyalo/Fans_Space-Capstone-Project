import React, {Component} from "react";
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            rememberMe: false
        }
    }
    render() {
        const { username, password, rememberMe } = this.state;
        return (
            <form onSubmit={this.onSubmit} style={{ margin: 'auto', width: '50%' }}>
                <h3>Login In</h3>
                <div>
                    <label>Username</label>
                    <br />
                    <input
                        placeholder="Please enter your username"
                        type="username"
                        value={username}
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                </div>
                <br />
                <div>
                    <label>Password</label>
                    <br />
                    <input
                        placeholder="Please enter your password"
                        type="password"
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </div>
                <br />
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={e => this.setState({ rememberMe: e.target.checked })}
                        />
                        Remember me?
                    </label>
                </div>
                <br />
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        )
    }

    validateForm = () => {
        const { email, password } = this.state;

        let status = true;
        if (email.length === 0) {
            status = false;
        }
        if (password.length === 0) {
            status = false;
        }
        return status;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const validationStatus = this.validateForm();
        if (validationStatus === false) {
            alert('Please fill all the required fields');
        }
        console.log(this.state);
    }
}

export default Login;