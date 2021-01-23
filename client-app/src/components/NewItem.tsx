import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { INewProduct } from '../models/ProductsModel';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/NewItem.css';

function NewItem() {
    const rootStore = useContext(RootStoreContext)

    const [name, setName] = useState("")
    const [numberOf, setNumberOf] = useState("1")
    const [price, setPrice] = useState("1")
    const [isDisabled, setIsDisabled] = useState(true)

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }

    function handleChangeNumber(event: React.ChangeEvent<HTMLInputElement>){
        setNumberOf(event.target.value)
        var x: number = +event.target.value
        if(x < 1)
            setNumberOf("1")
    }

    function handleChangePrice(event: React.ChangeEvent<HTMLInputElement>){
        setPrice(event.target.value)
        var x: number = +event.target.value
        if(x < 1)
            setPrice("1")
    }

    function validate(){
        if(
            name !== "" &&
            numberOf !== "0" &&
            price !== "0"
        ) setIsDisabled(false)
        else setIsDisabled(true)
    }

    function handleCreateButton(){
        const values: INewProduct = {
            productName: name,
            priceEa: +price,
            numberOfProducts: +numberOf
        }

        rootStore.productStore.createProduct(values)
            .then(() => {
                window.open("/adminPanel", "_self")
            })
    }

    return (
        <>
            <div id="createNewElement" onKeyUp={validate}>
                <h2>Dodaj nowy produkt:</h2>
                <div className="element">
                    <h4>Nazwa produktu:</h4>
                    <input type="text" value={name} onChange={handleChangeName}/>
                </div>
                <div className="element">
                    <h4>Liczba sztuk produktu:</h4>
                    <input type="number" value={numberOf} onChange={handleChangeNumber}/>
                </div>
                <div className="element">
                    <h4>Cena za sztukę:</h4>
                    <input type="number" value={price} onChange={handleChangePrice}/>
                </div>
                <div className="element">
                    <button onClick={handleCreateButton} disabled={isDisabled}>Stwórz nowy produkt!</button>
                </div>
            </div>
        </>
    );
}

export default observer(NewItem);