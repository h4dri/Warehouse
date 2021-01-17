import React from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css';
import homePNG from "../resources/home.png"
import logOut from "../resources/logout.png"

function Header() {
    return (
        <div id="header">
            <div id="homeImg"><Link to="/"><img src={homePNG} /></Link></div>
            <div id="logOutImg"><Link to="/logout"><img src={logOut} /></Link></div>
        </div>
    );
}

export default Header;