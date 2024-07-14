import {auth} from "../lib/auth";
import prisma from "../lib/db";
import {Badge} from "@/app/components/ui/badge";
import Image from "next/image";
import Header from "../components/Header";

export default async function Page() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include: {
      orders: {
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  const headerUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {email: true, name: true, id: true, cartItems: true, image: true},
  });

  const orderItems = user?.orders.flatMap((order: any) =>
    order.orderItems.map((item: any) => ({
      ...item,
      createdAt: order.createdAt,
    }))
  );

  return (
    <>
      <header>
        <Header user={headerUser} render={false} />
      </header>
      <main className='min-h-screen flex flex-col pt-32 pb-6 gap-4 items-center justify-center bg-muted '>
        <h1 className='text-center text-3xl mb-4 font-bold'>Your Orders</h1>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-center justify-center'>
          {orderItems?.map((order: any) => (
            <div
              key={order.id}
              className='rounded-lg bg-card p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl'>
              <div className='flex items-center justify-between min-w-80'>
                <div className='text-sm font-medium text-muted-foreground'>
                  Order {order.id.slice(0, 8)}
                </div>
                <Badge>Shipped</Badge>
              </div>
              <div className='mt-2 text-lg font-bold'>
                ${order.price.toFixed(2)}
              </div>
              <div className='mt-2 text-sm text-muted-foreground'>
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className='mt-4 flex justify-end'>
                <Image
                  src={order.product.displayImage}
                  alt={`Order ${order.id} product`}
                  width={100}
                  height={100}
                  className='rounded-md'
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
