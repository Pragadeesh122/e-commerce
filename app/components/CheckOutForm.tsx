"use client";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Checkout from "./Checkout";
import convertToSubcurrency from "./ConvertToSubCurreny";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckOutForm({cartItems}: {cartItems: any}) {
  const totalAmount = cartItems.reduce(
    (acc: number, cur: any) => (acc += cur?.product?.price),
    0
  );
  console.log(cartItems);
  return (
    <div className='flex flex-col gap-12 border-2 rounded-md'>
      <h1 className='font-bold text-2xl text-center mt-4'>Checkout Form</h1>
      <div className='px-12 py-12 rounded-md  flex gap-16'>
        <div>
          <h1 className='font-bold text-xl mb-4'>Order Summary:</h1>
          {cartItems.map((item: any) => (
            <div
              className='flex flex-col gap-4 font-semibold border-2 rounded-md mb-4 px-4 py-2'
              key={item.id}>
              <p>{item.product.productName}</p>
              <div className='flex justify-between items-end'>
                <Image
                  src={item.product.displayImage}
                  alt='order image'
                  width={50}
                  height={50}></Image>
                <p>${item.quantity * item.product.price}</p>
              </div>
            </div>
          ))}
          <div className='mt-8 flex justify-end'>
            <p className='font-bold '>Total : ${totalAmount.toFixed(2)}</p>
          </div>
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(totalAmount),
            currency: "usd",
          }}>
          <Checkout amount={totalAmount} />
        </Elements>
      </div>
    </div>
  );
}
