"use client";

import {Button} from "../components/ui/button";
import {Input} from "../components/ui/input";
import {Label} from "../components/ui/label";
import {updateProfile} from "../lib/actions";
import {useRef, useState} from "react";
import SubmitButton from "./SubmitButton";

export default function ProfileForm({
  user,
}: {
  user: {
    name: string;
    email: string;
    image: string | null;
  } | null;
}) {
  type ProfileResponse = {
    success?: string;
    error?: string;
  };

  const formRef = useRef<HTMLFormElement>(null);

  const [profileUpdate, setProfileUpdate] = useState<
    ProfileResponse | undefined
  >();

  const [pending, setPending] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setPending(true);
      const form = new FormData(event.currentTarget);
      const response = await updateProfile(form);
      setProfileUpdate(response);
    } finally {
      setPending(false);
    }
  }
  if (profileUpdate?.success) {
    formRef.current?.reset();
  }

  function resetForm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 px-10 py-4 border-2 min-w-96 rounded-lg'>
      <h1 className='font-bold'>Profile</h1>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold' htmlFor='name'>
          Name
        </Label>
        <Input
          disabled={pending}
          id='name'
          name='name'
          type='text'
          defaultValue={user?.name!}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>Email</Label>
        <Input disabled type='text' defaultValue={user?.email!} />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold' htmlFor='password'>
          Enter New Password
        </Label>
        <Input
          disabled={pending}
          type='password'
          name='password'
          id='password'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold' htmlFor='passwordCheck'>
          Re-enter the Password
        </Label>
        <Input
          disabled={pending}
          type='password'
          id='passwordCheck'
          name='passwordCheck'
        />
      </div>
      <div className='flex flex-col gap-3'>
        <Label className='font-semibold' htmlFor='image '>
          Upload Profile Image
        </Label>
        <Input
          disabled={pending}
          className='h-14 border-none text-sm text-grey-500
            file:ml-[-15px] file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          '
          type='file'
          accept='image/*'
          name='image'
          id='image'
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button
          onClick={resetForm}
          className='px-8 py-2 rounded-full'
          variant='destructive'>
          Clear
        </Button>
        <SubmitButton
          pendingLabel='updating...'
          label='update'
          pending={pending}
        />
      </div>
      {profileUpdate?.error && (
        <div className='max-w-72 mt-4  text-sm ml-2'>
          <span className={`${"text-red-500"}`}>{profileUpdate.error}</span>
        </div>
      )}
    </form>
  );
}
