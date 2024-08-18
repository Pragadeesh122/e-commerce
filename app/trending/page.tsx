import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import {getTrendingProducts, getUserByEmail} from "../lib/supabase/helpers";

export default async function Page({searchParams}: any) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  let trending = await getTrendingProducts();
  if (Object.keys(searchParams).length !== 0) {
    trending = trending.filter((product) => {
      return product.productName
        .toLowerCase()
        .includes(searchParams["search"]?.toLowerCase());
    });
  }

  return (
    <div className='flex flex-col'>
      <Header user={user} products={trending} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-20'>
          <FeatureSection
            images={trending}
            heading='Hot Right Now'
            subHeading='Embrace the Current Fashion Craze'
            description='Step into the spotlight with our handpicked styles that everyone is talking about. From the runway to the streets, discover the pieces defining this season.'
          />
        </section>
      </main>
    </div>
  );
}
