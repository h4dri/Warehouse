import React, { useContext, useEffect, useState } from 'react';
import { IProduct } from '../models/ProductsModel';
import '../styles/CashProducts.css';

function CashProducts(props: {item: IProduct}) {

    return (
        <>
            <ul className="oneCashListElement">
                <li>{props.item.productName}</li>
                <li>{props.item.numberOfProducts} szt</li>
                <li>{props.item.priceEa} zł</li>
            </ul>
        </>
    );
}

export default CashProducts;