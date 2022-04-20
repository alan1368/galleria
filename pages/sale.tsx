import Image from 'next/image'
import commerce from '../lib/commerce'
import Product from '../components/Product'

export default function sale({ products }: any) {
  return (
    <div className="w-7xl mx-auto grid max-w-7xl grid-cols-[auto_1fr] px-5">
      <div className="w-48 pt-8 ">
        <ul className=" w-fit space-y-2 font-stick text-lg font-light">
          <li className="mr-3 hover:cursor-pointer hover:text-yellow-800">
            Women
          </li>
          <li className="hover:cursor-pointer hover:text-yellow-800">Men</li>
          <li className="hover:cursor-pointer hover:text-yellow-800">Shoes</li>
          <li className="hover:cursor-pointer hover:text-yellow-800">
            Accessories
          </li>
        </ul>
      </div>
      <div>
        <Image src="/sale.jpg" width={1000} height={500} objectFit="fill" />
        <div className="flex p-5"></div>
      </div>
    </div>
  )
}
