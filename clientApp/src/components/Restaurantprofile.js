import React from 'react';
import './Shop.css';
import Header from './Header';
import { Route, Link, } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import './RestaurantProfile.css'
import './Profiili.css'
import jwt_decode from "jwt-decode";

export default function RestaurantProfile() {

  return (
    <div className='Main2'>
        <h1>Ravintolan profiili</h1>
    
    <div className='form'>
      
      <div className='formbuttons'>
      <button>Muokkaa tietoja</button>
      <Link to="/menuedit"><button>Ruokalistan muokkaus</button></Link>
      <button>Tilaushistoria</button>
      <button><b>Takaisin</b></button>
      </div>
        <div className='forminner'>
           <div><label>Nimi:</label></div><input></input>
           <label>Osoite:</label><input></input>
           <label>Tyyli:</label><input></input>
           <label>Hintataso:</label><input></input>
           <label>Käyttäjänimi:</label><input></input>
           <label>Salasana:</label><input></input>
        
       <div className='vaihdabutton'> 
         <button>Vaihda tiedot</button> <br></br>
         
         
            </div>  
        
</div>
    </div>
    </div>
  )
}