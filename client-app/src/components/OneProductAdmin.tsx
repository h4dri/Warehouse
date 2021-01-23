import React, { useContext, useEffect, useState } from 'react';
import { IProduct } from '../models/ProductsModel';
import '../styles/OneProductAdmin.css';
import trashIMG from '../resources/trash.png'
import whiteTrashIMG from '../resources/trash2.png'
import pencilIMG from '../resources/pencil.png'
import whitePencilIMG from '../resources/pencil2.png'
import checIMG from '../resources/check.png'
import whiteChecIMG from '../resources/check2.png'
import { RootStoreContext } from '../stores/RootStore';

function OneProductAdmin(props: {item: IProduct}) {
    const rootStore = useContext(RootStoreContext)

    const [editImg, setEditImg] = useState(pencilIMG)
    const [trashImg, setTrashImg] = useState(trashIMG)
    const [isEditable, setIsEditable] = useState(true)
    const [name, setName] = useState(props.item.productName)
    const [numberOfProducts, setNumberOfProducts] = useState(props.item.numberOfProducts.toString())
    const [price, setPrice] = useState(props.item.priceEa.toString())

    function handleMouseEnter(event: React.MouseEvent<HTMLImageElement, MouseEvent>){
        if(isEditable){
            setEditImg(whitePencilIMG)
        } else {
            setEditImg(whiteChecIMG)
        }
    }

    function handleMouseLeave(event: React.MouseEvent<HTMLImageElement, MouseEvent>){
        if(isEditable){
            setEditImg(pencilIMG)
        } else {
            setEditImg(checIMG)
        }
    }

    function handleMouseEnterD(event: React.MouseEvent<HTMLImageElement, MouseEvent>){
        setTrashImg(whiteTrashIMG)
    }

    function handleMouseLeaveD(event: React.MouseEvent<HTMLImageElement, MouseEvent>){
        setTrashImg(trashIMG)
    }

    function handleEditButton(){
        if(!isEditable){
            const values: IProduct = {
                id: props.item.id,
                productName: name,
                priceEa: +price,
                numberOfProducts: +numberOfProducts
            }

            rootStore.productStore.updateProduct(values)
                .then(() => {
                    console.log("Pomyślnie zaktualizwano produkt!")
                })
        }

        isEditable ? setIsEditable(false) : setIsEditable(true)
    }

    function handleDeleteButton(){
        rootStore.productStore.deleteProduct(props.item.id)
            .then(() => {
                window.open("/adminPanel", "_self")
            })
    }

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }

    function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>){
        setNumberOfProducts(event.target.value)
        var x: number = +event.target.value
        if(x < 0)
            setNumberOfProducts("0")
    }

    function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>){
        setPrice(event.target.value)
        var x: number = +event.target.value
        if(x < 1)
            setPrice("1")
    }

    return (
        <>
            <ul className="oneListElementAdmin">
                <li className="bigEl"><input type="text" value={name} onChange={handleChangeName} disabled={isEditable}></input></li>
                <li className="bigEl"><input type="number" min="0" value={numberOfProducts} onChange={handleNumberChange} disabled={isEditable}></input> szt</li>
                <li className="bigEl"><input type="number" min="0" value={price} onChange={handlePriceChange} disabled={isEditable}></input> zł</li>
                <li className="smallEl edit" onClick={handleEditButton}><img src={editImg} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/></li>
                <li className="smallEl trash" onClick={handleDeleteButton}><img src={trashImg} onMouseEnter={handleMouseEnterD} onMouseLeave={handleMouseLeaveD}/></li>
            </ul>
        </>
    );
}

export default OneProductAdmin;