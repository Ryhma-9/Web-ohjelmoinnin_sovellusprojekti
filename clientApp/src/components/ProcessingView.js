import React, { useEffect, useState } from 'react';


export default function ProcessingView(props){
  
  // let text = (<p>Processing...</p>)

  const [ textState , setTextState ] = useState("processing")

  const styleObj = {
    color:'green',
    fontSize:'large'
  }

  let textContentVariable = null;
  switch(textState)
  {
    default:
      textContentVariable = <div><p>Processing...</p></div>
      break;
    case "payment_complete":
      textContentVariable = <div>
                              <p style={styleObj}>Payment complete!</p>
                              <br/>
                              <button 
                                className="btn-close" 
                                onClick={() => props.processingview(!props.processingviewtrigger)}>
                                  Close
                              </button>
                            </div>
      break;
  }

  function timeOutValue(){
    return Math.round((Math.random() * 1000 + 1000))
  }

useEffect(()=>{
    // console.log("using efffect")
    // console.log(textState)
    const timer = setTimeout(() => {
      setTextState(() => "payment_complete");
      props.setpaymentsuccesfull(true);
    }, timeOutValue());
    return () => 
      clearTimeout(timer);
    },[]);
  
  
  return (props.processingviewtrigger) ? (
    <div className="popup-shop">
        <div className="popup-shop-inner-small" >
          <h2>Payment Methods</h2>
            <div className="paymentMethodContainer">
              { textContentVariable }
            </div>
        </div> 
    </div>
  ) : "";
}