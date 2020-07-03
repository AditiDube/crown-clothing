import React from 'react';

import './checkout.styles.scss';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';


const CheckoutPage = ({ checkoutItems, total }) => {
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

      <StripeCheckoutButton price={total} />

      <div className="checkout-info">
        <div className="info-title">*Please use the following test credit card for payments*</div>
        <div>
          <span>Card: 4242 4242 4242 4242</span>
          <span>Exp date: post current date</span>
          <span>CVV: 123</span>
        </div>
      </div>
    </div>
  )
}


const mapStatsToProps = createStructuredSelector({
  checkoutItems: selectCartItems,
  total: selectCartTotal
})

export default connect(mapStatsToProps)(CheckoutPage);