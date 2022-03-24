import './App.css';
import { useEffect, useState } from 'react';
import RestaurantBrowser from './components/RestaurantBrowser';
import axios from 'axios';

function App() {

  

  // Testailua
  const restaurantsSelections = [];
  const restaurantSelectHandler = (restaurant) => {
    restaurantsSelections.push("Valitsit ravintolan " + restaurant.name);
    setTestList(restaurantsSelections);
    console.log(restaurantsSelections);
  }
  const [ testList, setTestList ] = useState([]);



  return (
    <div>
      <RestaurantBrowser onSelectClick={ restaurantSelectHandler }/>
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