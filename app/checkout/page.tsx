import CheckOutForm from "../components/CheckOutForm";
import {auth} from "../lib/auth";
import prisma from "../lib/db";
import {createOrder} from "../lib/actions";

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
  return (
    <div className='h-screen flex items-center justify-center'>
      <CheckOutForm cartItems={user?.cartItems} />
    </div>
  );
}
