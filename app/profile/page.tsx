import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import {auth} from "../lib/auth";
import {getUserByEmail} from "../lib/supabase/helpers";

export default async function Page() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email!);

  return (
    <div className='flex items-center justify-center h-screen bg-background'>
      <Header user={user} userAccount={false} render={false} />
      <ProfileForm user={user} />
    </div>
  );
}
