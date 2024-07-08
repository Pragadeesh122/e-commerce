import AddToCart from "@/app/components/AddToCart";
import Header from "@/app/components/Header";
import {Button} from "@/app/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import {auth} from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import Image from "next/image";

export default async function Page({params}: {params: {productId: string}}) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {email: session?.user?.email!},
    select: {name: true, email: true, image: true, id: true, cartItems: true},
  });

  const product = await prisma.product.findUnique({
    where: {id: params.productId},
    select: {
      id: true,
      productName: true,
      price: true,
      description: true,
      images: true,
      size: true,
      quantity: true,
    },
  });
  return (
    <div className='max-w-7xl mx-auto p-6 flex items-center justify-center h-screen'>
      <Header user={user} render={false} />
      <div className='flex flex-col gap-20 md:flex-row border-2 py-12 px-24 rounded-xl'>
        <div className='flex-1'>
          <Carousel>
            <CarouselContent>
              {product?.images.map((image) => (
                <CarouselItem key={image}>
                  <Image
                    src={image}
                    alt='Product Image'
                    width={520}
                    height={520}
                    className='object-cover hover:scale-110 transition-all duration-300 ease-in-out rounded-lg'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <AddToCart product={product!} userId={user?.id!} />
      </div>
    </div>
  );
}
