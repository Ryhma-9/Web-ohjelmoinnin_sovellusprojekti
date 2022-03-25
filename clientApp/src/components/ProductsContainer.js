import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faGrinStars} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

export default function ProductsContainer(props) {

    const ratings = (props) => {
        var arr = [];
        for(let i = props.type=='Death Star' ? -1 : 0; i < props.rating ; i++) { 
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

    const specialInfoImg = (item) => {
        if(item != ''){
          switch (item) {
            case 'bestseller' : return props.addImage( 'bestseller.jpg', '35%', 'bestseller.jpg' );
            case 'limited'  : return props.addImage( 'limited.jpg', '30%', 'limited.jpg' );
            case 'sale'   : return props.addImage( 'sale.jpg', '30%', 'sale.jpg' );
            default : console.log("unknown additionals tag")
          }
        }
    }

    function thousandSeparator(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

  return (
    <div className="flex wrapContainer">
        {
            props.products.map((item, index) => {
              return( 
                <div className="productInfoContainer" key={index}>
                  <div className="specialInfo">
                    { specialInfoImg(item.additionals) }
                  </div>
                  <div className="productImg menuElement">
                    { props.addImage( item.img, '100%', item.img ) }
                  </div>
                  <div><h2> { item.type } </h2></div>
                  { item.type.includes('Pre-order') ? <h4>{ item.additionals }</h4> : null}
                  <div><h3> { item.brand } </h3></div>
                  { ratings(item) } 
                  <div>
                    { item.additionals=='sale' ? <h3><del>{ thousandSeparator(item.price) } €</del> &nbsp;{ thousandSeparator(item.price*0.5) } €</h3> :
                    <h3> { thousandSeparator(item.price) } € </h3> }
                    { item.type == 'Death Star' ? <h4>or your soul to the dark side</h4> : null } 
                  </div>
                </div>
              )
            })
        } 
    </div>
  )
}

