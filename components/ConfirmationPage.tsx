import Link from 'next/link'
export default function ConfirmationPage() {
  return (
    <div className="w-7xl flex max-w-7xl flex-col items-center justify-center ">
      <h2 className="my-5 font-quicksand text-2xl tracking-wider">
        Your Order is Confirmed
      </h2>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24"
          viewBox="0 0 20 20"
          fill="Green"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h4 className=" my-5 px-5 tracking-wide text-slate-500">
        You will receive a confirmation email with order details
      </h4>
      <Link href="/">
        <button className="my-5 rounded-full border-2 border-lime-500 p-4 hover:bg-lime-500 hover:text-white">
          Back to Home Page
        </button>
      </Link>
    </div>
  )
}
