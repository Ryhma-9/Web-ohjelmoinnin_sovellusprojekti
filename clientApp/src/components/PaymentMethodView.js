import React from 'react';

export default function PaymentMethodView(props){

  console.log("props.bankselecttrigger: ");
  console.log(props.bankselecttrigger);

  const banks = [
    {
      name: "Nuurdea"
    },
    {
      name: "Dogebank"
    },
    {
      name: "DönskseBank"
    },
    {
      name: "HosuusPankki"
    },
    {
      name: "JyystöPankki"
    },
    {
      name: "Ääs-Pankki"
    },
    {
      name: "Peran rehellinen rahanlainaamo"
    },
    {
      name: "Joku muu, mikä?"
    }
  ];



  function paymentMethodHandler(){
    props.bankselector(!props.bankselecttrigger);
    props.processingview(!props.processingviewtrigger);
    // closeTimer();
  }

  return (props.bankselecttrigger) ? (
    <div className="popup">
        <div className="popup-inner" >
          <h2>Payment Methods</h2>
            <div className="paymentMethodContainer">
              {
                banks.map(bank => {
                  return (
                    <div className="paymentMethodElement" onClick={() => paymentMethodHandler()}>
                      <p>{bank.name}</p>
                    </div>
                  )
                })
              }
            </div>
            <button className="btn-close" onClick={() => props.bankselector(!props.bankselecttrigger)}>Close</button>
        </div> 
    </div>
  ) : "";
}