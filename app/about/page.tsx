import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {auth} from "@/app/lib/auth";
import {getUserByEmail} from "@/app/lib/supabase/helpers";
import Image from "next/image";
import storeImage from "@/public/storefrontEleganceHub.jpg";
import Link from "next/link";

export default async function AboutPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <Header user={user} render={false} />

      <main className='flex-grow container mx-auto px-4 py-12 mt-24'>
        <h1 className='text-5xl font-bold text-center mb-12 text-gray-800'>
          About EleganceHub
        </h1>

        <div className='grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-xl shadow-lg'>
          <div>
            <Image
              src={storeImage}
              alt='EleganceHub Storefront'
              width={600}
              height={400}
              className='rounded-lg shadow-md'
            />
          </div>

          <div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Elevate Your Style
            </h2>
            <p className='text-md font-semibold text-gray-700 mb-12'>
              EleganceHub: Your destination for sophisticated, high-quality
              fashion. We curate trendsetting pieces that empower you to look
              and feel your best.
            </p>
            <h2 className='text-3xl font-bold text-gray-800 mt-12 mb-2'>
              Our Heritage
            </h2>
            <p className='text-md font-semibold text-gray-700 '>
              Founded on passion and excellence, EleganceHub is the go-to source
              for fashion enthusiasts who value attention to detail and timeless
              elegance.
            </p>
          </div>
        </div>

        <div className='mt-16 space-y-12'>
          <section className='bg-white p-8 rounded-xl shadow-lg'>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>
              Our Mission
            </h2>
            <p className='text-md font-semibold text-gray-700'>
              Empower individual style through curated fashion. We blend the
              latest trends with classic elegance for an unparalleled shopping
              experience.
            </p>
          </section>

          <section className='bg-white p-8 rounded-xl shadow-lg'>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>
              The EleganceHub Difference
            </h2>
            <ul className='space-y-4 text-lg font-medium text-gray-700'>
              {[
                "Expert-Curated Collections",
                "Premium Quality Assurance",
                "Commitment to Sustainability",
                "Exceptional Customer Service",
              ].map((item, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-pink-500 mr-2 text-2xl'>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className='bg-white p-8 rounded-xl shadow-lg'>
            <h2 className='text-3xl font-bold mb-8 text-gray-800'>
              Our Core Values
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              {["Style", "Quality", "Sustainability"].map((value) => (
                <div
                  key={value}
                  className='bg-gray-50 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
                  <h3 className='text-2xl font-semibold mb-3 text-gray-800'>
                    {value}
                  </h3>
                  <p className='text-lg font-medium text-gray-600'>
                    A core principle guiding our business ethos.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className='bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-xl shadow-lg text-center'>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>
              Join Our Community
            </h2>
            <p className='text-md font-semibold text-gray-700 max-w-2xl mx-auto mb-8'>
              Explore EleganceHub collections. From special occasions to
              everyday style, we&apos;re here to elevate your fashion journey.
            </p>
            <Link
              href='/'
              className=' bg-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-pink-600 transition-colors duration-300'>
              Discover EleganceHub
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
