import React from 'react'
import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'


export default function RestaurantBrowser(props) {

  const restaurants = [         // Hardkoodattu pari ravintolaa kehistysvaiheen toiminnan testailuja varten
  { 
    restaurantId : 1,
    name: 'Los Pollos Hermanos',
    restaurantAddress: 'Kirkkokatu 14, 90100 Oulu',
    email: "orders@pollos.com",
    phoneNumber: '123123123',
    style: 'Fastfood',
    priceRange: '€€',
    rating: 5,
    restaurantImg: 'https://muropaketti.com/dome/wp-content/uploads/images/domefi/viihde/ajankohtaista/2015/ZZ2D326A3E.jpg',
    menu: [
      {
        productId : 1,
        productName : "Gustavo's chicken",
        price : 12.5,
        allergens : 1,
        ingredients : "",
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        type : 'Main dish',
        productImg : "https://media-cdn.tripadvisor.com/media/photo-s/1a/bd/74/6e/los-pollos-hermanos-crispy.jpg",
      },
      {
        productId : 2,
        productName : 'Icy suprice',
        price : 150,
        allergens : "",
        ingredients : "",
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        type : 'extras',
        productImg : 'http://thx-trailer.com/replica/Breaking_bad/los2.jpg',
      },
      {
        productId : 3,
        productName : "Wings'n chips",
        price : 15,
        allergens : "1",
        ingredients : "",
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        type : 'appetizer',
        productImg : 'http://nerdist.com/wp-content/uploads/2015/05/Los-Pollos-Hermanos-chicken-by-Geek-Plate-05022015.jpg',
      },
      {
        productId : 4,
        productName : 'Illegally good Cupcace',
        price : 5,
        allergens : "2",
        ingredients : "",
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        type : 'dessert',
        productImg : 'http://nerdist.com/wp-content/uploads/2015/05/Breaking-Bad-Cupcake-by-Semi-Sweet-Mike-05022015.jpg',
      },
    ]
  },
  { 
    restaurantId : 2,
    name: 'Uleåborg 1881',
    restaurantAddress: 'Aittatori 4-5, 90100 Oulu',
    email: "",
    phoneNumber: '088811188',
    style: 'Fine dining',
    priceRange: '€€€€',
    rating: 4,
    restaurantImg: 'https://media-cdn.tripadvisor.com/media/photo-s/05/90/b8/b4/ravintola-uleaborg-1881.jpg',
    menu: [
      {
        productId : 1,
        productName : 'Pieni ja kallis annos lihaa',
        price : 100,
        allergens : 1, 
        ingredients : "Wagyū beef",
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        type : 'Main dish',
        productImg : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2VQz9ZEG3DJiOOhpdyHy4dMUhqSzLKgZgKicvmZbcrEtGsv9k8YIcDgVLIfx_tKSMuo&usqp=CAU',
      },
      {
        productId : 2,
        productName : 'Pieni ja kallis annos kalaa',
        price : 120,
        allergens : 2,
        ingredients : "potatoes, fish and something else",
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        type : 'Main dish',
        productImg : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1JzT_6RR8fL9U5y-FuTcZn5v5UMi0ZThWHjoj2CkmkGXV34Ixm36WWV9I953TBDkEBm8&usqp=CAU',
      },
    ]
    },
  ];

  let selectedCity = props.city;
  const [ restaurantList, setRestaurantList ] = useState([]);   // Tähän asetetaan näytölle tulostettavat ravintolat
  const [ restauranStyle, setRestauranStyle ] = useState([]);   // Tähän asetetaan käyttäjän tekemä ravintolatyyppi filtteröinti

  // Näkymän ensimäisen renderöinnin yhteydessä haetaan valitun kaupungin ravintolat ja tallennetaan ne useState-hookkiin
  useEffect(() => {
    getData().then(setRestaurantList);
    getData().then(listStyles);
  }, [] );

  // Funktiolla tullaan hakemaan tietokannasta valitun kaupungin ravintolat. Testivaiheessa palauttaa hardkkoodatut ravintolat
  async function getData() {
    //const results = await axios.get('http://rajapinnanOsoite/'+selectedCity);
    return restaurants;
  }

  // Listataan ravintoloiden tyypit
  function listStyles(restaurants) {
    var restauranStyleList = [];
    restaurants.map((item) => {
      return restauranStyleList.includes(item.style) ? null : restauranStyleList.push(item.style)
    });
    setRestauranStyle(restauranStyleList);
  }

  // Hakutoiminnon eventhandler-funktio. Funktiolla tällä hetkellä päivitetään hardkoodatuista ravintoloista suoritettu haku headerin hakukenttään annetun teksin perusteella
  const searchHandler = (searchBarText) => {
    getData().then( function(res){ setRestaurantList( searchEngine(res,searchBarText) ) });
  }

  // Hakufunktio, jolla haetaan siihen syötetyn tietueen oliot, joiden arvoista löytyy annettu hakusana
  const searchEngine = (restaurants, searchArgument) => {
    var search = searchArgument.toString().toLowerCase().trim();
    var searchResult = restaurants.filter(item => {
      return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search));
    });
    return searchResult;
  }

  // Funktiolla luodaan visuaalinen tähtiarvio 0 - 5 tähteä. Funtio tulostaa olion rating-arvon verran täysiä tähtiä ja 5-rating tyhjiä tähtiä
  const ratings = (props) => {
    var rating = [];
    for (let i = 0; i < props.rating ; i++) { 
      rating.push(<div> <FontAwesomeIcon icon={ faStar }/>&nbsp;</div>);
    }; 
    for (let i = 0; i < 5 - props.rating; i++) {
      rating.push(<div> <FontAwesomeIcon icon={ farStar }/>&nbsp;</div>);
    };
    return (
      <div className="flex orange review">
        { rating }
      </div>
    )
  }


  // Testailua kaupungin valinnan poistoon
  const removeSelection = () => {
    props.unSelectCity("");
  }


  // Funktiolla lisätään headeriin kaupungin valinnan postonappi sekä napit ravintolatyylifiltteröintiin
  const manageHeaderContent = (props) => {
    // Luodaan napit filtteröintiin ja sen poistoon
    function manageRestaurantStyleButtons() {
      if ( restauranStyle.length === 1) {
        return ( 
          <button className="styleButton" type="button" onClick={ ()=> getData().then(listStyles) }>
            <span>{ restauranStyle[0] } <FontAwesomeIcon style={{ color: 'crimson' }} icon={ faXmark }/></span>
          </button>
        )
      }
      else {
        return restauranStyle.map((item, index) => {
          return (
            <button className="styleButton" type="button" key={index} onClick={ ()=> setRestauranStyle([item]) }>
              <span>{ item }</span>
            </button>
          )
        });
      }
    }

    return (
      <div className="flex">
        <button className="cityButton" type="button" onClick={ ()=> removeSelection("") }>
          <span>{ selectedCity } <FontAwesomeIcon style={{ color: 'crimson' }} icon={ faXmark }/></span>
        </button>
        <div className="restaurantStyleButtons flex">
          { manageRestaurantStyleButtons() }
        </div>
      </div>
    )
  }


  return (
    <div>
      <Header onSearchButtonClick={ searchHandler } addContentToHeader={ manageHeaderContent }/>
      <div className="marginT120">
        { // Ravintoloiden listauksen mappauksen yhteyteen on lisätty ravintolatyylifiltteröinti
          restaurantList.filter(item => item.style.includes(restauranStyle.length === 1 ? restauranStyle : "")).map((item, index) => {
            return( 
              <div className="restaurantInfoContainer flex" key={index} onClick={ ()=> props.onSelectClick(item) } >
                <div className="restaurantImg">
                  <img alt={ item.name } width="100%" src={ item.restaurantImg }/>
                </div>
                <div className="restaurantInfo">
                  <div className="restaurantMainInfo flex">
                  <div><h2>{ item.name }</h2></div>
                    <div><h3>{ item.style }</h3></div>
                  </div>
                  <div className="restaurantAdditionalInfo flex">
                    <div><span>{ item.priceRange }</span></div>
                    <div><span>PLACEHOLDER, toimitusaika</span></div>
                    { ratings(item) }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
