"use client";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Checkout from "./Checkout";
import convertToSubcurrency from "./ConvertToSubCurreny";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckOutForm({cartItems}: {cartItems: any}) {
  const totalAmount = cartItems.reduce(
    (acc: number, cur: any) => (acc += cur?.product?.price),
    0
  );
  console.log(totalAmount);
  return (
    <div className=' px-12 py-12 rounded-md border-2'>
      <h1 className='text-2xl font-bold mb-4'>Checkout form</h1>
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
  );
}
