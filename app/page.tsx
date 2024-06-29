import Image from "next/image";
import {auth} from "@/app/lib/auth";
import SignOut from "@/app/components/SignOut";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div className='px-4 py-2'>
      E-commerce
      <div>
        <span>{session?.user?.name}</span>
        <Image
          src={session?.user?.image ?? ""}
          width={30}
          height={30}
          alt='user_image'
        />
      </div>
      <SignOut />
    </div>
  );
}
