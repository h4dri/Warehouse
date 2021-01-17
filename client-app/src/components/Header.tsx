import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css';
import homePNG from "../resources/home.png"
import logOut from "../resources/logout.png"
import productsPNG from "../resources/products.png"
import { RootStoreContext } from "../stores/RootStore";
import HBHeader from "./HBHeader";

function Header() {
    const rootStore = useContext(RootStoreContext);
    const { logout } = rootStore.userStore;

    return (
        <>
            <HBHeader />
            <div id="header">
                <div id="homeImg"><Link to="/"><img src={homePNG} /></Link></div>
                <div id="homeImg"><Link to="/productsList"><img src={productsPNG} /></Link></div>
                <div id="logOutImg"><Link to="/logout" onClick={logout}><img src={logOut} /></Link></div>
            </div>
        </>
    );
}

export default Header;