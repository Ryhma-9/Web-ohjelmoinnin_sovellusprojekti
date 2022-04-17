import './App.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CitySelection from './components/CitySelection';
import RestaurantBrowser from './components/RestaurantBrowser';
import MenuBrowser from './components/MenuBrowser';
import ShoppingCart from './components/ShoppingCart';
import Payment from './components/Payment';
import Header from './components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faInfo } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


function App() {
  // Jotain toiminnallisuutta kaupungin valinnan hallintaan
  const [ selectedCity, setSelectedCity ] = useState(""); // valittu kaupunki
  const [ selectedRestaurant, setSelectedRestaurant ] = useState(""); // Ravintolan valintatieto
  const [ shoppingCartItems, setShoppingCartItems ] = useState([]);    // Ostoskorin sisältö tallennetaan tähän. Ainakin testien ajaksi
  var jwtToken = sessionStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
      <div className="header">
        <Header isCitySelected={ selectedCity } isRestaurantSelected={ selectedRestaurant }/* unSelectCity={ citySelectHandler } */ shoppingCart={ shoppingCartItems }/>
      </div>
        <Routes>
          <Route path="/" element={<CitySelection 
                              shoppingCart={ shoppingCartItems } /> } />
          <Route path="/restaurantbrowser" element={<RestaurantBrowser isCitySelected = { (selectedCity) => { setSelectedCity(selectedCity)} }/>}/>
          <Route path="/menubrowser" element={<MenuBrowser isRestaurantSelected = { (selectedRestaurant) => { setSelectedRestaurant(selectedRestaurant)}}/>}/>
          <Route path="/shoppingcart" element={<ShoppingCart  /* Shoppings={ (shoppingCartItems) => { setShoppingCartItems(shoppingCartItems)}} *//>} />
          <Route path="/payment" element={ <Payment  />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;