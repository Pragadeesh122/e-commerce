import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";

import {getMensWear, getUserByEmail} from "@/app/lib/supabase/helpers";
import {createClient} from "@/app/lib/supabase/server";

export default async function Page() {
  const supabaseServer = createClient();
  const {data} = await supabaseServer.auth.getUser();
  const user = await getUserByEmail(data?.user?.email!);

  const mensWear = await getMensWear();

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <FeatureSection
            images={mensWear}
            heading='Sophisticated Style for Men'
            subHeading="Men's Fashion Collection"
            description="Explore our curated collection of men's fashion, featuring everything from casual wear to formal attire. Find stylish and comfortable pieces for every occasion."
          />
        </section>
      </main>
    </div>
  );
}
