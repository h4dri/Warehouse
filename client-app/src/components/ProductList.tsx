import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/CustomerPanel.css';
import HBHeader from './HBHeader';

function ProductList() {
    const rootStore = useContext(RootStoreContext)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        rootStore.productStore.loadProducts()
            .then(() => {
                setIsLoading(false)
            })
    }, [rootStore.productStore])

    return (
        <>
            <div id="customerPanel">
                <h1>Lista produktów dostępnych w hurtowni (Jeżeli chcesz coś kupić to się zaloguj!):</h1>
                {
                    isLoading ? (
                        <p>Ładowanie...</p>
                    ) : (
                        <ul>
                        {rootStore.productStore.products.map((item, index) => {
                            return <li key={item.id}>{item.productName}</li>
                        })}
                        </ul>
                    )
                }
            </div>
        </>
    );
}

export default ProductList;