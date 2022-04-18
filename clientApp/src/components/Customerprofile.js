import React, {useState, useEffect } from 'react'
import './LogInBox.css';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

export default function CustomerProfile(props) {
const [userName, setUserName] = useState("");
const [role, setRole] = useState("");

useEffect(() => {
function handleToken(){
  if (jwtToken != null){
  var decoded = jwt_decode(jwtToken);
  console.log(decoded);
  setUserName(decoded.sub);
  setRole(decoded.role);
  setCustomerId(decoded.customerid)
}}
handleToken();
});

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
          <Link to="/restaurantprofile"><button className="edit-btn" onClick={() => { props.setTrigger(false);}} >Edit profile</button></Link>
        </div>
        {props.children}
      </div> 
  </div>
) : "";
}
