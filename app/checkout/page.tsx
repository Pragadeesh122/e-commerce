import CheckOutForm from "../components/CheckOutForm";
import {getUserByEmailWithCartItemsAndProducts} from "../lib/supabase/helpers";
import {createClient} from "../lib/supabase/server";

export default async function Page() {
  const supabaseServer = createClient();
  const {data} = await supabaseServer.auth.getUser();
  const user = await getUserByEmailWithCartItemsAndProducts(data?.user?.email!);

  return (
    <div className='h-screen flex items-center justify-center'>
      <CheckOutForm cartItems={user?.CartItem} />
    </div>
  );
}
