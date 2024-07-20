import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import {getRecommendedProducts, getUserByEmail} from "../lib/supabase/helpers";

export default async function Page() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  const recommendations = await getRecommendedProducts();
  console.log(recommendations);

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <FeatureSection
            images={recommendations}
            heading='Custom Picks for You'
            subHeading=' Fashion Choices Made for You'
            description='Unlock a collection that’s been tailored to your taste. Our personalized suggestions bring you closer to the looks you love, ensuring you always stay stylish.'
          />
        </section>
      </main>
    </div>
  );
}
