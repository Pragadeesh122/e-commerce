import Image from "next/image";
import {auth} from "../lib/auth";
import prisma from "../lib/db";
import {Button} from "../components/ui/button";
import Header from "../components/Header";
import {removeFromCart, updateCartItem} from "../lib/actions";
import CartRemoveButton from "../components/CartRemoveButton";
import {SizeQuantityUpdate} from "../components/SizeQuantityUpdate";
import Link from "next/link";
import {getUserByEmailWithCartItemsAndProducts} from "../lib/supabase/helpers";

export default async function Page() {
  const session = await auth();
  const user = await getUserByEmailWithCartItemsAndProducts(
    session?.user?.email!
  );

  const cartItems = user?.CartItem || [];
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
                src={cartItem?.Product?.displayImage}
                width={150}
                height={150}
                alt='Product Image'
                className='object-cover rounded'
              />
              <div className='ml-4 flex-1'>
                <h2 className='text-lg font-semibold'>
                  {cartItem.Product.productName}
                </h2>
                <p className='text-gray-500'>
                  Price: ${cartItem.Product.price}
                </p>
                <div className='flex items-center mt-2 space-x-4'>
                  <SizeQuantityUpdate CartItem={cartItem} />
                </div>
              </div>
              <CartRemoveButton cartId={cartItem.id} />
            </div>
          ))}
        </div>
        <Link href='/checkout'>
          <div className='mt-6'>
            <Button type='submit' className='w-full py-3 text-lg font-semibold'>
              Checkout
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
