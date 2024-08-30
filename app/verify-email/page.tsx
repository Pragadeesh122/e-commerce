import {verifyEmail} from "@/app/lib/actions";
import Spinner from "@/app/components/Spinner";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: {token: string};
}) {
  const token = searchParams.token;
  console.log(token);
  await verifyEmail(token);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Spinner />
    </div>
  );
}
