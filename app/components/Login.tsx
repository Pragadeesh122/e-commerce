"use client";

import {Button} from "@/app/components/ui/button";
import {Input} from "@/app/components/ui/input";
import Divider from "@/app/components/Divider";
import github from "@/public/Github.png";
import google from "@/public/Google.png";
import Image from "next/image";
import {
  githubSignInAction,
  googleSignInAction,
  signInUser,
} from "@/app/lib/actions";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import SubmitButton from "./SubmitButton";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [pending, setPending] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setPending(true);
      const form = new FormData(event.currentTarget);
      const response = await signInUser(form);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className=' flex flex-col gap-6 px-6 py-8 border-gray-400 border-2 rounded-md'>
      <h1 className='text-center text-xl font-semibold'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2 '>
          <Input
            className='w-72'
            id='email'
            name='email'
            type='email'
            placeholder='Email'
          />
        </div>
        <div className='flex flex-col gap-2 '>
          <Input
            className='w-72'
            id='password'
            name='password'
            type='password'
            placeholder='Password'
          />
        </div>
        {error && (
          <div className='text-sm ml-2'>
            <span className='text-red-500'>{error}</span>
          </div>
        )}
        <div className='mt-[-10px] ml-2'>
          <span className='text-sm font-medium'>
            Don&apos;t you have an account?{" "}
            <Link
              className='text-gray-800 font-semibold underline ml-1'
              href='/register'>
              Register
            </Link>
          </span>
        </div>
        <div className='flex w-full'>
          <SubmitButton
            pending={pending}
            label='Login'
            pendingLabel='Loggin in....'
            className='w-full rounded-md'
          />
        </div>
      </form>
      <div>
        <Divider />
      </div>
      <form>
        <Button formAction={googleSignInAction} className='w-full'>
          Sign in with Google{" "}
          <Image
            className='ml-3'
            src={google}
            width={24}
            height={24}
            alt='google_icon'></Image>
        </Button>
      </form>
      <form>
        <Button formAction={githubSignInAction} className='w-full'>
          Sign in with Github{" "}
          <Image
            className='ml-3'
            src={github}
            width={24}
            height={24}
            alt='github_icon'></Image>
        </Button>
      </form>
    </div>
  );
}
