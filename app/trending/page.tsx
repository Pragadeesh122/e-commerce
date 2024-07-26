import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";

import {getTrendingProducts, getUserByEmail} from "../lib/supabase/helpers";
import {createClient} from "../lib/supabase/server";

export default async function Page() {
  const supabaseServer = createClient();
  const {data} = await supabaseServer.auth.getUser();
  const user = await getUserByEmail(data?.user?.email!);

  const trending = await getTrendingProducts();

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
