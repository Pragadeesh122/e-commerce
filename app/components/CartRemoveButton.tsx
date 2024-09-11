"use client";

import {useState} from "react";
import {Button} from "./ui/button";
import {removeFromCart} from "../lib/actions";

export default function CartRemoveButton({cartId}: {cartId: string}) {
  const [pending, setPending] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setPending(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      await removeFromCart(formData);
      await new Promise((resolve)=> setTimeout(()=> (resolve),500))
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='sm:self-end'>
      <input hidden defaultValue={cartId} name='cartId' />
      <Button
        disabled={pending}
        className='disabled:bg-slate-500'
        type='submit'>
        {pending ? "Removing..." : "Remove from cart"}
      </Button>
    </form>
  );
}
