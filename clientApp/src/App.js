import './App.css';
import { useEffect, useState } from 'react';
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



  // Jotain räpellystä näkymän hallintaa liittyen
  const [ scene, setScene ] = useState("CitySelection");  // Statehook, jolla asetellaan näkymä
  const ViewhHandler = () => {    // switchcase rakenne, josta haetaan asetetun näkymän react-komponentti
    switch (scene) {
      case 'CitySelection' :    
        return <CitySelection onSelectClick={ citySelectHandler }/>;
      case 'RestaurantBrowser': 
        return <RestaurantBrowser onSelectClick={ restaurantSelectHandler } city={ selectedCity } unSelectCity={ citySelectHandler }/>;
      case 'MenuBrowser' :
        return <MenuBrowser city={ selectedCity } unSelectCity={ citySelectHandler }
                            restaurant={ selectedRestaurant } unSelectRestaurant={ restaurantSelectHandler }/>;
      default : 
        return "react ompi mukavaa";
    }
  }



  return (
    <div>
      <ViewhHandler/>
      
      <div className="TEST">
        {
          
        }
      </div>
  
    </div>
  )
}

export default App;