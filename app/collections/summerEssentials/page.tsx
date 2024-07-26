import Header from "@/app/components/Header";

import prisma from "@/app/lib/db";
import {getUserByEmail} from "@/app/lib/supabase/helpers";
import {createClient} from "@/app/lib/supabase/server";

export default async function Page() {
  const supabaseServer = createClient();
  const {data} = await supabaseServer.auth.getUser();
  const user = await getUserByEmail(data?.user?.email!);

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-20'>
          <div>
            <h1>Summer Essentials</h1>
            <p>Discover the latest Summer wears.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
