import Header from "@/app/components/Header";

import {auth} from "@/app/lib/auth";
import {
  getUserByEmail,
  getUserWishlistProductIds,
  getWishlistProducts,
} from "@/app/lib/supabase/helpers";
import FeatureSection from "../components/FeatureSection";

export default async function Page() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  const wishlistItems = await getWishlistProducts(session?.user?.email!);
  const wishlistItemIds = await getUserWishlistProductIds(
    session?.user?.email!
  );
  

  return (
    <div className='flex flex-col'>
      <Header user={user} render={false} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-20'>
          <FeatureSection
            wishlistItems={wishlistItemIds!}
            images={wishlistItems!}
            heading='Your Wishlist'
            subHeading='Saved Items'
            description='Keep track of your favorite items and future purchases. Manage your wishlist and turn your fashion dreams into reality.'
          />
        </section>
      </main>
    </div>
  );
}
