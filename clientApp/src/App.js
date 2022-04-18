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
import RestaurantProfile from './components/RestaurantProfile';
import MenuEdit from './components/MenuEdit';


function App() {
  // Jotain toiminnallisuutta kaupungin valinnan hallintaan
  const [ selectedCity, setSelectedCity ] = useState(""); // valittu kaupunki
  const [ selectedRestaurant, setSelectedRestaurant ] = useState(""); // Ravintolan valintatieto
  const [ logIn, setLogIn ] = useState("");   // Kirjautumistiedot. Testivaiheessa oon tallentanut vaan nimen. Toteutuksessa nimi + rooli??
  const [ shoppingCartItemQtyList, setShoppingCartItemQtyList ] = useState({"":""});
  const [ deliveryStatus, setDeliveryStatus ] = useState(false);
  // const [ shoppingCartItems, setShoppingCartItems ] = useState([]);    // Ostoskorin sisältö tallennetaan tähän. Ainakin testien ajaksi
  
  sessionStorage.setItem('totalPrice', 0);
  var jwtToken = sessionStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
      <div className="header">
        <Header /* loggedIn={ logIn } logOut={ setLogIn } */ isCitySelected={ selectedCity } isRestaurantSelected={ selectedRestaurant }/* unSelectCity={ citySelectHandler } */ /* shoppingCart={ shoppingCartItems } *//>
      </div>
        <Routes>
          <Route path="/" element={<CitySelection loggedIn={ logIn } logOut={ setLogIn } 
                              /* shoppingCart={ shoppingCartItems } */ /> } />
          <Route path="/restaurantbrowser" element={<RestaurantBrowser isCitySelected = { (selectedCity) => { setSelectedCity(selectedCity)} }/>}/>
          <Route path="/menubrowser" element={<MenuBrowser isRestaurantSelected = { (selectedRestaurant) => { setSelectedRestaurant(selectedRestaurant)}}/>}/>
          <Route path="/shoppingcart" element={<ShoppingCart shoppingcartitemqtylist = {shoppingCartItemQtyList} deliverystatus={deliveryStatus} shoppingcartidqtylist = { (shoppingCartItemQtyList) => { setShoppingCartItemQtyList(shoppingCartItemQtyList) }} deliverystatustoggle = { (deliveryStatus) => {setDeliveryStatus(!deliveryStatus)}}/>}/>
          <Route path="/payment" element={ <Payment deliverystatuscheck = {deliveryStatus} shoppingcartitemqtylist = {shoppingCartItemQtyList}/>}/>
          <Route path="/restaurantprofile" element={ <RestaurantProfile/>}/>
          <Route path='/menuedit' element={<MenuEdit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;