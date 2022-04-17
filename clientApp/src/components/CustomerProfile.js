import React, {useState} from 'react'
import './LogInBox.css';
import axios from 'axios';
import Constants from './Constants.json';

export default function CustomerProfile(props) {
const [userName, setUserName] = useState("");
const [role, setRole] = useState("");

const handleToken = async () => {
  const instance = axios.create({
  baseURL: Constants.API_ADDRESS,
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+props.jwt}
  })
  const result = await instance.get('/private');
  setUserName(result.data.userName);
  setRole(result.data.role);
}
handleToken();

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
        {props.children}
      </div> 
  </div>
) : "";
}