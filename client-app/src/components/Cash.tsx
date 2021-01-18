import React, { useContext, useEffect, useState } from 'react';
import '../styles/Cash.css';
import { RootStoreContext } from '../stores/RootStore';
import { IProduct } from '../models/ProductsModel';
import CashProducts from './CashProducts';
import closeIMG from '../resources/close.png';

function Cash(props: {close: any, buy: any, isOpen: boolean}) {
    const rootStore = useContext(RootStoreContext)

    const [list, setList] = useState<IProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setList(rootStore.productStore.cashProducts)
    }, [props.isOpen])

    useEffect(() => {
        var summary = 0
        list.forEach((item) => {
            var x = item.priceEa * item.numberOfProducts
            summary = summary + x
        })
        setTotalPrice(summary)
    }, [list])

    function handleBuyButton(){
        props.buy()
    }

    return (
        <>
            <div id="cash">
                <div id="customerDisplayName">
                    <h2>Produkty w koszyku:</h2>
                </div>
                <div id="list">
                {
                    <ul>
                        <li>
                            <ul>
                                <li>Nazwa produktu</li>
                                <li>Liczba sztuk na magazynie</li>
                                <li>Cena produktu za sztukę</li>
                            </ul>
                        </li>
                        {list.map((item, index) => {
                            return <li key={index}><CashProducts item={item} /></li>
                        })}
                    </ul>
                }
                </div>
                <div id="price">
                    <h1>Suma całkowita:</h1>
                    <h2>{totalPrice.toString()} zł</h2>
                    <input type="button" value="KUP" onClick={handleBuyButton}/>
                </div>
                <div id="close" onClick={props.close}>
                    <img src={closeIMG} />
                </div>
            </div>
        </>
    );
}

export default Cash;