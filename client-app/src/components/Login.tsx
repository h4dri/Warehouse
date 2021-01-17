import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    function handleLoginChange(event: React.ChangeEvent<HTMLInputElement>){
        setLogin(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function handleLoginButton(){
        window.open("/customerPanel", "_self");
    }

    function validate(){
        if(login === "" || password === "") setIsDisabled(true)
        else setIsDisabled(false)
    }

    return (
        <>
            <div id="login">
                <div id="loginContent" onKeyUpCapture={validate}>
                    <h1>Zaloguj się:</h1>
                    <div className="loginElement">
                        <p>Login:</p>
                        <input type="text" value={login} onChange={handleLoginChange}/>
                    </div>
                    <div className="loginElement">
                        <p>Hasło:</p>
                        <input type="email" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div id="loginButton">
                    <input type="submit" value="Zaloguj" disabled={isDisabled} onClick={handleLoginButton}/>
                    </div>
                    <div id="registerText">
                        <i>* jeżeli nie masz konta <Link to="/register">zarejestruj się</Link>!</i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;