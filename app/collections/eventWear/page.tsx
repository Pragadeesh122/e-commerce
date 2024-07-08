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

  const eventWears = await prisma.product.findMany({
    where: {wear: "Event wear"},
  });

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <FeatureSection
            images={eventWears}
            heading='Dazzle at Every Event'
            subHeading='Stunning Event Wear'
            description="Make a statement at your next event with our collection of event wear. Whether it's a wedding, gala, or party, our elegant and stylish outfits will ensure you shine."
          />
        </section>
      </main>
    </div>
  );
}
