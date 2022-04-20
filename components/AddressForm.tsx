import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import commerce from '../lib/commerce'

import { useForm } from 'react-hook-form'

export default function AddressForm({ checkoutToken, storeData }: any) {
  const { id } = checkoutToken
  const [shippingCountries, setShippingCountries] = useState({})
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState({})
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState({})
  const [shippingOption, setShippingOption] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  //-----------------------------
  //fetching shipping countries
  //-----------------------------

  const fetchShippingCountries = async (checkoutToken: string) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutToken
      )
      setShippingCountries(countries)
      setShippingCountry(Object.keys(countries)[0])
    } catch (err) {
      console.log('fetch Shipping Countries', err)
    }
  }
  //-----------------------------
  // fetching all subdivisions
  //-----------------------------
  const fetchSubdivisions = async (countryCode: string) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      )
      setShippingSubdivisions(subdivisions)
      setShippingSubdivision(Object.keys(subdivisions)[0])
    } catch (err) {
      console.log('fetch Subdivisions', err)
    }
  }
  //-----------------------------
  //fetching shipping options
  //-----------------------------

  const fetchShippingOptions = async (
    checkoutToken: string,
    country: string,
    region: string
  ) => {
    try {
      const shippingOptions = await commerce.checkout.getShippingOptions(
        checkoutToken,
        {
          country,
          region,
        }
      )

      setShippingOptions(shippingOptions)
      setShippingOption(shippingOptions[0].id)
    } catch (err) {
      console.log('fetch Shipping Options', err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchShippingCountries(id)
    }
  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  return (
    <div className="w-7xl mx-auto flex max-w-7xl flex-col items-center text-slate-600">
      <h2 className="my-10 font-quicksand text-4xl tracking-wider">
        Shipping Address
      </h2>
      <form
        onSubmit={handleSubmit((data) => storeData(data))}
        className="mt-10 grid w-3/4 grid-cols-1 gap-3 md:grid-cols-2 md:gap-6"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            {...register('firstName', { required: true })}
            placeholder="First Name"
            className={`rounded-sm border-2 p-3 ${
              errors.firstName && 'border-red'
            } `}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="lastName">Last Name</label>

          <input
            type="text"
            {...register('lastName', { required: true })}
            placeholder="Last Name"
            className="rounded-sm border-2 p-3"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="address">Address</label>

          <input
            type="text"
            {...register('address', { required: true })}
            placeholder="Address"
            className="rounded-sm border-2 p-3"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="address2">Address 2</label>

          <input
            type="text"
            {...register('address2')}
            placeholder="Optional"
            className="rounded-sm border-2 p-3"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="postCode">Post Code</label>

          <input
            type="number"
            {...register('postCode', { required: true })}
            placeholder="Post Code"
            className="rounded-sm border-2 p-3"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="town">Town</label>

          <input
            type="text"
            {...register('town', { required: true })}
            placeholder="Town"
            className="rounded-sm border-2 p-3"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="country">Country</label>
          <select
            value={shippingCountry}
            id="country"
            className=" rounded-sm border-2 p-3"
            {...register('country', { required: true })}
            onChange={(e) => setShippingCountry(e.target.value)}
          >
            {Object.entries(shippingCountries).map(([id, country]: any) => (
              <option key={id} value={id}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="subdivisions">Subdivisions</label>
          <select
            value={shippingSubdivision}
            id="subdivisions"
            className=" rounded-sm border-2 p-3"
            {...register('subdivision', { required: true })}
            onChange={(e) => setShippingSubdivision(e.target.value)}
          >
            {Object.entries(shippingSubdivisions).map(
              ([id, subdivision]: any) => (
                <option key={id} value={id}>
                  {subdivision}
                </option>
              )
            )}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="email"
            className=" rounded-sm border-2 p-3"
          />
        </div>
        <Link href="/cart">
          <button className="mt-5 h-12 rounded-sm bg-slate-400 text-white hover:bg-slate-500 md:col-start-1">
            Back to Cart
          </button>
        </Link>
        <button
          type="submit"
          className="md:col-start-0 mt-5 h-12 rounded-sm bg-buttonColor text-slate-100 hover:bg-buttonColorHover"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
