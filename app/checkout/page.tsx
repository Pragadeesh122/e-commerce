import CheckOutForm from "../components/CheckOutForm";
import {auth} from "../lib/auth";
import {getUserByEmailWithCartItemsAndProducts} from "../lib/supabase/helpers";

export default async function Page() {
  const session = await auth();
  const user = await getUserByEmailWithCartItemsAndProducts(
    session?.user?.email!
  );

  return (
    <div className='max-h-screen flex items-center justify-center bg-background overflow-scroll'>
      <CheckOutForm cartItems={user?.CartItem} />
    </div>
  );
}
