import React from 'react'
import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faGrinStars} from '@fortawesome/free-solid-svg-icons'
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
      type : 'hamburger',
      productImg : "https://media-cdn.tripadvisor.com/media/photo-s/1a/bd/74/6e/los-pollos-hermanos-crispy.jpg",
      },
      {
        productId : 2,
        productName : 'Icy suprice',
        price : 150,
        allergens : "",
        type : 'extras',
        productImg : 'https://thumbs.worthpoint.com/zoom/images1/360/0113/21/breaking-bad-los-pollos-hermanos-blue_360_0ad84c41f5a381921f08c3f642f04854.jpg',
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
      type : 'Main dish',
      productImg : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2VQz9ZEG3DJiOOhpdyHy4dMUhqSzLKgZgKicvmZbcrEtGsv9k8YIcDgVLIfx_tKSMuo&usqp=CAU',
      },
      {
        productId : 2,
        productName : 'Pieni ja kallis annos kalaa',
        price : 120,
        allergens : 2,
        type : 'Main dish',
        productImg : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1JzT_6RR8fL9U5y-FuTcZn5v5UMi0ZThWHjoj2CkmkGXV34Ixm36WWV9I953TBDkEBm8&usqp=CAU',
      },
    ]
  },
];

  const [ restaurantList, setRestaurantList ] = useState(restaurants);


  // Hakutoiminnon eventhandler-funktio. Funktiolla tällä hetkellä päivitetään hardkoodatuista ravintoloista suoritettu haku headerin hakukenttään annetun teksin perusteella
  const searchHandler = (searchBarText) => {
    setRestaurantList(searchEngine(restaurants, searchBarText));
  }

  // Hakufunktio, jolla haetaan siihen syötetyn tietueen oliot, joiden arvoista löytyy annettu hakusana
  const searchEngine = (restaurants, searchArgument) => {
    var search = searchArgument.search.toString().toLowerCase().trim();
    var searchResult = restaurants.filter(item => {
      return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search));
    });
    return searchResult;
  }

  // Funktiolla luodaan visuaalinen tähtiarvio 0 - 5 tähteä. Funtio tulostaa olion rating-arvon verran täysiä tähtiä ja 5-rating tyhjiä tähtiä
  const ratings = (props) => {
    var arr = [];
    for(let i = 0; i < props.rating ; i++) { 
      arr.push(<div> <FontAwesomeIcon icon={ faStar } />&nbsp;</div>);
    }; 
    for(let i = 0; i < 5 - props.rating; i++) {
      arr.push(<div> <FontAwesomeIcon icon={ farStar } />&nbsp;</div>);
    };
    return(
      <div className="flex orange review">
        { 
          arr.map((item) => { return item })
        }
      </div>
    )
  }


  return (
    <div>
      <Header onSearchButtonClick={ searchHandler }/>
      <div className="marginT120">
        {
          restaurantList.map((item, index) => {
            return( 
              <div className="restaurantInfoContainer flex" key={index} onClick={ ()=> props.onSelectClick(item) } >
                <div className="restaurantImg">
                  <img alt={ item.name } width="100%" src={ item.restaurantImg }/>
                </div>
                <div className="restaurantInfo">
                  <div className="restaurantMainInfo flex">
                    <span>{ item.name }</span>
                    <span>{ item.style }</span>
                  </div>
                  <div className="restaurantAdditionalInfo flex">
                    <span>{ item.priceRange }</span>
                    <span>PLACEHOLDER, tähän pitäs väsätä toimutusaika-arvio</span>
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
