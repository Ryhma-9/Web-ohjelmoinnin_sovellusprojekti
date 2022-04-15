import React from 'react';
import './Shop.css';
import Header from './Header';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ShoppingCart(props) {
    
    const location = useLocation();
    let idList = [];
    let itemBanList = [];
    let cartItemsQty = 0;
    let totalPrice = 0;
    let cartItems = getCartItemsFromStorage();

    function getCartItemsFromStorage(){
        let cartItems = [];
        if(sessionStorage.getItem('cartItems') !== null){
            cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        } 
        idGetter( cartItems );
        
        return cartItems;
    }

    // function cartItemSorter( cartItems){
    //     let newCartItems = [...cartItems];
    //     console.log(newCartItems);
    //     let newnewCartItems = [];

    //     newCartItems.forEach(item => {
    //         let maxQty = 0;
    //         let maxItem = item;
    //         let flag = false;

    //         idList.forEach(id => {
    //             if(id === item.productId){
    //             console.log("id === item.productId");
    //             console.log(maxItem);
    //             maxItem.qty = maxItem.qty + 1;
    //             maxQty = maxItem.qty;
    //             console.log("item.qty: " + item.qty);
    //             flag = true;
    //             console.log("flag = " + flag);
    //             }
    //         })
    //         if(flag === false){
    //             console.log("flag is false");
    //             item.qty = 1;
    //             console.log("item.qty: " + item.qty);
    //             idList.push(item.productId);
    //             console.log("item pushed into idList: " + idList[idList.length - 1]);
    //         }
    //         if(item.qty > maxQty){
    //             console.log("item.qty > maxQty");
    //             maxQty = item.qty;
    //             maxItem = item;
    //             console.log(maxItem);
    //         }
    //         newnewCartItems.push(maxItem);
    //     });
    //     console.log(newnewCartItems);
    //     return newnewCartItems;
    // }

    function idGetter( cartItems ){

        cartItems.forEach(item => {
            idList.push(item.productId);
        });
    }
    // function filterProducts(searchInput){
    //     const filteredData = allProducts.filter(item => {
    //         return Object.keys(item).some(key =>
    //             item[key].toString().toLowerCase().includes(searchInput.toLowerCase())
    //         );
    //     });
    //     setProducts(filteredData);
    // }

    // let filteredUserNames = allCustomers.filter(item=> item.userName).map(field=>field.userName);

    function getCartItemsQuantity( id ){
        console.log(id);
        let count = 0;
        idList.forEach(i => {
            if(id === i) count++;
            console.log(count);
        });
        return count;
    }

    // function printIdList(){
    //     for(let i = 0; i < idList.length; i++){
    //         console.log("idList[" + i + "] = " + idList[i]);
    //     }
    // }
    
    function printItemInfo(item){
        console.log("productId: " + item.productId);
        console.log("productName: " + item.productName);
        console.log("price: " + item.price);
        console.log("allergens: " + item.allergens);
        console.log("energy Content: " + item.energyContent);
        console.log("description: " + item.description);
        console.log("qty: " + item.qty)
    }

    function totalItemPriceCalculator(price, qty) {
        let totalItemPrice = price * qty;
        totalPrice += totalItemPrice;
        return totalItemPrice;
    } 

    function banCheck( id ){
        console.log(itemBanList);
        let resultFlag = false;

        itemBanList.forEach(i => {
            if(id === i){
                resultFlag = true;
            }
        });
        console.log(resultFlag);
        return resultFlag;
    }
    
    const listItems = cartItems.map((item) => {

        idList.forEach(id => {
            if(id === item.productId);
        });
        
        let quantity = getCartItemsQuantity( item.productId );
        let banCheckFlag = banCheck(item.productId);


        if(item !== null && banCheckFlag === false){
            itemBanList.push(item.productId);
            return ( <tr>
                <td id="itemName" key="productId"> { item.productName } </td> 
                <td>{ item.price }</td>
                <td>{ quantity }</td>
                <td> {totalItemPriceCalculator(item.price, quantity)} {" €"}</td>
            </tr>); 
        }
        return;
            
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
