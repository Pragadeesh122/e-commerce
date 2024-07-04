import Image from "next/image";
import {auth} from "@/app/lib/auth";
import UploadData from "./components/UploadData";
import prisma from "./lib/db";
import {Card, CardContent} from "./components/ui/card";
import SectionHeader from "./components/SectionHeader";
import Header from "./components/Header";
import {Badge} from "./components/ui/badge";
import {Button} from "./components/ui/button";

export default async function Home() {
  const session = await auth();
  const images = await prisma.product.findMany();

  const landingImages = images.slice(0, 5);

  return (
    <div className='flex flex-col'>
      <Header session={session} render={false} />
      <main className='flex-1 px-24 bg-muted'>
        <section className='w-full py-10 md:pt-36'>
          <div className='grid gap-4'>
            <SectionHeader
              subHeading='Discover the Latest Fashion Trends'
              description=' Explore our curated collection of the hottest fashion items,
                from stylish dresses to sleek accessories.'
            />
            <div className='grid w-full grid-cols-2 lg:grid-cols-5 items-center justify-center gap-2 lg:gap-4'>
              {landingImages.map((image) => (
                <div key={image.image} className='relative w-full h-80'>
                  <Image
                    src={`${image.image}`}
                    fill
                    alt='Product'
                    className='rounded-lg hover:scale-110 transition-all duration-300 ease-in-out'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='w-full py-10 md:py-12 lg:py-16'>
          <div className=' grid  gap-4'>
            <SectionHeader
              heading='Featured Collections'
              subHeading='Explore Our Curated Collections'
              description='Discover our expertly curated fashion collections, each
                showcasing the latest trends and styles.'
            />
            <div className='grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6'>
              {images.map((image) => (
                <Card key={image.image} className='overflow-hidden'>
                  <Image
                    src={`${image.image}`}
                    width={300}
                    height={300}
                    alt='Product Image'
                    className='object-cover hover:scale-110 transition-all duration-300 ease-in-out'
                  />
                  <CardContent className='p-4'>
                    <div className='flex flex-col gap-4'>
                      <h4 className='text-lg font-semibold h-10'>
                        {image.productName}
                      </h4>
                      <p className='text-muted-foreground font-semibold'>
                        Formal Wear
                      </p>
                      <div className='flex justify-between'>
                        <p className='text-primary font-bold'>{`$${image.price}`}</p>
                        <Badge variant='outline'>popular</Badge>
                      </div>
                      <form className='mt-2'>
                        <Button className='rounded-full px-6'>
                          Add to Cart
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className='w-full py-10 md:py-12 lg:py-16'>
          <div className=' grid  gap-4'>
            <SectionHeader
              heading='Trending Now'
              subHeading='Stay Ahead with the Latest Trends'
              description=" Dive into our selection of trending styles that are making waves in the fashion world. From bold statement pieces to subtle elegance, find what's hot right now"
            />
            <div className='grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6'>
              {images.map((image) => (
                <Card key={image.image} className='overflow-hidden'>
                  <Image
                    src={`${image.image}`}
                    width={300}
                    height={300}
                    alt='Product Image'
                    className='object-cover hover:scale-110 transition-all duration-300 ease-in-out'
                  />
                  <CardContent className='p-4'>
                    <div className='flex flex-col gap-4'>
                      <h4 className='text-lg font-semibold h-10'>
                        {image.productName}
                      </h4>
                      <p className='text-muted-foreground font-semibold'>
                        Formal Wear
                      </p>
                      <div className='flex justify-between'>
                        <p className='text-primary font-bold'>{`$${image.price}`}</p>
                        <Badge variant='outline'>popular</Badge>
                      </div>
                      <form className='mt-2'>
                        <Button className='rounded-full px-6'>
                          Add to Cart
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className='w-full py-10 md:py-12 lg:py-16'>
          <div className=' grid  gap-4'>
            <SectionHeader
              heading='Personalized Recommendations'
              subHeading='Tailored Just for You'
              description='Explore fashion picks curated specifically for you. Based on your preferences and past purchases, these recommendations are designed to match your unique style'
            />
            <div className='grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6'>
              {images.map((image) => (
                <Card key={image.image} className='overflow-hidden'>
                  <Image
                    src={`${image.image}`}
                    width={300}
                    height={300}
                    alt='Product Image'
                    className='object-cover hover:scale-110 transition-all duration-300 ease-in-out'
                  />
                  <CardContent className='p-4'>
                    <div className='flex flex-col gap-4'>
                      <h4 className='text-lg font-semibold h-10'>
                        {image.productName}
                      </h4>
                      <p className='text-muted-foreground font-semibold'>
                        Formal Wear
                      </p>
                      <div className='flex justify-between'>
                        <p className='text-primary font-bold'>{`$${image.price}`}</p>
                        <Badge variant='outline'>popular</Badge>
                      </div>
                      <form className='mt-2'>
                        <Button className='rounded-full px-6'>
                          Add to Cart
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <UploadData />
    </div>
  );
}
