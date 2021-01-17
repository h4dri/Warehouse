import React, { useContext, useEffect, useState } from 'react';
import { IProduct } from '../models/ProductsModel';
import '../styles/OneProduct.css';

function CustomerPanel(props: {item: IProduct}) {

    return (
        <>
            <ul>
                <li>{props.item.productName}</li>
                <li>{props.item.numberOfProducts} szt</li>
                <li>{props.item.priceEa} zł</li>
            </ul>
        </>
    );
}

export default CustomerPanel;