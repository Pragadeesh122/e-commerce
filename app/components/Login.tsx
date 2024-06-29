"use client";

import {Button} from "@/app/components/ui/button";
import {Input} from "@/app/components/ui/input";
import Divider from "@/app/components/Divider";
import github from "@/public/Github.png";
import google from "@/public/Google.png";
import Image from "next/image";
import {githubSignInAction, googleSignInAction} from "@/app/lib/actions";

export default function Login() {
  return (
    <form className=' flex flex-col gap-6 px-6 py-8 border-gray-400 border-2 rounded-md'>
      <h1 className='text-center text-xl font-semibold'>Login</h1>
      <div className='flex flex-col gap-2 '>
        <Input className='w-72' id='email' type='email' placeholder='Email' />
      </div>
      <div className='flex flex-col gap-2 '>
        <Input
          className='w-72'
          id='password'
          type='password'
          placeholder='Password'
        />
      </div>
      <div>
        <Button className='w-full'>Login</Button>
      </div>
      <div>
        <Divider />
      </div>
      <div>
        <Button formAction={googleSignInAction} className='w-full'>
          Sign in with Google{" "}
          <Image
            className='ml-3'
            src={google}
            width={24}
            height={24}
            alt='google_icon'></Image>
        </Button>
      </div>
      <div>
        <Button formAction={githubSignInAction} className='w-full'>
          Sign in with Github{" "}
          <Image
            className='ml-3'
            src={github}
            width={24}
            height={24}
            alt='github_icon'></Image>
        </Button>
      </div>
    </form>
  );
}
