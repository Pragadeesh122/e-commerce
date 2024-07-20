import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import {getUserByEmail} from "../lib/supabase/helpers";

export default async function Page() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  const trending = await prisma.product.findMany({
    where: {
      isTrending: true,
    },
  });

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <FeatureSection
            images={trending}
            heading='Hot Right Now'
            subHeading='Embrace the Current Fashion Craze'
            description='Step into the spotlight with our handpicked styles that everyone is talking about. From the runway to the streets, discover the pieces defining this season.

'
          />
        </section>
      </main>
    </div>
  );
}
