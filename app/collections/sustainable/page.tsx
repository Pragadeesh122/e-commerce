import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";

import {getCasualWear, getUserByEmail} from "@/app/lib/supabase/helpers";
import {createClient} from "@/app/lib/supabase/server";

export default async function Page() {
  const supabaseServer = createClient();
  const {data} = await supabaseServer.auth.getUser();
  const user = await getUserByEmail(data?.user?.email!);

  const casualWears = await getCasualWear();

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
