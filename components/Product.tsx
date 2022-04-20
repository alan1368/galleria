import Image from 'next/image'
import Link from 'next/link'
export default function Product({ products }: any) {
  return (
    <Link href={products.permalink}>
      <div className="group h-96 w-64 hover:cursor-pointer">
        <div className="relative h-5/6 w-full group-hover:mx-auto group-hover:h-4/6 group-hover:w-5/6">
          <Image src={products.image.url} layout="fill" objectFit="contain" />
        </div>
        <div className="space-y-2 p-2">
          <p className="text-sm font-extralight tracking-widest">
            {products.name}
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: products.description }}
            className="hidden text-sm font-thin tracking-wide group-hover:inline-flex"
          />
          <p className="text-sm font-medium tracking-wide">
            {products.price.formatted_with_symbol}{' '}
          </p>
        </div>
      </div>
    </Link>
  )
}
