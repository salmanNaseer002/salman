import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import './Card.css'
import Timer from './Timer';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined,
  wishlist
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-1">
          <button className="btn  mt-2 mb-2 card-btn-1 Card-viewButton border-rounded" ><span className="text-small">Preview</span> <i  className="ml-1 far fa-eye small eye"></i></button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} style = {{ border :"0.1px solid yellowGreen" ,borderRadius:"2px", marginRight:"-10px"}} className="btn  mt-2 mb-2 card-btn-1 Card-addCart ">
         <i  className="fas fa-shopping-cart "></i>
        </button>
      )
    );
  };

 

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

 
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2 "
        >
          Remove Product
        </button>
      )
    );
  };
  

  const showPriceAs = (saleField, preprice, p) => {
    if(saleField){
      return <p style = {{marginBottom : '1px',color :'#454545'}} className="card-p "><span style = {{fontWeight : 'bold',fontSize : '25px',color:"yellowgreen"}}> <span style={{textDecoration: 'line-through '}}>${preprice}</span> ${p}</span></p>
    }else{
      return <p style = {{marginBottom : '1px',color :'#454545'}} className="card-p "><span style = {{fontWeight : 'bold',fontSize : '25px',color:"yellowgreen"}}>${p}</span></p>
    }
  }

  let margin = wishlist?'Margin-zero': 'Margin-bottom';
  
  return (
    <div className={margin}>

      
    <div className = "card">
       
       <div className="card-body" style ={{alignItems : 'center',alignContent:'center',padding : '0px' }}>
         {shouldRedirect(redirect)}
         
         <div style ={{backgroundColor : '#fafafa',padding : '0.4px'}}>
 
         <div >
         <ShowImage  item={product} url="product" />
         </div>
         <Link to={`/product/${product._id}`}   style={{ color: '#454545' }}>
         <div style = {{height : '50px'}} className = 'Card-header mt-2'><span className="ml-3 " style = {{ color :'#4D4D4D',fontSize:"18px"}}>{product.name}</span></div>
         </Link>
         </div>
        
 
         <div style ={{padding : '10px'}} className="ml-2">
         
         <p style = {{marginBottom : '1px',color :'#454545'}} className="card-p "><span style = {{fontWeight : 'bold',fontSize : '25px',color:"yellowgreen"}}>{showPriceAs(product.isSale, product.preprice, product.price)}</span></p>
         <p style = {{marginBottom : '0px',color :'#454545',fontSize : '15px',fontWeight:"500"}}><span style = {{fontWeight : 'bold',fontSize : '15px'}}>Category : </span> {product.category && product.category.name}</p>
 
         <p style = {{marginBottom : '0px',color :'#454545' ,fontSize : '15px',fontWeight:"450"}}><span style = {{fontWeight : 'bold',fontSize : '15px'}}>Added on : </span>{moment(product.createdAt).fromNow()}</p>
         <p style = {{marginBottom : '1px',color :'#454545'}} className="card-p "><span style = {{fontWeight : 'bold',fontSize : '15px',color:"black"}}>Sales: {product.sold}</span></p>
        </div>
        
     <div className = 'Buttons'>
         {showViewButton(showViewProductButton)}
 
         {showAddToCartBtn(showAddToCartButton)}
 
         {showRemoveButton(showRemoveProductButton)}
         </div>
         
       </div>
     </div>
    </div>
  );
};

export default Card;