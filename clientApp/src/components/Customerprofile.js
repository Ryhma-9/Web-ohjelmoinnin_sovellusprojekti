import React, {useState} from 'react'
import './LogInBox.css';
import jwt_decode from "jwt-decode";

export default function CustomerProfile(props) {
const [userName, setUserName] = useState("");
const [role, setRole] = useState("");
const [customerId, setCustomerId] = useState("");
var jwtToken = sessionStorage.getItem("token");

function handleToken(){
  var decoded = jwt_decode(jwtToken);
  console.log(decoded);
  setUserName(decoded.sub);
  setRole(decoded.role);
  setCustomerId(decoded.customerid)
}

return (props.trigger) ? (
  <div className="popup">
      <div className="popup-inner">
      <h2>User Information</h2>
        <form>
          <div>
            Username: <br/>
            {userName}
          </div>
          <div>
            Role: <br/>
            {role}
          </div>
          <div>
            Customer ID: <br/>
            {customerId}
          </div>
        </form>
        <div>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
        <div>
        <button className="logout-btn" onClick={() => { sessionStorage.removeItem("token") ; props.setTrigger(false); }}>Logout</button>
        </div>
        <div>
        <button className="check-btn" onClick={() => { handleToken() } }>Check User Information</button>
        </div>
        {props.children}
      </div> 
  </div>
) : "";
}
