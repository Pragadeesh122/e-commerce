import AddToCart from "@/app/components/AddToCart";
import Header from "@/app/components/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import {auth} from "@/app/lib/auth";
import {getProductById, getUserByEmail} from "@/app/lib/supabase/helpers";
import Image from "next/image";

export default async function Page({params}: {params: {productId: string}}) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  const product = await getProductById(params.productId);
  return (
    <div className='max-w-7xl mx-auto p-6 flex items-center justify-center h-screen'>
      <Header user={user} render={false} />
      <div className='flex flex-col py-6 mt-64 sm:mt-0 gap-20 lg:flex-row border-2 sm:py-12 sm:px-24 rounded-xl'>
        <div className='flex-1 px-12 '>
          <Carousel>
            <CarouselContent>
              {product?.images.map((image: string) => (
                <CarouselItem key={image}>
                  <Image
                    src={image}
                    alt='Product Image'
                    width={520}
                    height={520}
                    className='object-cover hover:scale-110 transition-all duration-300 ease-in-out rounded-lg '
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        <AddToCart product={product!} userId={user?.id!} />
      </div>
    </div>
  );
}
