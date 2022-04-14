import React from 'react';
import './Shop.css';
import Header from './Header';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ShoppingCart(props) {
    
    const location = useLocation();
    let cartItems = getCartItemsFromStorage();
    const idList = [];
    let cartItemsQty = 0;
    idList.push(-1);
    let totalPrice = 0;

    function getCartItemsFromStorage(){
        let cartItems = [];
        if(sessionStorage.getItem('cartItems') !== null){
            cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        } 
      
        return cartItems;
    }

    function getCartItemsQuantity(){
        cartItemsQty = sessionStorage.getItem('cartItemsLength');
        return cartItemsQty;
    }

    function printIdList(){
        for(let i = 0; i < idList.length; i++){
            console.log("idList[" + i + "] = " + idList[i]);
        }
    }

    function checkIdList(item){
        idList.forEach(i => {
            if(item.productId === i){
                return true;
            } else {
                return false;
            }
        });     
    }
    

    function printItemInfo(item){
        console.log("productId: " + item.productId);
        console.log("productName: " + item.productName);
        console.log("price: " + item.price);
        console.log("allergens: " + item.allergens);
        console.log("energy Content: " + item.energyContent);
        console.log("description: " + item.description);
        console.log("qty: " + item.qty)
    }


    function quantityAdder(item){
        let flag = false;
        item.qty = 1;

        idList.forEach(i => {
            if(i === item.productId){
                flag = true;
            }
        });

        if(flag === true){
            let newItem = item;
            newItem.qty++;
            
        } else {
            item.qty = 1;
            idList.push(item.productId);
        }

        return item;
    }

    

    function totalItemPriceCalculator(price, qty) {
        let totalItemPrice = price * qty;
        totalPrice += totalItemPrice;
        return totalItemPrice;
    } 

    const sortedList = cartItems.map((item) => {

        let newItem = quantityAdder( item );
        // printItemInfo(item);
        console.log("newItem: ");
        console.log(newItem);
        printIdList();

        return newItem;
    })
    
    const listItems = sortedList.map((item) => {
        if(checkIdList(item)) {return null;}
        else {
            return ( <tr>
                <td id="itemName"> { item.productName } </td> 
                <td>{ item.price }</td>
                <td>{ item.qty }</td>
                <td> {totalItemPriceCalculator(item.price, item.qty)} {" €"}</td>
            </tr>);
        }
        
    });

    return (
        <div>
            {/* <Header shoppingCartItems={ props.shoppingCartItems } logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ props.headerButtons } prevScene = { props.prevScene }
            /> */}
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
                                <td> {totalPrice} {" €"}</td>
                            </tr>
                            <tr>
                                <td></td>    
                                <td></td>
                                <td></td>
                                <td><Link to="/payment"><button id="btnpay">Maksamaan</button></Link></td>
                            </tr>
                        </tbody>
                        
                    </table>
            </div>
        </div>
    )
}
