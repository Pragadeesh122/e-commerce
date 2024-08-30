"use client";

import Link from "next/link";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {createUser} from "../lib/actions";
import {useState} from "react";

export default function Register() {
  type AccountResponse = {
    success?: string;
    error?: string;
  };

  const [accountCreated, setAccountCreated] = useState<
    AccountResponse | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await createUser(form);
    setAccountCreated(response);
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 px-6 py-8 border-gray-400 border-2 rounded-md'>
      <h1 className='text-center text-xl font-semibold'>Register</h1>
      <div className='flex flex-col gap-2'>
        <Input
          className='w-72'
          id='name'
          name='name'
          type='text'
          placeholder='Name'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Input
          className='w-72'
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Input
          className='w-72'
          name='password'
          id='password'
          type='password'
          placeholder='Password'
          required
        />
      </div>
      {accountCreated && (
        <div className='max-w-72 text-sm ml-2'>
          <span
            className={`${
              accountCreated.success ? "text-green-500" : "text-red-500"
            }`}>
            {accountCreated.success ?? accountCreated.error}
          </span>
        </div>
      )}
      <div>
        <Button className='w-full' type='submit' disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
      <div className='mt-[-10px] ml-2'>
        <span className='text-sm'>
          Already have an account?{" "}
          <Link
            className='text-gray-800 font-semibold underline ml-2'
            href='/login'>
            Login
          </Link>
        </span>
      </div>
    </form>
  );
}
