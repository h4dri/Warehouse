import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IUserFromValues } from '../models/UserModel';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/Login.css';

function Login() {
    const rootStore = useContext(RootStoreContext)

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const token = window.localStorage.getItem('jwt');
        console.log(token)
        token === "null" ? console.log("logowanie") : window.open("/customerPanel", "_self")
    }, []);

    function handleLoginChange(event: React.ChangeEvent<HTMLInputElement>){
        setLogin(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    function handleLoginButton(){
        const values: IUserFromValues = {
            userName: login,
            password: password
        };
        
        rootStore.userStore.login(values).catch(error => {
            setErrorText("Dane niepoprawne!")
        })
        setErrorText("");
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
                        <input type="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div id="loginButton">
                        <input type="submit" value="Zaloguj" disabled={isDisabled} onClick={handleLoginButton}/>
                    </div>
                    <p style={{ color: '#FF0000' }}>{errorText}</p>
                    <div id="registerText">
                        <i>* jeżeli nie masz konta <Link to="/register">zarejestruj się</Link>!</i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;