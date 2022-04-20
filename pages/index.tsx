import type { NextPage } from 'next'
import Product from '../components/Product'
import Hero from '../components/Hero'
import commerce from '../lib/commerce'

const Home: NextPage = ({ products }: any) => {
  return (
    <div className="mx-auto mb-10 max-w-7xl">
      <Hero />
      <h2 className="mx-auto mb-10 inline-flex w-11/12 justify-center font-stick text-lg tracking-widest">
        FEATURED PRODUCTS
      </h2>
      <div className="mx-auto grid w-11/12 max-w-7xl grid-cols-1 items-center justify-center gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: any) => {
          return <Product products={product} key={product.permalink} />
        })}
      </div>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const { data: products } = await commerce.products.list()

  return {
    props: {
      products,
    },
  }
}
