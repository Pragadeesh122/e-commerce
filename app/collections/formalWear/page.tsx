import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {getFormalWear, getUserByEmail} from "@/app/lib/supabase/helpers";
import {createClient} from "@/app/lib/supabase/server";

export default async function Page() {
  const supabaseServer = createClient();
  const {data} = await supabaseServer.auth.getUser();
  const user = await getUserByEmail(data?.user?.email!);
  const formalWears = await getFormalWear();

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <FeatureSection
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
