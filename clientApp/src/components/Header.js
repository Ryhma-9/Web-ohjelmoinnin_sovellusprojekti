import React from 'react';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCog, faSignInAlt, faSignOutAlt, faShoppingCart, faUser, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Link } from 'react-router-dom'


export default function Header(props) {

  // Hakukentän tekstin hallinta
  const [ searchBarText, setSearchBarText ] = useState("");   
  const handleSearchBarTextChange = (event) => {
    setSearchBarText(event.target.value);
  }

  // Tällä funktiolla haetaan ostoskorin tuotteet ja lasketaan tuotteiden lukumäärä
  function itemsInCart() {

    // let cartItems = [];
    // cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    // let sum = cartItems.length;
    // props.shoppingCartItems.forEach(function(item){
    //   sum += item.qty;
    // });
    // console.log(sum);
    // return sum;
  }

  // console.log(props.isCitySelected);
  // console.log(props.isRestaurantSelected);

  
  sessionStorage.setItem('selectedCity', props.isCitySelected);
  sessionStorage.setItem('selectedRestaurant', props.isRestaurantSelected);

  

  const [ dropDownMenu, setDropDownMenu ] = useState(false);  // Tällä ohjataan profiilialasvetovalikon näkyvyyttä
  const DropDownMenu = () => {    // En osannu käyttää valmiita kirjastoja / ne jotka sain toimaan oli kökköjä niin tässä ite värkätty alavetovalikko
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
        <Link to="/" /* onClick={sessionStorage.clear} */>
          <img className="logo" alt="LOGO PLACEHOLDER"  width="100%" src="placeholder.jpg"/>
          </Link>
      </div>
      <div>
        <div className="headerUpper flex ">
          { props.onSearchButtonClick ? 
            <form className="menuElement"> 
              <div className="menuElement flex W700">
                <input className="searchBar" type="text" name="search" 
                  onChange={ handleSearchBarTextChange } value={ searchBarText } placeholder="Search"
                />
                <button className="searchBarButton orangeBG" type="button" onClick={ ()=> props.onSearchButtonClick(searchBarText) }>
                  <FontAwesomeIcon icon={ faSearch } size="1x"/>
                </button>
              </div>
            </form> : null
          }   
          <div className="menuElement W230 shoppingCart">
            <Link to="/shoppingcart" ><button className="shoppingCartButton" type="button" 
              /* onClick={ ()=> props.passShoppingCartToApp ? [props.passShoppingCartToApp(), props.onHeaderButtonClick("ShopingCart")] : props.onHeaderButtonClick("ShopingCart") } */>
                <span>Shoping Cart <FontAwesomeIcon icon={ faShoppingCart }/>{ itemsInCart() > 0 && itemsInCart() !== null  ? 
                  <span className="shoppinCartItems">{ itemsInCart() }</span> 
                  : 
                  null }
                </span>   
            </button></Link>
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
          <div>
          {/* <button className='takaisinButton'>Takaisin</button> */}
          </div>
        </div>
        <div className="headerLower">
          <p>{sessionStorage.getItem('selectedCity')}</p>
          <p>{sessionStorage.getItem('selectedRestaurant')}</p>
          {/* <p>{ props.isCitySelected }</p>
          <p>{ props.isRestaurantSelected }</p> */}
          {/* <AddLowerHeaderContent city={props.isCitySelected}/* content={ props.addContentToHeader } */}
        </div>
      </div> 
    </div>
  )
}

