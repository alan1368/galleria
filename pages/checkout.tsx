import React, { useState, useEffect } from 'react'
import commerce from '../lib/commerce'
import { useCartState } from '../context/cart'
import AddressForm from '../components/AddressForm'
import PaymentForm from '../components/PaymentForm'
import ConfirmationPage from '../components/ConfirmationPage'
const steps = ['Shipping', 'Payment']

export default function checkout() {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState({})
  const [shippingData, setShippingData] = useState({})
  const cart = useCartState()
  const nextStep = () => setActiveStep((prevStep) => prevStep + 1)
  const backStep = () => setActiveStep((prevStep) => prevStep - 1)
  const storeData = (data: object) => {
    setShippingData(data)
    nextStep()
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} storeData={storeData} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        nextStep={nextStep}
      />
    )

  //generating a token form cart
  const generateToken = async () => {
    try {
      await commerce.checkout
        .generateTokenFrom('cart', cart?.id)
        .then((response) => {
          setCheckoutToken(response)
        })
    } catch (err) {
      console.log('generateToken', err)
    }
  }

  useEffect(() => {
    if (cart.id) {
      generateToken()
    }
  }, [cart])

  return (
    <div>{activeStep === steps.length ? <ConfirmationPage /> : <Form />}</div>
  )
}
