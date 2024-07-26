"use client";

import React, {useEffect, useState} from "react";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import convertToSubcurrency from "./ConvertToSubCurreny";
import {Button} from "./ui/button";
import Spinner from "./Spinner";

const Checkout = ({amount}: {amount: number}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // State for additional fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

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
        payment_method_data: {
          billing_details: {
            email,
            name,
            address: {
              line1: address,
            },
          },
        },
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
            <Spinner />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg '>
      <form onSubmit={handleSubmit} className='bg-white p-2 rounded-md'>
        <div className='mb-4'>
          <label className='block text-sm text-black'>Email</label>
          <input
            type='email'
            className='w-full px-4 py-2 mt-2 border rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-black'>Name</label>
          <input
            type='text'
            className='w-full px-4 py-2 mt-2 border rounded-md'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-black'>Address</label>
          <input
            type='text'
            className='w-full px-4 py-2 mt-2 border rounded-md'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {clientSecret && <PaymentElement />}

        {errorMessage && (
          <div className='mt-4 p-2 text-red-700 bg-red-100 rounded'>
            {errorMessage}
          </div>
        )}

        <Button
          disabled={!stripe || loading}
          type='submit'
          className='mt-5 w-full font-semibold text-md md:text-lg py-4 text-white rounded'>
          {!loading ? `Pay $${amount.toFixed(2)}` : "Processing..."}
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
