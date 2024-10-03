import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import {
  getMensWear,
  getUserByEmail,
  getUserWishlistProductIds,
} from "@/app/lib/supabase/helpers";

export default async function Page({searchParams}: any) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  let mensWear = await getMensWear();
  if (Object.keys(searchParams).length !== 0) {
    mensWear = mensWear.filter((product) => {
      return product.productName
        .toLowerCase()
        .includes(searchParams["search"]?.toLowerCase());
    });
  }
  const wishlistItemIds = await getUserWishlistProductIds(
    session?.user?.email!
  );

  return (
    <div className='flex flex-col'>
      <Header user={user} products={mensWear} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-20 '>
          <FeatureSection
            wishlistItems={wishlistItemIds!}
            images={mensWear}
            heading='Sophisticated Style for Men'
            subHeading="Men's Fashion Collection"
            description="Explore our curated collection of men's fashion, featuring everything from casual wear to formal attire. Find stylish and comfortable pieces for every occasion."
          />
        </section>
      </main>
    </div>
  );
}
