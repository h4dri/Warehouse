import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/AdminPanel.css';
import NewItem from './NewItem';
import OneProductAdmin from './OneProductAdmin';

function AdminPanel() {
    const rootStore = useContext(RootStoreContext)

    const [displayName, setDisplayName] = useState("Daniel Emerle");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        rootStore.userStore.getCurrentUser()
            .then(() => {
                if(rootStore.userStore.user)
                    setDisplayName(rootStore.userStore.user.displayName)
            })
    }, [])

    useEffect(() => {
        rootStore.productStore.loadProducts()
            .then(() => {
                setIsLoading(false)
            })
    }, [rootStore.productStore])

    return (
        <>
            <div id="adminPanel">
                <div id="customerDisplayName">
                    <h2>Witaj ponownie {displayName}!</h2>
                </div>
                <div id="productsList">
                    {
                        isLoading ? (
                            <p>Ładowanie...</p>
                        ) : (
                            <ul>
                                <li>
                                    <ul className="headers">
                                        <li>Nazwa produktu</li>
                                        <li>Liczba sztuk na magazynie</li>
                                        <li>Cena produktu za sztukę</li>
                                    </ul>
                                </li>
                            {rootStore.productStore.products.map((item, index) => {
                                return <li key={item.id}><OneProductAdmin item={item} /></li>
                            })}
                            </ul>
                        )
                    }
                </div>
                <div id="newItem">
                    <NewItem />
                </div>
            </div>
        </>
    );
}

export default observer(AdminPanel);