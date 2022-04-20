import CartItem from '../components/CartItem'
import Link from 'next/link'
import { useCartState } from '../context/cart'
export default function cart() {
  const { line_items, subtotal } = useCartState()

  const isEmpty = line_items.length == 0
  if (isEmpty)
    return (
      <div className="mt-10 flex flex-col items-center">
        <h1 className="mb-10 font-quicksand text-xl tracking-wider">
          Shopping art is empty
        </h1>
        <Link href="/">
          <button className="h-12 w-56 rounded-sm bg-zinc-600 tracking-wider text-white hover:bg-zinc-700">
            CONTINUE SHOPPING
          </button>
        </Link>
      </div>
    )
  return (
    <div className="w-7xl mx-auto max-w-7xl">
      <div className=" w-7xl mx-2 mb-5 flex h-12 max-w-7xl items-center justify-between rounded-sm bg-slate-200 px-5 text-slate-600">
        <h2 className="">Shopping Cart</h2>
        <h1> {line_items.length} Item</h1>
      </div>
      <div className="space-y-6">
        {line_items.map((line: any) => (
          <CartItem key={line.id} product={line} />
        ))}
      </div>
      <div className="w-7xl flex h-52 max-w-7xl justify-end px-5 text-slate-500">
        <div className="mx-2 mt-5 flex w-96 flex-col justify-between">
          <h2 className="flex justify-between font-semibold tracking-wider">
            Subtotal <span>{subtotal.formatted_with_symbol.toString()}</span>
          </h2>
          <div className="space-y-2">
            <Link href="/checkout">
              <button className="h-12 w-full rounded-sm bg-buttonColor text-slate-100 hover:bg-buttonColorHover">
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
