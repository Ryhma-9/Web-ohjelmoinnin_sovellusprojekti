import React from 'react';
import './Shop.css';
import Header from './Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingCart(props) {
    
    // let itemArray = new Array();
    // let i = 0;

    // console.log(props.shoppingCartItems);
    // props.shoppingCartItems.forEach(item => {
    //     itemArray[i] = item;
    //     React.createElement("li", item);
    //     i++;
    // })
    let totalPrice = 0;

    function totalItemPriceCalculator(price, qty) {
        let totalItemPrice = price * qty;
        totalPrice += totalItemPrice;
        return totalItemPrice;
    } 

    const listItems = props.shoppingCartItems.map((item) => 
        <tr>
            <td id="itemName"> { item.name }</td> 
            <td>{ item.price }</td>
            <td>{ item.qty }</td>
            <td> {totalItemPriceCalculator(item.price, item.qty)} {" €"}</td>
        </tr>,
    );


    return (
        <div>
            {/* <Header shoppingCartItems={ props.shoppingCartItems } logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ props.headerButtons } prevScene = { props.prevScene }
            /> */}
            <div className="shoppingCartView">
                <h1>Ostoskori</h1>
                    <table id="shoppingCartTable">
                        <tr>
                            <th>Item</th>
                            <th>Unit price</th>
                            <th>Quantity</th>
                            <th>Total price</th>
                        </tr>
                        
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
                    </table>
            </div>
        </div>
    )
}
