import Image from "next/image";
import {auth} from "../lib/auth";
import prisma from "../lib/db";
import {Button} from "../components/ui/button";
import Header from "../components/Header";
import {removeFromCart} from "../lib/actions";
import CartRemoveButton from "../components/CartRemoveButton";

export default async function Page() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const cartItems = user?.cartItems || [];
  return (
    <div className='min-h-screen p-4 bg-gray-100 sm:pt-32'>
      <Header user={user} render={false} />
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Shopping Cart</h1>
        <div className='space-y-8'>
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.id}
              className='flex items-center p-4 bg-white rounded-lg shadow'>
              <Image
                src={cartItem.product.images[0]}
                width={150}
                height={150}
                alt='Product Image'
                className='object-cover rounded'
              />
              <div className='ml-4 flex-1'>
                <h2 className='text-lg font-semibold'>
                  {cartItem.product.productName}
                </h2>
                <p className='text-gray-500'>
                  Price: ${cartItem.product.price}
                </p>
                <div className='flex items-center mt-2 space-x-4'>
                  <div>
                    <label
                      htmlFor={`quantity${cartItem.id}`}
                      className='block text-sm font-medium text-gray-700'>
                      Quantity
                    </label>
                    <input
                      type='number'
                      id={`quantity${cartItem.id}`}
                      name={`quantity${cartItem.id}`}
                      defaultValue={cartItem.quantity}
                      min={1}
                      max={cartItem.product.quantity}
                      className='mt-1 block w-16 p-2 border border-gray-300 rounded-md'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`size${cartItem.id}`}
                      className='block text-sm font-medium text-gray-700'>
                      Size
                    </label>
                    <select
                      id={`size${cartItem.id}`}
                      name={`size${cartItem.id}`}
                      className='mt-1 block w-24 p-2 border border-gray-300 rounded-md'
                      defaultValue={cartItem.size}>
                      {cartItem.product.size.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <CartRemoveButton cartId={cartItem.id} />
            </div>
          ))}
        </div>
        <form className='mt-6'>
          <Button type='submit' className='w-full py-3 text-lg font-semibold'>
            Checkout
          </Button>
        </form>
      </div>
    </div>
  );
}