import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import {
  getKidsWear,
  getUserByEmail,
  getUserWishlistProductIds,
} from "@/app/lib/supabase/helpers";

export default async function Page({searchParams}: any) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);
  const wishlistItemIds = await getUserWishlistProductIds(
    session?.user?.email!
  );

  let kidsWear = await getKidsWear();
  if (Object.keys(searchParams).length !== 0) {
    kidsWear = kidsWear.filter((product) => {
      return product.productName
        .toLowerCase()
        .includes(searchParams["search"]?.toLowerCase());
    });
  }

  return (
    <div className='flex flex-col'>
      <Header user={user} products={kidsWear} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-32'>
          <FeatureSection
            wishlistItems={wishlistItemIds!}
            images={kidsWear}
            heading="Adorable and Stylish Kids' Fashion"
            subHeading="Kids' Wear Collection"
            description="Dress your little ones in the latest styles with our kids' fashion collection. Fun, comfortable, and durable, our outfits are perfect for playtime and special occasions."
          />
        </section>
      </main>
    </div>
  );
}
