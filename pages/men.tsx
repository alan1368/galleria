import Image from 'next/image'
import commerce from '../lib/commerce'
import Product from '../components/Product'

export default function women({ products }: any) {
  return (
    <div className=" mx-auto mb-10 grid max-w-7xl grid-cols-[auto_1fr] px-5">
      <div className="w-48 pt-8 ">
        <ul className=" w-fit space-y-2 font-stick text-lg font-light">
          <li className="mr-3 hover:cursor-pointer hover:text-yellow-800">
            Cloting
          </li>
          <div className="ml-5 mt-2">
            <li className="w-auto hover:cursor-pointer hover:text-yellow-800">
              Jeans
            </li>
            <li className="hover:cursor-pointer hover:text-yellow-800">
              Shirts
            </li>
            <li className="hover:cursor-pointer hover:text-yellow-800">
              Suits
            </li>
          </div>
          <li className="hover:cursor-pointer hover:text-yellow-800">Shoes</li>
          <li className="hover:cursor-pointer hover:text-yellow-800">
            Accessories
          </li>
        </ul>
      </div>
      <div>
        <div className="hidden md:block">
          <Image src="/men-hero.jpg" width={7360} height={4912} />
        </div>
        <div className="flex flex-col p-5 md:flex-row">
          {products.map((product: any) => {
            return <Product products={product} key={product.permalink} />
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const { data: products } = await commerce.products.list({
    category_slug: 'men',
  })
  return {
    props: {
      products,
    },
  }
}
