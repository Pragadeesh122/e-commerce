"use client";

import React, {useEffect, useState} from "react";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import convertToSubcurrency from "./ConvertToSubCurreny";
import {Button} from "./ui/button";

const Checkout = ({amount}: {amount: number}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({amount: convertToSubcurrency(amount)}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const {error: submitError} = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${
          process.env.NODE_ENV === "production"
            ? "https://elegancehub.vercel.app/payment_success"
            : "http://www.localhost:3000/payment_success"
        }`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className='flex items-center justify-center'>
        <div
          className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
          role='status'>
          <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white p-2 rounded-md'>
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <Button
        disabled={!stripe || loading}
        type='submit'
        className='mt-5 w-full font-semibold text-lg py-4 '>
        {!loading ? `Pay $${amount}` : "Processing..."}
      </Button>
    </form>
  );
};

export default Checkout;