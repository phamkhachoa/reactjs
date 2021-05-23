import React, { useState } from 'react';
import './login.css';
import logo from "../../images/logo.png";
import { login } from "../../functions/auth";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPasswod] = useState("");

    let history = useHistory();

    const submitForm = (e) => {
        e.preventDefault();
        console.log(username, password);
        login(username, password)
            .then((res) => {
                console.log(res.data.id_token);
                localStorage.setItem('id_token', res.data.id_token);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="wrapper">
            <div className="left">
                <div className="text_center_all">
                    <h2>Welcome to</h2>
                    <h1>AUTOML</h1>
                    <h2>Login to access your account</h2>
                </div>
            </div>
            <div className="right">
                <div className="r_up">
                    <img src={logo} />
                </div>
                <div className="r_down">
                    <h1>LOGIN ACCOUNT</h1>
                    <form>
                        <div>
                            Username: <input type="text" placeholder="user" className="input_text" onChange={(e) => { setUsername(e.target.value) }} value={username} />
                        </div>
                        <div>
                            Password: <input type="password" placeholder="pass" className="input_text" onChange={(e) => { setPasswod(e.target.value) }} value={password} />
                        </div>

                        <Button variant="contained" color="primary" onClick={submitForm}>
                            Login
                        </Button>
                        <Button variant="contained" color="primary">
                            Login Oauth2
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;

