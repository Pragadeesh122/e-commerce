import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import {
  getFormalWear,
  getUserByEmail,
  getUserWishlistProductIds,
} from "@/app/lib/supabase/helpers";

export default async function Page({searchParams}: any) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);
  let formalWears = await getFormalWear();

  if (Object.keys(searchParams).length !== 0) {
    formalWears = formalWears.filter((product) => {
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
      <Header user={user} products={formalWears} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-20'>
          <FeatureSection
            wishlistItems={wishlistItemIds!}
            images={formalWears}
            heading='Elevate Your Formal Attire'
            subHeading='Discover Timeless Elegance'
            description='Step into sophistication with our exclusive collection of formal wear. From classic suits to elegant evening gowns, find the perfect outfit for every formal occasion.'
          />
        </section>
      </main>
    </div>
  );
}
