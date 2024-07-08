import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import prisma from "@/app/lib/db";

export default async function Page() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {email: session?.user?.email!},
    select: {name: true, email: true, image: true, id: true},
  });

  const casualWears = await prisma.product.findMany({
    where: {
      wear: "Casual wear",
    },
  });

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <FeatureSection
            images={casualWears}
            heading='Fashion with a Conscience'
            subHeading='Sustainable and Stylish'
            description='Join the movement towards a more sustainable future with our eco-friendly fashion choices. Our sustainable fashion collection combines style, comfort, and ethical production practices.'
          />
        </section>
      </main>
    </div>
  );
}
