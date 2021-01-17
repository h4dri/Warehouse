import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/CustomerPanel.css';
import HBHeader from './HBHeader';

function CustomerPanel() {
    const rootStore = useContext(RootStoreContext)

    const [displayName, setDisplayName] = useState("Daniel Emerle");
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
                <h2>Witaj ponownie {displayName}!</h2>
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

export default CustomerPanel;