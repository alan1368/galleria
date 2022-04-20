import commerce from '../lib/commerce'
import Image from 'next/image'
import { useCartDispatch } from '../context/cart'
export default function CartItem({ product }: any) {
  const { id, name, quantity, line_total, image, selected_options } = product
  const { setCart } = useCartDispatch()
  const handleUpdateCart = ({ cart }: any) => {
    setCart(cart)
  }
  const removeItem = () => {
    commerce.cart.remove(id).then(handleUpdateCart)
  }
  const decrementQuantity = () => {
    product.quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then(handleUpdateCart)
      : removeItem()
  }
  const incrementQuantity = () => {
    commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart)
  }
  return (
    <div className="w-7xl mb-2 flex max-w-7xl justify-between border-b-2 px-5 text-sm text-slate-500">
      <div className="flex">
        <Image src={image.url} width={100} height={150} />
        <div className="ml-3 space-y-6">
          <h2>{name}</h2>
          <p>färg: {selected_options[0].option_name}</p>
          <p>storlek: {selected_options[1].option_name}</p>
        </div>
      </div>
      <div className="mt-5 flex h-fit space-x-5">
        <p className="hover:cursor-pointer" onClick={decrementQuantity}>
          -
        </p>
        <p>{quantity}</p>
        <p className="hover:cursor-pointer" onClick={incrementQuantity}>
          +
        </p>
      </div>
      <div className="">
        <p className="mb-8 hover:cursor-pointer" onClick={removeItem}>
          DELETE
        </p>
        <p>{line_total.formatted_with_symbol} </p>
      </div>
    </div>
  )
}
