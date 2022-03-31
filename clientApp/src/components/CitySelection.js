import React from 'react'
import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';


export default function CitySelection(props) {

  const citys = [         // Hardkoodattu muutama kaupunki kehistysvaiheen toiminnan testailuja varten
    { 
      city : "Oulu"
    },
    { 
      city : "Tampesteri"
    },
    { 
      city : "Hulsinki"
    },
    { 
      city : "Hoopovesi"
    },
    { 
      city : "Utsjoki"
    },
    { 
      city : "Turku"
    },
    { 
      city : "Kempele"
    },
    { 
      city : "Lumijoki"
    },
    { 
      city : "Kemi"
    },
    { 
      city : "Vantaa"
    },
    { 
      city : "Espoo"
    },
    { 
      city : "Mikkeli"
    },
    { 
      city : "Jyväskylä"
    },
    { 
      city : "Kärsämäki"
    },
  ];

  const [ cityList, setCityList ] = useState([]);   // Tässä hallitaan näytettävät kaupungit

  // Näkymän ensimäisen renderöinnin yhteydessä haetaan kaikki kaupungit, joissa on ravintoloita ja tallennetaan ne useState-hookkiin
  useEffect(() => {
    getData().then(setCityList);
  }, [] );

  // Funktiolla tullaan hakemaan tietokannasta kaupungit. Testivaiheessa palauttaa hardkkoodatut tiedot
  async function getData() {
    //const results = await axios.get('http://rajapinnanOsoite/');
    return citys;
  }

  // Hakutoiminnon eventhandler-funktio
  const searchHandler = (searchBarText) => {
    getData().then( function(res){ setCityList( searchEngine(res,searchBarText) ) });
  }

  // Hakufunktio, jolla haetaan siihen syötetyn tietueen oliot, joiden arvoista löytyy annettu hakusana
  const searchEngine = (citys, searchArgument) => {
    var search = searchArgument.toString().toLowerCase().trim();
    var searchResult = citys.filter(item => {
      return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search));
    });
    return searchResult;
  }

  // Funktio, jolla voi luoda random rgb-värin. Kunhan huviksi värkkäilin ja lisäsin muotoilun, joka arpoo jokaiselle kaupunkiboksille eri värin
  function randomColor() {
    let r = Math.round((Math.random() * 255));
    let g = Math.round((Math.random() * 255));
    let b = Math.round((Math.random() * 255));
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }


  return (
    <div>
      <Header onSearchButtonClick={ searchHandler } logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ props.headerButtons }/>
      <div className="marginT120 flex cityBoxContainer">
        { 
          cityList.map((item, index) => {
            return ( 
              <div className="citySelectionBox" style={{ backgroundColor: randomColor() }} key={index} onClick={ ()=> props.onSelectClick(item.city) }>
                <h2 className="marginT40p">{ item.city }</h2>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
