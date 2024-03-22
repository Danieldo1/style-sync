import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col justify-start pt-24 items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            className="mx-auto h-full w-auto"
            width={400}
            height={400}
            src="/success.webp"
            alt="Payment Success"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for your purchase. Your order is being processed.
          </p>
        </div>
        <div className="mt-8 flex justify-center text-center">
          <Link
            href="/clothes"
            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage