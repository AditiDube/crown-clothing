import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
      const priceForStripe = price*100;
      const publishableKey = 'pk_test_51H0SWyArFXklRJhLbkrcqXS8jiQKJGPrBA3lQaoXRkXmHIRwbjWxGhUVhlcTf7o2olPYBdJdP4kJPh4mAGsQrSmV00YmJqs0aL';
       
      const onToken = token => {
          console.log(token);
          alert('Payment Successful!');

      }

      return(
          <StripeCheckout
           label='Pay Now'
           name='CROWN CLOTHING Ltd.'
           billingAddress
           shippingAddress
           image='https://svgshare.com/i/Cuz.svg'
           description={`Your total is  $${price}`}
           amount={priceForStripe}
           panelLabel='Pay Now'
           token={onToken}
           stripeKey={publishableKey}
          />
      )
  }

  export default StripeCheckoutButton;