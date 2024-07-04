import Header from "@/app/components/Header";
import {auth} from "@/app/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className='flex flex-col'>
      <Header session={session} />
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
