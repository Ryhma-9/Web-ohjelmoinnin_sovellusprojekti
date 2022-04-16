import React from 'react';
import './Shop.css';
import Header from './Header';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ShoppingCart() {
    
    let orderId = 0;

    const location = useLocation();
    let idList = [];
    let itemBanList = [];
    let totalPrice = 0;
    let cartItems = getCartItemsFromStorage();

    const [ delivery, setDelivery ] = useState(false);

    function getCartItemsFromStorage(){     //Hakee ostoskorin sisällön sessionStoragesta
        let cartItems = [];
        if(sessionStorage.getItem('cartItems') !== null){
            cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        } 
        idGetter( cartItems );
        
        return cartItems;
    }


    function idGetter( cartItems ){         //Listaa cartItems-taulukon esineiden id-numerot idList-taulukkoon

        cartItems.forEach(item => {
            idList.push(item.productId);
        });
    }
    

    function getCartItemsQuantity( id ){    //Laskee kunkin ostoskärry-tuotteen lukumäärän
        let count = 0;
        idList.forEach(i => {
            if(id === i) count++;
        });
        return count;
    }

    // function createOrder(){
    //     const body = [restaurant.restaurantId, ]
    //     await axios.post('http://localhost:8080/addorder');
    // }

    // async function getData() {
    //     const results = await axios.get('http://localhost:8080/restaurantcities');
    //     return results.data;
    //   }
    
    function printItemInfo(item){           //Debuggaukseen käytetty funktio. Tulostaa konsolille tuotteen infot.
        console.log("productId: " + item.productId);
        console.log("productName: " + item.productName);
        console.log("price: " + item.price);
        console.log("allergens: " + item.allergens);
        console.log("energy Content: " + item.energyContent);
        console.log("description: " + item.description);
        console.log("qty: " + item.qty)
    }

    function totalItemPriceCalculator(price, qty) {     //Laskee kaikkien ostoskärryssä olevien, saman id:n omaavien tuotteiden yhteishinnan
        let totalItemPrice = price * qty;                 
        return totalItemPrice;
    } 

    function banCheck( id ){                            //Tarkistaa onko tietty tuote tulostuskieltolistalla. Kun menuBrowser-näkymässä klikataan tuotetta,  
        console.log(itemBanList);                       //lisätään se sessionStorageen omalle rivilleen. Tämä funktio rajaa, että jokaista productId-numeroa kohden 
        let resultFlag = false;                         //tulostetaan shoppingCart-näkymään vain yksi rivi, johon perään on ilmoitettu tuotteiden lukumäärä. 

        itemBanList.forEach(i => {
            if(id === i){
                resultFlag = true;
            }
        });
        console.log(resultFlag);
        return resultFlag;
    }
    function refreshPage(){
        console.log("päpäpäpä")
        sessionStorage.clear('cartItems');
        window.location.reload(false);
    }
    
    const listItems = cartItems.map((item) => {         //Tulostaa tuotteen tiedot shoppingCart-näkymään. 

        idList.forEach(id => {
            if(id === item.productId);
        });
        
        let quantity = getCartItemsQuantity( item.productId );
        let banCheckFlag = banCheck(item.productId);
        let totalPricePerUnit = totalItemPriceCalculator(item.price, quantity);

        if(item !== null && banCheckFlag === false){        //banCheckFlagilla tarkistetaan, ettei samaa tuotetta tulosteta moneen kertaan.
            totalPrice += totalPricePerUnit;
            sessionStorage.setItem('totalPrice', totalPrice);

            itemBanList.push(item.productId);
            return ( <tr>
                <td id="itemName" key="productId"> { item.productName } </td> 
                <td>{ item.price }</td>
                <td>{ quantity }</td>
                <td>{ totalPricePerUnit } {" €"}</td>
            </tr>); 
        }
        return;    
    });


    return (
        <div > 
            <div className="shoppingCartView">
                <h1>Ostoskori</h1>
                    <table id="shoppingCartTable">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Unit price</th>
                                <th>Quantity</th>
                                <th>Total price</th>
                            </tr>
                        </thead>
                        <tbody>

                            { listItems }
                            
                            <tr id="totalPrice">
                                <td>Total Price: </td>
                                <td></td>
                                <td></td>
                                <td>{ totalPrice }{" €"}</td>
                            </tr>
                            <tr>
                                <td><button onClick={ () => refreshPage()} >Clear Cart</button></td>    
                                <td></td>
                                <td><div className="kotiinkuljetus">
                                    Kotiinkuljetus 
                                    <input 
                                        onChange={ () => setDelivery(delivery)}
                                        id="kotiinkuljetus" 
                                        type="checkbox" />
                                    </div>
                                </td>
                                <td><Link to="/payment" props={ delivery }><button id="btnpay" /* onClick={ createOrder() } */>Maksamaan</button></Link></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    )
}
