import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCog, faSignInAlt, faSignOutAlt, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';

export default function Header(props) {

  // Hakukentän tekstin hallinta
  const [ searchBarText, setSearchBarText ] = useState("");   
  const handleSearchBarTextChange = (event) => {
    setSearchBarText(event.target.value);
  }


  const [ loggedIn, setLoggedIn ] = useState(false);          // Tää on vain kehistysvaiheen toiminnan testailuja varten
  const [ dropDownMenu, setDropDownMenu ] = useState(false);  // Tää on vain kehistysvaiheen toiminnan testailuja varten

  // Testailua. Yritys tulostaa jotenkin ostoskorin tuotteiden lukumäärää
  const [ test, setTest ] = useState(0);
  function setShoppingCartItemsNumber() {
    setTest(test + 1);
  }
  function itemsInCart() {
    let sum = 0;
    console.log("terve")
    props.shoppingCartItems.forEach(function(item){
      sum += item.qty;
    });
    console.log(sum)
    return sum;
  }


  // Hallitaan näkymien headeriin asettamaa sisältöä
  const AddLowerHeaderContent = (props) => {
    
    return (
      props.content ? props.content() :  null
    )
  }


  return (
    <div className="stickyHeader flex ">
      <div className="logoContainer W230">
        <img className="logo" alt="LOGO PLACEHOLDER"  width="100%" src="placeholder.jpg"/>
      </div>
      <div>
        <div className="headerUpper flex ">
          <form className="menuElement"> 
            <div className="menuElement flex W700">
              <input className="searchBar" type="text" name="search" 
                onChange={ handleSearchBarTextChange } value={ searchBarText } placeholder="Search"
              />
              <button className="searchBarButton orangeBG" type="button" onClick={ ()=> props.onSearchButtonClick(searchBarText) }>
                <FontAwesomeIcon icon={ faSearch } size="1x"/>
              </button>
            </div>
          </form> 
          <div className="menuElement W230 shoppingCart">
            <button className="shoppingCartButton" type="button" onClick={ () => setShoppingCartItemsNumber() }>
                <span>Ostoskori <FontAwesomeIcon icon={ faShoppingCart }/>{ props.shoppingCartItems && props.shoppingCartItems.length > 0 ? <span className="shoppinCartItems">{ itemsInCart() }</span> : test == 0 ? null : <span className="shoppinCartItems">{ test }</span> }</span>
            </button>
          </div>
          <div className="menuElement W230 profile">
            { loggedIn === true ?         // Renderöidään kirjaudupainike, jos käyttäjä on kirjautunut renderöidään profiilipainike
              <button className="profileButton" type="button" 
                onClick={ () => setDropDownMenu(!dropDownMenu) }>
                <span>Profiili <FontAwesomeIcon icon={ faUser }/></span>
              </button> 
              : 
              <button className="logInButton" type="button" 
                onClick={ () => setLoggedIn(!loggedIn) }>
                <span>Kirjaudu <FontAwesomeIcon icon={ faSignInAlt }/></span> 
              </button>
            }
            { dropDownMenu == true ?      // Jotakin hahmotelmaa valikolle, joka avautuu käyttäjän ollessa kirjautuneena ja kun klikataan profiilipainiketta
              <div className="dropdown">
                <button className="" type="button"><span>Avaa profiili <FontAwesomeIcon icon={ faCog }/></span> </button>
                <button className="" type="button" 
                  onClick={ () => [ setLoggedIn(!loggedIn), setDropDownMenu(!dropDownMenu) ] }>
                  <span>Kirjaudu ulos <FontAwesomeIcon icon={ faSignOutAlt }/></span> 
                </button>
              </div> 
              : 
              null
            }
          </div>
        </div>
        <div className="headerLower">
          <AddLowerHeaderContent content={ props.addContentToHeader }/>
        </div>
      </div> 
    </div>
  )
}

