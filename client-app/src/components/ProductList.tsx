import React, { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/ProductList.css';
import OneProduct from './OneProduct';

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
                                return <li key={item.id} className="product"><OneProduct item={item} /></li>
                            })}
                            </ul>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default ProductList;