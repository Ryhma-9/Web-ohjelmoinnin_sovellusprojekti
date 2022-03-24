import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCog, faSignInAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Header(props) {

  const [ searchBarText, setSearchBarText ] = useState("");
  const [ loggedIn, setLoggedIn ] = useState(false);    // Tää on vain kehistysvaiheen toiminnan testailuja varten

  const handleSearchBarTextChange = (event) => {
    setSearchBarText(event.target.value);
  }


  // Testailua. Yritys tulostaa jotenkin ostoskorin tuotteiden lukumäärää
  const [ test, setTest ] = useState(0);
  function setShoppingCartItemsNumber() {
    setTest(test+1);
    console.log(test);
  }
  

  return(
    <div className="stickyHeader flex ">
      <div className="logoContainer W230">
        <img className="logo" alt="LOGO PLACEHOLDER"  width="100%" src="placeholder.jpg"/>
      </div>
      <div>
        <div className="headerUpper flex ">
          <form className="menuElement"> 
            <div className="menuElement flex W700">
              <input className="searchBar" type="text" name="search" 
                onChange={ handleSearchBarTextChange } value={ searchBarText } placeholder="Search restaurants"
              />
              <button className="searchBarButton orangeBG" type="button" onClick={ ()=> props.onSearchButtonClick( searchBarText ) }>
                <FontAwesomeIcon icon={ faSearch } size="1x"/>
              </button>
            </div>
          </form> 
          <div className="menuElement W230 shoppingCart">
            <button className="shoppingCartButton" type="button" 
              onClick={ () => setShoppingCartItemsNumber() }>
                <span>Ostoskori <FontAwesomeIcon icon={ faShoppingCart }/> { test == 0 ? null : <span className="shoppinCartItems">{ test }</span> } </span>
            </button>
          </div>
          <div className="menuElement W230 adminMode">
            <button className="adminModeButton" type="button" 
              onClick={ () => setLoggedIn( !loggedIn ) }>
              { loggedIn === true ? 
                <span>Profiili <FontAwesomeIcon icon={ faCog }/></span> : 
                <span>Kirjaudu <FontAwesomeIcon icon={ faSignInAlt }/></span> 
              }
            </button>
          </div>
        </div>
        <div className="headerLower">
          <span>TÄHÄN JONKINLAINEN RAVINTOLATYYPPI PICKER</span>
        </div>
      </div> 
    </div>
  )
}

