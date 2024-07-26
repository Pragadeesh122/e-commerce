import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import {getUserByEmail} from "@/app/lib/supabase/helpers";

export default async function Page() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-20'>
          <div>
            <h1>Summer Essentials</h1>
            <p>Discover the latest Summer wears.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
