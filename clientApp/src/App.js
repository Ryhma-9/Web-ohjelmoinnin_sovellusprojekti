import './App.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CitySelection from './components/CitySelection';
import RestaurantBrowser from './components/RestaurantBrowser';
import MenuBrowser from './components/MenuBrowser';



function App() {

  // Jotain alkeelista yritystä kaupungin valinnan hallintaan
  const [ selectedCity, setSelectedCity ] = useState("");
  const citySelectHandler = (selection) => {
    if (selection === "") {
      setSelectedCity(selection);
      setSelectedRestaurant(selection);
      setScene("CitySelection");
    }
    else {
      setSelectedCity(selection);
      setScene("RestaurantBrowser");
    }
  }

  // Toiminnallisuuksia ravintolan valintaan
  const [ selectedRestaurant, setSelectedRestaurant ] = useState("");
  const restaurantSelectHandler = (selection) => {
    if (selection === "") {
      setSelectedRestaurant(selection);
      setScene("RestaurantBrowser");
    }
    else {
      setSelectedRestaurant(selection);
      setScene("MenuBrowser");
    }
  }

  const [ logIn, setLogIn ] = useState("");   // Kirjautumistiedot. Testivaiheessa oon tallentanut vaan nimen

  // Testailua
  const [ shoppingCartItems, setShoppingCartItems ] = useState([]);    // Ostoskorin sisältö tallennetaan tähän. Ainakin testien ajaksi
  console.log(shoppingCartItems)

  // Jotain räpellystä näkymän hallintaa liittyen
  const [ scene, setScene ] = useState("CitySelection");  // Statehook, jolla asetellaan näkymä
  const ViewhHandler = () => {    // switchcase rakenne, josta haetaan asetetun näkymän react-komponentti
    switch (scene) {
      case 'CitySelection' :    
        return <CitySelection onSelectClick={ citySelectHandler } loggedIn={ logIn } logOut={ setLogIn } headerButtons={ setScene }/>;
      case 'RestaurantBrowser': 
        return <RestaurantBrowser onSelectClick={ restaurantSelectHandler } loggedIn={ logIn } logOut={ setLogIn } headerButtons={ setScene }
                                  city={ selectedCity } unSelectCity={ citySelectHandler }/>;
      case 'MenuBrowser' :
        return <MenuBrowser city={ selectedCity } unSelectCity={ citySelectHandler } loggedIn={ logIn } logOut={ setLogIn } headerButtons={ setScene }
                            restaurant={ selectedRestaurant } unSelectRestaurant={ restaurantSelectHandler } shoppingCartItems={ shoppingCartItems } addItemsToCart={ setShoppingCartItems }/>;
      case 'LogIn': // Testailua
        return (
          <div>
            <h2>Coming Soon</h2>
            <button onClick={ ()=> [setLogIn("Seppo Taalasmaa"), setScene(prevScene)] }>Mutta sillä välin kirjaudu Seppona sisään</button>
          </div>
        )
      case 'ShopingCart': // Testailua
      return (
        <div>
          <h2>Coming Soon</h2>
          <h2>Ostoskorin sisältö:</h2>
          {
            shoppingCartItems.map((item) => {
              return <div>{item.name } { item.qty }</div>
            })
          }  
          <button onClick={ ()=> setScene(prevScene) }>Takaisin</button>
        </div>
      )
      default : 
        return "react ompi mukavaa! \n Näkymää " + scene + " ei löydy";
    }
  }
  // Funktio, jolla palautetaan statehookin edellinen arvo
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current ? ref.current.toString() : null;
  }
  const prevScene = usePrevious(scene);   // Edellinen näkymä. Hyödynnetään palatessa näkymästä edelliseen


  return (
    <div>
      <ViewhHandler/>
    </div>
  )
}

export default App;