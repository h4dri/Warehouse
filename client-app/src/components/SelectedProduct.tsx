import React, { useContext, useEffect, useState } from 'react';
import { IProduct } from '../models/ProductsModel';
import '../styles/SelectedProduct.css';

function SelectedProduct(props: { item: IProduct }) {


    return (
        <>
            <h3>Wybrany produkt:</h3>
            <p>{props.item.id}</p>
            <p>{props.item.productName}</p>
            <p>{props.item.numberOfProducts}</p>
            <p>{props.item.priceEa}</p>
        </>
    );
}

export default SelectedProduct;