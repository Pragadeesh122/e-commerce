"use client";

import {Button} from "./ui/button";

export default function SubmitButton({
  pendingLabel,
  label,
  pending,
}: {
  pendingLabel: string;
  label: string;
  pending: boolean;
}) {
  console.log(pending);
  return (
    <Button type='submit' className='px-6 py-2 rounded-full' disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}
