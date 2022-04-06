import './App.css';
import { useEffect, useState, useRef } from 'react';
import CitySelection from './components/CitySelection';
import RestaurantBrowser from './components/RestaurantBrowser';
import MenuBrowser from './components/MenuBrowser';


function App() {

  // Jotain toiminnallisuutta kaupungin valinnan hallintaan
  const [ selectedCity, setSelectedCity ] = useState(""); // valittu kaupunki
  const citySelectHandler = (selection) => {
    if (selection === "") {     // poistetaan kaupungin valinta. Samalla myös poistetaan ravintolan valinta
      setSelectedCity(selection);
      setSelectedRestaurant(selection);
      setScene("CitySelection");  // asetetaan näkymäksi kaupungin valinta
    }
    else {
      setSelectedCity(selection); // Asetetaan statehookkiin valittu kaupunki ja siirryttän ravintolavalintanäkymään
      setScene("RestaurantBrowser");
    }
  }

  // Toiminnallisuuksia ravintolan valintaan
  const [ selectedRestaurant, setSelectedRestaurant ] = useState(""); // Ravintolan valintatieto
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

  const [ logIn, setLogIn ] = useState("");   // Kirjautumistiedot. Testivaiheessa oon tallentanut vaan nimen. Toteutuksessa nimi + rooli??
  const [ shoppingCartItems, setShoppingCartItems ] = useState([]);    // Ostoskorin sisältö tallennetaan tähän. Ainakin testien ajaksi


  // Jotain räpellystä näkymän hallintaa liittyen
  const [ scene, setScene ] = useState("CitySelection");  // Statehook, jolla asetellaan näkymä
  const ViewhHandler = () => {    // switchcase rakenne, josta haetaan asetetun näkymän react-komponentti
    switch (scene) {
      case 'CitySelection' :    
        return <CitySelection onSelectClick={ citySelectHandler } loggedIn={ logIn } logOut={ setLogIn } headerButtons={ setScene }
                              shoppingCart={ shoppingCartItems }/>;
      case 'RestaurantBrowser': 
        return <RestaurantBrowser onSelectClick={ restaurantSelectHandler } loggedIn={ logIn } logOut={ setLogIn } headerButtons={ setScene }
                                  city={ selectedCity } unSelectCity={ citySelectHandler } shoppingCart={ shoppingCartItems }/>;                           
      case 'MenuBrowser' :
        return <MenuBrowser city={ selectedCity } unSelectCity={ citySelectHandler } loggedIn={ logIn } logOut={ setLogIn } headerButtons={ setScene }
                            restaurant={ selectedRestaurant } unSelectRestaurant={ restaurantSelectHandler } shoppingCart={ shoppingCartItems } addItemsToCart={ setShoppingCartItems }/>;
      case 'LogIn': // Tämän hetkinen tuloste vain toiminnan testailua varten. Oikea tulossa
        return (
          <div>
            <h2>Coming Soon</h2>
            <button onClick={ ()=> [setLogIn("Seppo Taalasmaa"), setScene(prevScene)] }>Mutta sillä välin kirjaudu Seppona sisään</button>
          </div>
        )
      case 'ShopingCart': // Tämän hetkinen tuloste vain toiminnan testailua varten. Oikea tulossa
      return (
        <div>
          <h2>Coming Soon</h2>
          <a>Ostoskorin sisältö:</a>
          {
            shoppingCartItems.map((item) => {
              return <div>{item.name } { item.qty }</div>
            })
          }  
          <button onClick={ ()=> setScene(prevScene) }>Takaisin</button>
        </div>
      )
      default :  // Tuloste virheelisesta näkymävalinnasta
        return(
          <div>
            <h2>React ompi mukavaa!</h2>
            <h2>Virhe! Näkymää "{ scene }" ei löydy</h2>
            <button onClick={ ()=> setScene(prevScene) }>Takaisin</button>
          </div>
        )
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
  let prevScene = usePrevious(scene);   // Tähän tallennetaan edellinen näkymä. Hyödynnetään palatessa näkymästä edelliseen


  return (
    <div>
      <ViewhHandler/>
    </div>
  )
}

export default App;