import React from 'react';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCog, faSignInAlt, faSignOutAlt, faShoppingCart, faUser, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import axios from 'axios';


export default function Header(props) {

  // Hakukentän tekstin hallinta
  const [ searchBarText, setSearchBarText ] = useState("");   
  const handleSearchBarTextChange = (event) => {
    setSearchBarText(event.target.value);
  }

  const [ dropDownMenu, setDropDownMenu ] = useState(false);  // Tää on vain kehistysvaiheen toiminnan testailuja varten

  // Testailua. Yritys tulostaa jotenkin ostoskorin tuotteiden lukumäärää
  // Tää on vaa tämmönen turha näkymän testailu
  const [ test, setTest ] = useState(0);

  // Tällä funktiolla haetaan ostoskorin tuotteet ja lasketaan tuotteiden lukumäärä
  function itemsInCart() {
    let sum = 0;
    props.shoppingCartItems.forEach(function(item){
      sum += item.qty;
    });
    return sum;
  }


  // Hallitaan näkymien headeriin asettamaa sisältöä
  const AddLowerHeaderContent = (props) => {
    return (
      props.content ? props.content() :  null
    )
  }

  const DropDownMenu = () => {
    // En osannu käyttää valmiita kirjastoja / ne jotka sain toimaan oli kökköjä niin tässä ite värkätty alavetovalikko
    return (
      <div className="dropdown">
        <a>Logged in as:</a>
        <a>{ props.logIn }</a>
        <button onClick={ () => props.onHeaderButtonClick("EditProfile") }><span>Edit Profile <FontAwesomeIcon icon={ faCog }/></span></button>
        <button onClick={ () => alert("Painoit hauskaa nappia") }>Jokin hauska nappi</button>
        <button onClick={ ()=> [props.logOut(""), setDropDownMenu(!dropDownMenu)] }><span>Logout <FontAwesomeIcon icon={ faSignOutAlt }/></span></button>
      </div>
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
            <button className="shoppingCartButton" type="button" 
            onClick={ ()=> props.passShoppingCartToApp ? [props.passShoppingCartToApp(), props.onHeaderButtonClick("ShopingCart")] : props.onHeaderButtonClick("ShopingCart") }>
                <span>Shoping Cart <FontAwesomeIcon icon={ faShoppingCart }/>{ props.shoppingCartItems && props.shoppingCartItems.length > 0 ? 
                  <span className="shoppinCartItems">{ itemsInCart() }</span> 
                  : 
                  test == 0 ? null : <span className="shoppinCartItems">{ test }</span> /*Tää on vaan testailua varten ja itse asiassa jo nyt joutaisi poistaa*/ }
                </span>   
            </button>
          </div>
          <div className="menuElement W230 profile">
            { props.logIn !== "" ?         // Renderöidään kirjaudupainike, jos käyttäjä on kirjautunut renderöidään profiilipainike
              <button className="profileButton" type="button" 
                onClick={ () => setDropDownMenu(!dropDownMenu) }>
                <span>Profile <FontAwesomeIcon icon={ faUser }/> < FontAwesomeIcon icon={ dropDownMenu ? faAngleUp : faAngleDown }/> </span>
              </button> 
              : 
              <button className="logInButton" type="button" 
                onClick={ () => props.onHeaderButtonClick("LogIn") }>
                <span>Log In <FontAwesomeIcon icon={ faSignInAlt }/></span> 
              </button>
            }
            { dropDownMenu === true ?      // Jotakin hahmotelmaa valikolle, joka avautuu käyttäjän ollessa kirjautuneena ja kun klikataan profiilipainiketta
              <DropDownMenu/>
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

