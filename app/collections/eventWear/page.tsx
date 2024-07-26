import FeatureSection from "@/app/components/FeatureSection";
import Header from "@/app/components/Header";
import {getEventWear, getUserByEmail} from "@/app/lib/supabase/helpers";
import {createClient} from "@/app/lib/supabase/server";

export default async function Page() {
  const supabaseServer = createClient();
  const {data} = await supabaseServer.auth.getUser();
  const user = await getUserByEmail(data?.user?.email!);

  const eventWears = await getEventWear();

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
