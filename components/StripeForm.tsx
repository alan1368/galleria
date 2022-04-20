import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import commerce from '../lib/commerce'
import { useCartState } from '../context/cart'

export default function StripeForm({
  checkoutToken,
  shippingData,
  nextStep,
}: any) {
  const { id } = checkoutToken
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const card = elements?.getElement(CardElement)

    // Create a payment method using the card element on the page
    const paymentMethodResponse = await stripe?.createPaymentMethod({
      type: 'card',
      card: card,
    })

    if (paymentMethodResponse?.error) {
      // There was some issue with the information that the customer entered into the payment details form.
      alert(paymentMethodResponse.error.message)
      return
    }
    if (!stripe || !elements) {
      return
    }

    try {
      // Use a checkout token ID generated that was generated earlier, and any order details that may have been collected
      // on this page. Note that Commerce.'js checkout tokens may already have all the information saved against them to
      // capture an order, so this extra detail may be optional.
      const order = await commerce.checkout.capture(id, {
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: shippingData.firstName + ' ' + shippingData.lastName,
          street: shippingData.address,
          town_city: shippingData.town,
          //county_state: shippingData.country + '-' + shippingData.subdivision,
          postal_zip_code: shippingData.postCode,
          country: shippingData.country,
        },
        fulfillment: {
          shipping_method: 'ship_nPEVlN03zoa7dM',
        },
        // Include Stripe payment method ID:
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethodResponse?.paymentMethod.id,
          },
        },
      })
      // If we get here, the order has been successfully captured and the order detail is part of the `order` variable
      nextStep()
      commerce.cart.refresh()

      return
    } catch (response) {
      // There was an issue with capturing the order with Commerce.js
      if (response instanceof Error) {
        alert(response.message)
      }
      return
    } finally {
      // Any loading state can be removed here.
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement className="my-5 h-8 bg-slate-200 p-5" />
        <button className="md:col-start-0 h-12 w-full rounded-sm bg-buttonColor text-slate-100 hover:bg-buttonColorHover">
          Pay
        </button>
      </form>
    </div>
  )
}
