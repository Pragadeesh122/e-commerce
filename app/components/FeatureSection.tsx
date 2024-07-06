import Image from "next/image";
import SectionHeader from "./SectionHeader";
import {Card, CardContent} from "./ui/card";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";
import Link from "next/link";

type ImageType = {
  id: string;
  displayImage: string;
  images: string[];
  productName: string;
  wear: string;
  price: number;
  description: string;
  isNew: boolean;
  isTrending: boolean;
  isPopular: boolean;
  isTopRated: boolean;
  isOnSale?: boolean;
}[];

export default function FeatureSection({
  images,
  heading,
  subHeading,
  description,
}: {
  images: ImageType;
  heading: string;
  subHeading: string;
  description: string;
}) {
  const getBadgeLabel = (image: ImageType[number]) => {
    if (image.isNew) return "New";
    if (image.isTrending) return "Trending";
    if (image.isPopular) return "Popular";
    if (image.isTopRated) return "Top Rated";
    if (image.isOnSale) return "Sale";
  };

  return (
    <section className='w-full py-10 md:py-12 lg:py-16'>
      <div className=' grid  gap-4'>
        <SectionHeader
          heading={heading}
          subHeading={subHeading}
          description={description}
        />
        <div className='grid gap-x-6 gap-y-12  items-center justify-center grid-cols-[repeat(auto-fit,minmax(150px,270px))]'>
          {images.map((image) => (
            <Link key={image?.displayImage} href={`/products/${image?.id}`}>
              <Card className='overflow-hidden'>
                <div className='relative w-full h-72 '>
                  <Image
                    src={`${image?.displayImage}`}
                    fill
                    alt='Product Image'
                    className='object-cover hover:scale-110 transition-all duration-300 ease-in-out'
                  />
                </div>
                <CardContent className='p-4'>
                  <div className='flex flex-col gap-4'>
                    <h4 className='text-lg font-semibold h-10'>
                      {image?.productName}
                    </h4>
                    <p className='text-muted-foreground font-semibold'>
                      {image?.wear}
                    </p>
                    <div className='flex justify-between'>
                      <p className='text-primary font-bold'>{`$${image?.price}`}</p>
                      <Badge variant='outline' className=' font-bold'>
                        {getBadgeLabel(image)}
                      </Badge>
                    </div>
                    <form className='mt-2'>
                      <Button className='rounded-full px-6'>Add to Cart</Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
