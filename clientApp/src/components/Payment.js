import React, { useState} from 'react'
import './Shop.css'
import PaymentMethodView from './PaymentMethodView'
import ProcessingView from './ProcessingView';
import { Redirect, useLocation } from 'react-router-dom';
import { Axios } from 'axios';


export default function Payment(props) {
    
    // const location = useLocation();
    // let restaurantId = location.state.restaurantId;
    // console.log(props)
    const fakeIdQtyList = [
      {
        productId:1,
        qty:2
      },
      {
        productId:2,
        qty:4
      }
    ];

    const [ paymentSuccesfull, setPaymentSuccessfull ] = useState(false);
    const [ bankSelectorDisplay, setBankSelectorDisplay ] = useState(false);
    const [ processingViewDisplay, setProcessingViewDisplay ] = useState(false);
    
    let deliveryTime = Math.round((Math.random() * 10 +10));
    let deliveryPrice = Math.round((Math.random() * 10 +10));
    // const location = useLocation();
    // const delivBool = location.state;
    // console.log("delivBool");
    // console.log(props.delivery);
    // console.log("delivBool");
    // console.log("payment trigger");
    // console.log(bankSelectorDisplay);
    
    // console.log("processingview trigger");
    // console.log(processingViewDisplay);

    // console.log("props.deliverystatuscheck")
    // console.log(props.deliverystatuscheck)
    
    function addOrder() {
      const orderObject = {
        customerId: 1,
        restaurantId: 1,
        productIds:
          fakeIdQtyList.map((id) => {
            return id;
          })
      }
      console.log(orderObject);

      /* await Axios.post('http://localhost:8080/addorder', */
    }

    if(paymentSuccesfull) addOrder();

    const DeliveryView = () => {
      return( props.deliverystatuscheck ? (<div><p>Delivery is {deliveryPrice} € and should take about {deliveryTime} minutes</p></div>)
      : "")
    }

  return (
    <div className='payment'>
        {/* <Header shoppingCartItems={ props.shoppingCartItems } logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ props.headerButtons } prevScene = { props.prevScene }/> */}
        <div><h2>Please provide a Visa or throw some cash</h2></div>
        { DeliveryView() }
        <div><h3>Your total price is: { parseInt(sessionStorage.getItem('totalPrice')) + parseInt(deliveryPrice) } €</h3><br/></div>
        <PaymentMethodView bankselecttrigger={ bankSelectorDisplay } processingviewtrigger={ processingViewDisplay } bankselector={() => setBankSelectorDisplay(!bankSelectorDisplay)} processingview={() => setProcessingViewDisplay(!processingViewDisplay)}/>
        {processingViewDisplay ? <ProcessingView processingviewtrigger={ processingViewDisplay } processingview={() => setProcessingViewDisplay(!processingViewDisplay)} paymentsuccesfull = { paymentSuccesfull } setpaymentsuccesfull = {() => setPaymentSuccessfull(!paymentSuccesfull)} /> : ""}
        <div className='paymentbuttons'>
            <button onClick={ () => setBankSelectorDisplay(!bankSelectorDisplay) }>Choose your method of payment</button>
        </div>
    </div>
  )
}
