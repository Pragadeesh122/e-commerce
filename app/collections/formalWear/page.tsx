import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";
import prisma from "@/app/lib/db";

export default async function Page() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {email: session?.user?.email!},
    select: {name: true, email: true, image: true},
  });

  return (
    <div className='flex flex-col'>
      <Header user={user} />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 md:pt-32'>
          <div>
            <h1>Formal Wear</h1>
            <p>Discover the latest formal wear trends.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
