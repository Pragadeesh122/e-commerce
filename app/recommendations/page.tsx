import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import prisma from "@/app/lib/db";

export default async function Page() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {email: session?.user?.email!},
    select: {name: true, email: true, image: true, id: true, cartItems: true},
  });

  const recommendations = await prisma.product.findMany({
    where: {
      OR: [{isPopular: true}, {isTopRated: true}, {isOnSale: true}],
    },
  });

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
