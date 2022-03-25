import './App.css';
import { useEffect, useState } from 'react';
import RestaurantBrowser from './components/RestaurantBrowser';
import axios from 'axios';

function App() {


  const [ selectedCity, setSelectedCity ] = useState("Oulu");
  // Jotain alkeelista yritystä kaupungin valinnan hallintaan
  const citySelectHandler = (selection) => {
    console.log("CityHandler");
    if (selection === ""){
      setSelectedCity(selection);
      setView("CitySelection");
    }
    console.log("City selection: " + selectedCity);
  }



  // Testailua, tieto ravintolan valinnasta palaa appiin
  const restaurantsSelections = [];
  const restaurantSelectHandler = (restaurant) => {
    restaurantsSelections.push("Restoraunt selected, Selection: " + restaurant.name);
    setTestList(restaurantsSelections);
  }
  const [ testList, setTestList ] = useState([]);

  
  // Jotain räpellystä näkymän hallintaa liittyen
  const [ view, setView ] = useState("RestaurantBrowser");  // Statehook, jolla asetellaan näkymä

  const ViewhHandler = () => {    // switchcase rakenne, josta haetaan asetetun näkymän react-komponentti
    switch (view) {
      case 'CitySelection' :    
        return "Coming soon";
      case 'RestaurantBrowser': 
        return <RestaurantBrowser onSelectClick={ restaurantSelectHandler } city={ selectedCity } unSelectCity={ citySelectHandler }/>;
      case 'MenuBrowser' :
        return "Coming soon";
      default : 
        return "react ompi mukavaa";
    }
  }


  return (
    <div>
      <ViewhHandler/>
      
      <div className="TEST">
        {
          testList.map((item, index) => {
            return <div key={index}>{ item }</div>
          })
        }
      </div>
  
    </div>
  )
}

export default App;