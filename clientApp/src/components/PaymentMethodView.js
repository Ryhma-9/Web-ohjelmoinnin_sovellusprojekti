import React from 'react';
import axios from 'axios'

export default function PaymentMethodView(props){

  console.log("props.trigger: ");
  console.log(props.trigger);


  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner" >
          <h2>Payment Methods</h2>
            <div className="paymentMethodContainer">
              <div className="paymentMethodElement">Nurdea</div>
              <div className="paymentMethodElement">Dogebank</div>
              <div className="paymentMethodElement">DönskseBank</div>
              <div className="paymentMethodElement">HosuusPankki</div>

              <div className="paymentMethodElement">JyystöPankki</div>
              <div className="paymentMethodElement">Ääs-Pankki</div>
              <div className="paymentMethodElement">Pöp-Pankki</div>
              <div className="paymentMethodElement">Jokuvittu</div>

            </div>
            <button className="btn-close" onClick={() => props.triggerer(!props.trigger)}>Close</button>
        </div> 
    </div>
  ) : "";
}