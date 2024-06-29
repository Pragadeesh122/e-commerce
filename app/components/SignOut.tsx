import {signOutAction} from "@/app/lib/actions";
import {Button} from "@/app/components/ui/button";

export default function SignOut() {
  return (
    <form action={signOutAction}>
      <Button>SignOut</Button>
    </form>
  );
}
