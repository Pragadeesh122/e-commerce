import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import {auth} from "../lib/auth";
import prisma from "../lib/db";

export default async function Page() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {name: true, email: true, image: true, id: true, cartItems: true},
  });

  return (
    <div className='flex items-center justify-center h-screen'>
      <Header user={user} userAccount={false} render={false} />
      <ProfileForm user={user} />
    </div>
  );
}
