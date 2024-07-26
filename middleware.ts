// import {auth} from "@/app/lib/auth";

// export const middleware = auth;

// export const config = {
//   matcher: ["/", "/trending", "/recommendations", "/profile", "/checkout"],
// };

import {type NextRequest} from "next/server";
import {updateSession} from "@/app/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/", "/trending", "/recommendations", "/profile", "/checkout"],
};
