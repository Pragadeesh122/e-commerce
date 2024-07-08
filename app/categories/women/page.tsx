import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import prisma from "@/app/lib/db";

export default async function Page() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {email: session?.user?.email!},
    select: {name: true, email: true, image: true},
  });
  const womenWears = await prisma.product.findMany({
    where: {
      isWomen: true,
    },
  });

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <FeatureSection
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
