import Image from 'next/image'
import { useState } from 'react'
import commerce from '../lib/commerce'
import { useCartDispatch } from '../context/cart'

export default function ProductPage({ product, cart }: any) {
  const { id, assets, name, price, description, variant_groups } = product

  const colorVariants = variant_groups[0].options.map((option: any) => {
    const colorInfo = { key: '', value: '' }
    colorInfo.key = option.name
    colorInfo.value = option.id

    return colorInfo
  })
  const sizeVariants = variant_groups[1].options.map((option: any) => {
    const sizeInfo = { key: '', value: '' }
    sizeInfo.key = option.name
    sizeInfo.value = option.id
    return sizeInfo
  })

  const [quantity, setQuantity] = useState(1)
  const [variantInfo, setVariantInfo] = useState({})
  const [size, setSize] = useState()
  const [color, setColor] = useState()
  const { setCart } = useCartDispatch()
  const quantityHandler = (e: any) => {
    const id = e.target.id
    switch (id) {
      case 'plus':
        setQuantity((prevQuantity) => prevQuantity + 1)
        break
      case 'minus':
        quantity > 1 && setQuantity((prevQuantity) => prevQuantity - 1)
        break
    }
  }
  const colorHandler = (e: any) => {
    setColor(e.target.id)
    setVariantInfo((prevVar) => ({
      ...prevVar,
      [variant_groups[0].id]: e.target.id,
    }))
  }
  const sizeHandler = (e: any) => {
    setSize(e.target.id)
    setVariantInfo((prevVar) => ({
      ...prevVar,
      [variant_groups[1].id]: e.target.id,
    }))
  }
  const addToCart = () => {
    if (Object.keys(variantInfo).length === 2) {
      commerce.cart.add(id, quantity, variantInfo).then((cart) => setCart(cart))
    } else {
      window.alert('Please Select color and size')
    }
  }

  return (
    <div className="mx-auto mt-10 grid w-11/12 max-w-7xl grid-rows-2 md:grid-cols-[60%_40%]">
      <div className="grid h-96 grid-cols-2">
        {assets.map((asset: any) => {
          return (
            <div className="relative" key={asset.id}>
              <Image src={asset.url} layout="fill" objectFit="contain" />
            </div>
          )
        })}
      </div>
      <div className="ml-5 mt-5 tracking-wider text-slate-700">
        <h2 className="text-lg font-medium">{name}</h2>
        <h4 className="my-3">{price.formatted_with_symbol}</h4>
        <p className="font-extralight ">{description}</p>
        <div className="mb-5">
          <p>Color:</p>
          <div className="mt-2 flex space-x-10">
            {colorVariants.map((option: any) => {
              const { key, value } = option
              const col = key.toLowerCase()
              return (
                <div
                  id={value}
                  className={`bg w-16 rounded-sm p-2 
                   hover:cursor-pointer ${
                     color === value && `border-2 border-slate-500`
                   }`}
                  onClick={colorHandler}
                  key={value}
                >
                  {col}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <p>Size:</p>
          <div className="mt-2 flex space-x-2">
            {sizeVariants.map((option) => {
              const { key, value } = option

              return (
                <div
                  id={value}
                  className={`flex h-10 w-10 items-center justify-center border hover:cursor-pointer ${
                    size === value && 'border-2 border-slate-500'
                  }`}
                  onClick={sizeHandler}
                  key={value}
                >
                  {key}
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-5 font-light ">
          <p>Quantity:</p>
          <div className="mt-3 grid h-10 w-36 grid-cols-3 place-items-center items-center justify-between border ">
            <p
              className=" text-2xl hover:cursor-pointer"
              onClick={quantityHandler}
              id="minus"
            >
              -
            </p>
            {quantity}
            <p
              className="text-2xl hover:cursor-pointer"
              onClick={quantityHandler}
              id="plus"
            >
              +
            </p>
          </div>
        </div>
        <button
          className="mt-5 h-12 w-full rounded-sm bg-buttonColor text-sm tracking-widest text-slate-100 hover:bg-buttonColorHover"
          onClick={addToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }: any) {
  const { permalink } = params
  const cart = await commerce.cart.retrieve()

  const product = await commerce.products.retrieve(permalink, {
    type: 'permalink',
  })

  return {
    props: {
      product,
      cart,
    },
  }
}
export async function getStaticPaths() {
  const { data: products } = await commerce.products.list()
  const paths = products.map((product) => ({
    params: { permalink: product.permalink },
  }))

  return {
    paths,
    fallback: false,
  }
}
