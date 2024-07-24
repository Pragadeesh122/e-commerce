"use client";

import {useState} from "react";
import {updateCartItem} from "../lib/actions";

export function SizeQuantityUpdate({CartItem}: {CartItem: any}) {
  async function handleQuantityChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const formData = new FormData();
    formData.append("quantity", event.target.value.toString());
    formData.append("cartId", CartItem.id);
    await updateCartItem(formData);
  }

  async function handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const formData = new FormData();
    formData.append("size", event.target.value);
    formData.append("cartId", CartItem.id);
    await updateCartItem(formData);
  }

  console.log(CartItem);

  return (
    <form className='flex items-center mt-2 space-x-4'>
      <div>
        <label
          htmlFor={`quantity${CartItem.id}`}
          className='block text-sm font-medium text-gray-700'>
          Quantity
        </label>
        <select
          id={`quantity${CartItem.id}`}
          name='quantity'
          defaultValue={CartItem.quantity - 1}
          onChange={handleQuantityChange}
          className='mt-1 block w-16 p-2 border border-gray-300 rounded-md'>
          {[...Array(CartItem.Product.quantity)].map((num, idx) => (
            <option key={idx} value={idx}>
              {idx + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor={`size${CartItem.id}`}
          className='block text-sm font-medium text-gray-700'>
          Size
        </label>
        <select
          id={`size${CartItem.id}`}
          name='size'
          defaultValue={CartItem.size}
          className='mt-1 block w-20 sm:w-24 p-2 border border-gray-300 rounded-md'
          onChange={handleSizeChange}>
          {CartItem.Product.size.map((size: any) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
