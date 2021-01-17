import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HBHeader from '../components/HBHeader';
import '../styles/Register.css';

function Register() {

    const [login, setLogin] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    function handleLoginChange(event: React.ChangeEvent<HTMLInputElement>){
        setLogin(event.target.value);
    }

    function handleDisplayNameChange(event: React.ChangeEvent<HTMLInputElement>){
        setDisplayName(event.target.value);
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function handleregisterButton(){
        window.open("/customerPanel", "_self");
    }

    function validate(){
        if(email === "" || password === "" || login === "" || displayName === "") setIsDisabled(true)
        else setIsDisabled(false)
    }

    return (
        <>
            <div id="register">
                <div id="registerContent" onKeyUpCapture={validate}>
                    <h1>Zarejestruj się:</h1>
                    <div className="registerElement">
                        <p>Login:</p>
                        <input type="text" value={login} onChange={handleLoginChange}/>
                    </div>
                    <div className="registerElement">
                        <p>Imię i Nazwisko:</p>
                        <input type="email" value={displayName} onChange={handleDisplayNameChange}/>
                    </div>
                    <div className="registerElement">
                        <p>Email:</p>
                        <input type="email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div className="registerElement">
                        <p>Hasło:</p>
                        <input type="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div id="registerButton">
                    <input type="submit" value="Zarejestruj" disabled={isDisabled} onClick={handleregisterButton}/>
                    </div>
                    <div id="registerText">
                        <i>* jeżeli masz konto <Link to="/">zaloguj się</Link>!</i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;