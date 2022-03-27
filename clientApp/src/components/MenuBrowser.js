import React from 'react'
import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBasketShopping } from '@fortawesome/free-solid-svg-icons'

export default function MenuBrowser(props) {

  let selectedCity = props.city;
  let selectedRestaurant = props.restaurant.name;
  let menuCategories = ['appetizer', 'main dish', 'dessert', 'drink', 'extras', 'other'];   // tuotekategoriat, jonka mukaan asettelu on rakennettu
  const [ categoryQty, setCategoryQty ] = useState(1);          // En varmaan vaan osaa, mut joutu tekemään tän Vakioannostyypien määrälle. categoryQty > 1 on tuotekategorioiden filtteröinti käytössä
  

  const [ menu, setMenu ] = useState([]);         // Tähän asetetaan näytölle tulostettavat annokset
  const [ menuCategory, setMenuCategory ] = useState([]);   // Ja tähän tuotekategoriat. Tätä käytetään myös tuotekategorioiden filtteröintiin  


  // Tuotteiden valinnan toimintojen hahmottelua
  const [ shoppingCartItems, setShoppingCartItems ] = useState([]);
  
  const shoppingCartTesting = (item) => { 
  let newShoppingCartItems = [...shoppingCartItems];
  let itemClickedIndex = newShoppingCartItems.findIndex(i => item.productId === i.productId)
  if(itemClickedIndex != -1){
    let newElement = {...newShoppingCartItems[itemClickedIndex]}
    newElement.qty += 1;
    newShoppingCartItems[itemClickedIndex] = newElement;
  }
  else{
    let newElement = [...newShoppingCartItems,
    {
      id : shoppingCartItems.length + 1,
      productId : item.productId,
      name : item.productName,
      price : item.price,
      qty : 1
    }]
    newShoppingCartItems = newElement;
  }
  setShoppingCartItems(newShoppingCartItems);

  console.log(item.productName + " added to cart");
  console.log(newShoppingCartItems);
}


  // Näkymän ensimäisen renderöinnin yhteydessä haetaan valitun ravintolan ruokalista ja tuotekategoriat ja tallennetaan ne useState-hookkeihin
  useEffect(() => {
    getData().then(setMenu);
    getData().then(listCategories).then(setMenuCategory);
    getData().then(listCategories).then((res) => {
      setCategoryQty(res.length);
    });
  }, [] );

  // Funktiolla tullaan hakemaan tietokannasta valitun ravintolan menu / tiedot. Testivaiheessa vähän oiotaan mutkia
  async function getData() {
    //const results = await axios.get('http://rajapinnanOsoite/'+props.restaurant.restaurantId);
    return props.restaurant.menu;
  }

  // Listataan menun tuotekategoriat
  function listCategories(data) {
    let menuCategoryList =[];
    let categoryList = new Set()
    data.map((item) => {
      return categoryList.add(item.type)
    });
    for (const x of categoryList.values()) {
      menuCategories.includes(x.toLowerCase()) ? menuCategoryList.push(x.toLowerCase()) : menuCategoryList.push('other');
    }
    return menuCategoryList;
  }


  // Funktiolla lisätään headeriin valintojen postonapit sekä napit menufilttereille
  const manageHeaderContent = (props) => {
    // Luodaan napit filtteröintiin ja sen poistoon
    function manageFilterButtons(){
      if (menuCategory.length === 1 &&  categoryQty > 1) {    
        return (
          <button className="styleButton" type="button" onClick={ ()=> getData().then(listCategories).then(setMenuCategory) }>
            <span>{ menuCategory[0] } <FontAwesomeIcon style={{ color: 'crimson' }} icon={ faXmark }/></span>
          </button>
        )
      }
      else if (menuCategory.length > 1 ||  categoryQty > 1) {
        return menuCategories.map((item, index) => {
          return menuCategory.includes(item) ? 
            <button className="styleButton" type="button" key={ index } onClick={ ()=> setMenuCategory( [item] ) }>
              <span>{ item }</span>
            </button> 
            :
            null;
        });
      }
    }
    return (
      <div className="flex">
        <button className="styleButton" type="button" onClick={ ()=> removeSelection("city") }>
          <span>{ selectedCity } <FontAwesomeIcon style={{ color: 'crimson' }} icon={ faXmark }/></span>
        </button>
        <button className="cityButton" type="button" onClick={ ()=> removeSelection("restaurant") }>
          <span>{ selectedRestaurant } <FontAwesomeIcon style={{ color: 'crimson' }} icon={ faXmark }/></span>
        </button>
        <div className="restaurantStyleButtons flex">
          { manageFilterButtons() }
        </div>
      </div>
    )
  }

  // Viritelmä valintojen poistoa varten
  const removeSelection = (item) => {
    switch (item) {
      case 'city' :    
        return props.unSelectCity("");
      case 'restaurant': 
        return props.unSelectRestaurant("");
      default : 
        return console.log("react ei ehkä ookkaan niin mukavaa");
    }
  }


  // Täällä tapahtuu itse ruokalistan käsittely ja "tulostaminen"
  const MenuItemHandler = () => {    

    const AddToShopingcart = (props) => {

      return (
        <div onClick={ ()=> shoppingCartTesting(props.productInfo) }>
          <h3> Add to Cart <FontAwesomeIcon icon={ faBasketShopping }/> </h3>
        </div>
      )
    }
    const AllergyInfo = (props) => {
      
      return (
        <div className="marginL200" onClick={ () => alert("G=Glutreeniton ja sitä rataa") }>
          <span>TÄHÄN ALLERGEENIT </span>
        </div>
      )
    }
    const ProductInfoButton = (props) => {
      
      return (
        <div className="marginL200">
          <span> JA TÄHÄN LISÄINFONAPPI</span>
        </div>
      )
    }


    return (
      menuCategories.map((category) => {
        return menuCategory.includes(category) ? 
          <div className="menuCategoryContainer">
            <div className="title"><h2>{ category.toUpperCase() }</h2></div>
            { 
              menu.map((item, index) => {
                return item.type.toLowerCase().includes(category) ? 
                  <div className="menuItemContainer flex" key={index} >
                    <div className="restaurantImg">
                      <img alt={ item.productName } width="100%" src={ item.productImg }/>
                    </div>
                    <div className="productInfo">
                      <div className="productMainInfo flex">
                        <div><h2>{ item.productName }</h2></div>
                        <div><p>{ item.description }</p></div>
                        <AddToShopingcart productInfo={ item }/>
                      </div>
                      <div className="productAdditionalInfo flex">
                        <div><h3>{ item.price  } €</h3></div>
                        <AllergyInfo productInfo={ item.allergens }/>
                        <ProductInfoButton productInfo={ item.ingredients }/>
                      </div>
                    </div>
                  </div>:null
              })
            }
          </div>:null
      })
    )    
  }





  return (
    <div>
      <Header addContentToHeader={ manageHeaderContent } shoppingCartItems={ shoppingCartItems }/>
      <div className="marginT120">
        <MenuItemHandler/>
      </div>
    </div>
  )
}
