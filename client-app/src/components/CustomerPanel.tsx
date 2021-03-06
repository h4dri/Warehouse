import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/CustomerPanel.css';
import OneProduct from './OneProduct';
import SelectedProduct from './SelectedProduct';

function CustomerPanel() {
    const rootStore = useContext(RootStoreContext)

    const [displayName, setDisplayName] = useState("Daniel Emerle");
    const [isLoading, setIsLoading] = useState(true)
    const [actualProduct, setActualProduct] = useState(rootStore.productStore.actualProduct)
    const [isVisible, setIsVisible] = useState("none");

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

    function handleIndex(id: string){
        rootStore.productStore.getProduct(id)
            .then(() => {
                setActualProduct(rootStore.productStore.actualProduct)
            })
    }

    function handleShowPayPal(){
        isVisible === "block" ? setIsVisible("none") : setIsVisible("block")
        console.log(isVisible)
    }

    return (
        <>
            <div id="customerPanel">
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
                                    <ul>
                                        <li>Nazwa produktu</li>
                                        <li>Liczba sztuk na magazynie</li>
                                        <li>Cena produktu za sztukę</li>
                                    </ul>
                                </li>
                            {rootStore.productStore.products.map((item, index) => {
                                return <li key={item.id} onClick={() => handleIndex(item.id)}><OneProduct item={item} /></li>
                            })}
                            </ul>
                        )
                    }
                </div>
                <div id="productDetails">
                    {
                        actualProduct ? <SelectedProduct item={actualProduct} showHide={handleShowPayPal}/> : null
                    }
                </div>
                <div id="smart-button-container" style={{ display: isVisible }}>
                    <div style={{ textAlign: "center" }}>
                        <div id="paypal-button-container"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(CustomerPanel);