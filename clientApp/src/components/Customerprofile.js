import React, {useState} from 'react'
import './LogInBox.css';
import jwt_decode from "jwt-decode";

export default function CustomerProfile(props) {
const [userName, setUserName] = useState("");
const [role, setRole] = useState("");

function handleToken(){
  var token = props.jwt;
  var decoded = jwt_decode(token);
  console.log(decoded);
  setUserName(decoded.sub);
  setRole(decoded.role);
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
        </form>
        <div>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
        <div>
        <button className="logout-btn" onClick={() => { props.setJwtToken(null); props.setCounter(); props.setTrigger(false); }}>Logout</button>
        </div>
        <div>
        <button className="check-btn" onClick={() => { handleToken() } }>Check User Information</button>
        </div>
        {props.children}
      </div> 
  </div>
) : "";
}
