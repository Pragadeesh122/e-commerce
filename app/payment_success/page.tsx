import {redirect} from "next/navigation";
import {createOrder} from "../lib/actions";

export default async function PaymentSuccessPage() {
  const response = await createOrder();
  if (response.success) {
    redirect("/orders");
  }
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='px-4 py-2 border-2 text-xl bg-green-300 rounded-md '>
        Payment Successful
      </div>
    </div>
  );
}
