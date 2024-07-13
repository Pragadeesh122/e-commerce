import {auth} from "@/app/lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/", "/trending", "/recommendations", "/profile", "/checkout"],
};
