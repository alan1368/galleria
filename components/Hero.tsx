import Image from 'next/image'
export default function Hero() {
  return (
    <div className="w-7xl group relative -z-10 mb-10 -mt-20 h-[45rem] max-w-7xl">
      <Image src="/hero1.jpg" layout="fill" className="absolute" />

      <div className="absolute top-52 left-20 z-50">
        <h2 className=" font-cinzel text-lg text-slate-700">
          Lorem ipsum dolor sit amet <br /> consectetur, adipisicing elit.{' '}
          <br />
          Perferendis, quasi!
        </h2>
        <button className=" mt-5 h-12 w-60 rounded-sm bg-white font-quicksand tracking-widest text-slate-700 hover:cursor-pointer hover:bg-slate-100">
          SEASONAL FAVORITES
        </button>
      </div>
    </div>
  )
}
