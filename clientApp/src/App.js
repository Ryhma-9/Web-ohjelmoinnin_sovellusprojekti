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

  const [ logIn, setLogIn ] = useState("");   // Kirjautumistiedot. Testivaiheessa oon tallentanut vaan nimen. Toteutuksessa nimi + rooli??
  const [ shoppingCartItems, setShoppingCartItems ] = useState([]);    // Ostoskorin sisältö tallennetaan tähän. Ainakin testien ajaksi

  return (
    <div>
      <BrowserRouter>
      <div className="header">
        <Header /* loggedIn={ logIn } logOut={ setLogIn } */ isCitySelected={ selectedCity } isRestaurantSelected={ selectedRestaurant }/* unSelectCity={ citySelectHandler } */ shoppingCart={ shoppingCartItems }/>
      </div>
        <Routes>
          <Route path="/" element={<CitySelection loggedIn={ logIn } logOut={ setLogIn } 
                              shoppingCart={ shoppingCartItems } /> } />
          <Route path="/restaurantbrowser" element={<RestaurantBrowser /* loggedIn={ logIn } logOut={ setLogIn } */  
                                  isCitySelected = { (selectedCity) => { setSelectedCity(selectedCity)} } /* shoppingCart={ shoppingCartItems } *//> } />
          <Route path="/menubrowser" element={<MenuBrowser /* city={ selectedCity } */ /* unSelectCity={ citySelectHandler } */ /* loggedIn={ logIn } logOut={ setLogIn } */  
                            isRestaurantSelected = { (selectedRestaurant) => { setSelectedRestaurant(selectedRestaurant)}} /* restaurant={ selectedRestaurant } */ /* shoppingCart={ shoppingCartItems } addItemsToCart={ setShoppingCartItems } *//>} />
          <Route path="/shoppingcart" element={<ShoppingCart /* city={ selectedCity } */ /* unSelectCity={ citySelectHandler } */ /* loggedIn={ logIn } logOut={ setLogIn } */ /* shoppingCartItems = { shoppingCartItems } restaurant={ selectedRestaurant } */ />} />
          <Route path="/payment" element={ <Payment /* city={ selectedCity } */ /* unSelectCity={ citySelectHandler } *//*  loggedIn={ logIn } logOut={ setLogIn } */ /* shoppingCartItems = { shoppingCartItems }  restaurant={ selectedRestaurant } */ />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;