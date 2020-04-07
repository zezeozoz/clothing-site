import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
   const priceForStripe = price*100;
   const publishKey = 'pk_test_Hus59wcZxLEH8EiPHadwYGh5002wAIBivC';

   const onToken = token => {
      console.log(token);
      alert('Payment Successful')
   }
   return (
      <StripeCheckout
         label='Pay Now'
         name='Voltran Clothing Co.'
         billingAddress
         shippingAddress
         image='https://sendeyo.com/up/d/f3eb2117da'
         description={`Your total is $${price}`}
         amount={priceForStripe}
         panelLavel='Pay Now'
         token={onToken}
         stripeKey={publishKey}
      />
   )
}

export default StripeCheckoutButton;