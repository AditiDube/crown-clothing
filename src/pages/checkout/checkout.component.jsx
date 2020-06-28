import React from 'react';

import './checkout.styles.scss';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const CheckoutPage = ({checkoutItems, total}) =>{
    return (
    <div className="checkout-page">
      <div className="checkout-header">
       <div className="header-block">
         <span>Product</span>
       </div>
       <div className="header-block">
         <span>Description</span>
       </div>
       <div className="header-block">
         <span>Quantitiy</span>
       </div>
       <div className="header-block">
         <span>Price</span>
       </div>
       <div className="header-block">
         <span>Remove</span>
       </div>
      </div>
      {
        checkoutItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
        ))
      }

      <div className="total">
        <span>TOTAL: ${total}</span>
      </div>
    </div>
)}


const mapStatsToProps = createStructuredSelector({
    checkoutItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStatsToProps)(CheckoutPage);