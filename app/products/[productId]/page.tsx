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
    select: {name: true, email: true, image: true},
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
                    width={500}
                    height={500}
                    className='object-cover hover:scale-110 transition-all duration-300 ease-in-out rounded-lg'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className='flex-1 flex flex-col gap-6'>
          <h1 className='text-3xl font-bold'>{product?.productName}</h1>
          <p className='text-gray-600'>Formal Wear</p>
          <p className='text-xl font-semibold'>{`$${product?.price}`}</p>
          <p className='text-gray-600'>{product?.description}</p>
          <div className='mb-4'>
            <p className='text-gray-600 mb-4'>Available Sizes:</p>
            <div className='flex space-x-2'>
              {product?.size.map((size) => (
                <Button
                  key={product.id}
                  variant='outline'
                  size='sm'
                  className='px-4 py-2 rounded-md'>
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <Button className='px-6 py-3 rounded-md'>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
