import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import {
  getUserByEmail,
  getUserWishlistProductIds,
  getWomensWear,
} from "@/app/lib/supabase/helpers";

export default async function Page({searchParams}: {searchParams: any}) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  let womenWears = await getWomensWear();
  if (Object.keys(searchParams).length !== 0) {
    womenWears = womenWears.filter((product) => {
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
      <Header user={user} products={womenWears} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-20'>
          <FeatureSection
            wishlistItems={wishlistItemIds!}
            images={womenWears}
            heading="Chic and Elegant Women's Wear"
            subHeading="Women's Fashion Collection"
            description="Discover the latest trends and timeless classics in our women's fashion collection. From casual dresses to elegant gowns, find the perfect outfit for any occasion."
          />
        </section>
      </main>
    </div>
  );
}
