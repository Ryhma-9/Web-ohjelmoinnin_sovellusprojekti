import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CitySelection from './components/CitySelection';
import RestaurantBrowser from './components/RestaurantBrowser';

function App() {


  const [ selectedCity, setSelectedCity ] = useState("");
  // Jotain alkeelista yritystä kaupungin valinnan hallintaan
  const citySelectHandler = (selection) => {
    console.log("CityHandler");
    if (selection === ""){
      setSelectedCity(selection);
      setView("CitySelection");
    }
    else{
      setSelectedCity(selection);
      setView("RestaurantBrowser");
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
  const [ view, setView ] = useState("CitySelection");  // Statehook, jolla asetellaan näkymä

  const ViewhHandler = () => {    // switchcase rakenne, josta haetaan asetetun näkymän react-komponentti
    switch (view) {
      case 'CitySelection' :    
        return <CitySelection onSelectClick={ citySelectHandler }/>;
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