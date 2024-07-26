import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";

import {getUserByEmail} from "../lib/supabase/helpers";
import {createClient} from "../lib/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const {data} = await supabase.auth.getUser();
  const user = await getUserByEmail(data?.user?.email!);

  return (
    <div className='flex items-center justify-center h-screen'>
      <Header user={user} userAccount={false} render={false} />
      <ProfileForm user={user} />
    </div>
  );
}
