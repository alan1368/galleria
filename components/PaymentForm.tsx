import { useState } from 'react'
import { useCartState } from '../context/cart'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripeForm from './StripeForm'

export default function PaymentForm({
  shippingData,
  checkoutToken,
  nextStep,
}: any) {
  const { line_items, subtotal, total_items } = useCartState()

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )

  return (
    <div className="w-7xl mx-auto grid max-w-7xl grid-cols-1 gap-x-10 px-5 tracking-wider text-slate-600 md:grid-cols-[2fr_1fr]">
      <div className="w-full md:w-full">
        <div className="flex h-12 items-center bg-slate-400 pl-5">
          <h2>Payment</h2>
        </div>
        <div>
          {line_items.map((item: any) => (
            <div className="my-5 px-5" key={item.id}>
              <div className="flex justify-between text-sm">
                <p>{item.product_name}</p>
                <p>{item.line_total.formatted}</p>
              </div>
              <p className="text-xs text-gray-300">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
        <div>
          <Elements stripe={stripePromise}>
            <StripeForm
              checkoutToken={checkoutToken}
              shippingData={shippingData}
              nextStep={nextStep}
            />
          </Elements>
        </div>
      </div>
      <div className="hidden space-y-5 md:block">
        <div className="flex h-12 items-center bg-slate-200 px-5">
          <h2>Order summary</h2>
        </div>
        <div className="space-y-5 px-5">
          <div className="flex justify-between">
            <p>Products </p>
            <p>{subtotal?.formatted}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery costs</p>
            <p>Free</p>
          </div>
        </div>
        <div className="flex h-12 items-center justify-between bg-slate-200 px-5">
          <p>Total</p>
          <p>{total_items} items</p>
          <p>{subtotal?.formatted}</p>
        </div>
      </div>
    </div>
  )
}
