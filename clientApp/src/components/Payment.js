import React, { useState} from 'react'
import './Shop.css';
import Header from './Header'
import './Shop.css'
import { Route, Link, useLocation } from 'react-router-dom'
import PaymentMethodView from './PaymentMethodView'


export default function Payment(props) {
    
    const [ trigger, setTrigger] = useState(false);
    // const location = useLocation();
    // const delivBool = location.state;
    // console.log("delivBool");
    // console.log(props.delivery);
    // console.log("delivBool");
    console.log("payment trigger");
    console.log(trigger);


  return (
    <div className='payment'>
        {/* <Header shoppingCartItems={ props.shoppingCartItems } logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ props.headerButtons } prevScene = { props.prevScene }/> */}
        <div><h2>Please provide a Visa or throw some cash</h2></div>
        <div><h3>Your total price is: { sessionStorage.getItem('totalPrice') }</h3><br/></div>
        <div><p>Delivery is {  }</p></div>
        <PaymentMethodView trigger={ trigger } triggerer={() => setTrigger(!trigger)} />
        <div className='paymentbuttons'>
            <button onClick={ () => setTrigger(!trigger) }>Choose your method of payment</button>
        </div>
    </div>
  )
}
