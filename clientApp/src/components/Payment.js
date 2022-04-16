import React from 'react'
import './Shop.css';
import Header from './Header'
import './Shop.css'
import { Route, Link } from 'react-router-dom'


export default function Payment(props) {

    function noVisa() {
        alert('EI KÄY VISA!!');
    }

    function noCash() {
        alert('EI KÄY KÄTEINEN!!');
    }

  return (
    <div className='payment'>
        {console.log(props)}
        {/* <Header shoppingCartItems={ props.shoppingCartItems } logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ props.headerButtons } prevScene = { props.prevScene }/> */}
        <div><h2>Anna visa tai heitä käteistä</h2></div>
        <div className='paymentbuttons'>
            <button onClick={noVisa}>Visa</button>
            <button onClick={noCash}>Käteistä</button>
        </div>
        
    </div>
  )
}
