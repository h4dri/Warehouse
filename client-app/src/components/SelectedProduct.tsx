import React, { useContext, useEffect, useState } from 'react';
import { IProduct } from '../models/ProductsModel';
import '../styles/SelectedProduct.css';
import basketIMG from '../resources/basket.png'
import cashIMG from '../resources/cash.png'
import { RootStoreContext } from '../stores/RootStore';
import Cash from './Cash';

function SelectedProduct(props: { item: IProduct, showHide: any }) {
    const rootStore = useContext(RootStoreContext)
    
    const [selectedNumber, setSelectedNumber] = useState("1");
    const [price, setPrice] = useState(0);
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [isCashOpen, setIsCashOpen] = useState(false)

    function handleChangeNumber(event: React.ChangeEvent<HTMLInputElement>){
        setSelectedNumber(event.target.value)
        var x: number = +event.target.value
        if(x > props.item.numberOfProducts) 
            setSelectedNumber(props.item.numberOfProducts.toString())
        if(x < 1)
            setSelectedNumber("1")
    }

    useEffect(() => {
        var y = +selectedNumber * props.item.priceEa
        setPrice(y)
    }, [selectedNumber])

    function handleAddProductToCash(){
        const values: IProduct = {
            id: props.item.id,
            productName: props.item.productName,
            priceEa: props.item.priceEa,
            numberOfProducts: +selectedNumber
        }
        rootStore.productStore.addProductToCash(values)
        setNumberOfProducts(numberOfProducts + 1)
    }

    function handleCashButton(){
        setIsCashOpen(true)
        props.showHide()
    }

    function closeCash(){
        setIsCashOpen(false)
        props.showHide()
    }

    function buyProducts(){
        rootStore.productStore.buyProducts()
            .then(() => {
                setIsCashOpen(false)
                setNumberOfProducts(0)
                props.showHide()
            })
    }

    return (
        <>
            <div id="selectedProductContent">
                <h3>Wybrany produkt:</h3>
                <h4>Id produktu</h4>
                <p>{props.item.id}</p>
                <h4>Nazwa produktu</h4>
                <p>{props.item.productName}</p>
                <h4>Liczba sztuk na magazynie</h4>
                <p>{props.item.numberOfProducts} szt</p>
                <h4>Cena produktu za sztukę</h4>
                <p>{props.item.priceEa} zł</p>
                <div id="toAddToCash">
                    <p>Wprowadź liczbę sztuk do kupienia:</p>
                    <input type="number" value={selectedNumber} min="1" max={props.item.numberOfProducts} onChange={handleChangeNumber}/>
                    <p>Cena całkowita: {price.toString()} zł</p>
                    <button type="submit" onClick={handleAddProductToCash}><img src={basketIMG} /><p>Dodaj do koszyka</p></button>
                </div>
            </div>
            <div id="cashView" onClick={handleCashButton}>
                <img src={cashIMG} /> 
                <p>{numberOfProducts.toString()}</p>
            </div>
            {
                isCashOpen ? (
                    <Cash close={closeCash} buy={buyProducts} isOpen={isCashOpen}/>
                ) : (
                    null
                )
            }
        </>
    );
}

export default SelectedProduct;