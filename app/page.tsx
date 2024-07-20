import Image from "next/image";
import {auth} from "@/app/lib/auth";
import UploadData from "./components/UploadData";
import prisma from "./lib/db";
import SectionHeader from "./components/SectionHeader";
import Header from "./components/Header";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import {getImages, getUserByEmail} from "./lib/supabase/helpers";

export default async function Home() {
  const session = await auth();
  const images = await getImages();
  const user = await getUserByEmail(session?.user?.email!);

  const trending = images.filter((product) => product.isTrending);
  const otherSections = images.filter((product) => !product.isTrending);

  const featured = otherSections.slice(0, 4);
  const recommended = otherSections.slice(4, 8);

  const landingImages = images.slice(2, 5);

  return (
    <div className='flex flex-col'>
      <Header user={user} render={false} />
      <main className='flex-1 12px sm:16px md:px-24 bg-muted'>
        <section className='w-full py-10 md:pt-36'>
          <div className='grid gap-4'>
            <SectionHeader
              subHeading='Discover the Latest Fashion Trends'
              description=' Explore our curated collection of the hottest fashion items,
                from stylish dresses to sleek accessories.'
            />
            <div className='grid  items-center justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(150px,380px))]'>
              {landingImages.map((image) => (
                <div key={image.displayImage} className='relative w-full h-96'>
                  <Image
                    src={`${image.displayImage}`}
                    fill
                    alt='Product'
                    className='rounded-lg object-cover hover:scale-105 transition-all duration-300 ease-in-out'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <FeatureSection
          images={featured}
          heading='Featured Collections'
          subHeading='Explore Our Curated Collections'
          description='Discover our expertly curated fashion collections, each
          showcasing the latest trends and styles.'
        />
        <FeatureSection
          images={trending}
          heading='Trending Now'
          subHeading='Stay Ahead with the Latest Trends'
          description=" Dive into our selection of trending styles that are making waves in the fashion world. From bold statement pieces to subtle elegance, find what's hot right now"
        />
        <FeatureSection
          images={recommended}
          heading='Personalized Recommendations'
          subHeading='Tailored Just for You'
          description='Explore fashion picks curated specifically for you. Based on your preferences and past purchases, these recommendations are designed to match your unique style'
        />
      </main>
      {/* <UploadData /> */}
      <Footer />
    </div>
  );
}
