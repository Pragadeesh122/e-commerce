// app/api/auth/callback/route.ts
import {createClient} from "@/app/lib/supabase/server";
import {createId} from "@paralleldrive/cuid2";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  console.log("Auth callback hit, code:", code);

  if (code) {
    const supabase = createClient();
    const {data, error} = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      console.log("User authenticated, ID:", data.user.id);
      console.log("User authenticated, Email:", data);
      console.log("user email:", data.user.email);
      // Check if user exists
      const {data: user, error: userError} = await supabase
        .from("User")
        .select()
        .eq("email", data.user.email)
        .single();

      // if (userError) {
      //   console.log("Error fetching user:", userError);
      // }
      if (user) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      console.log("THE DATA RETURNED FROM SUPABASE:", user);
      console.log("THE ERROR IF EXISTS", error);

      if (!user) {
        const {data: newUser, error: newUserError} = await supabase
          .from("User")
          .insert([
            {
              id: createId(),
              email: data.user.email,
              name: data.user.user_metadata.full_name,
              image: data.user.user_metadata.avatar_url,
            },
          ]);

        console.log(newUser);

        if (newUser) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        if (!newUserError) {
          console.error("Error creating user:", newUserError);
          return NextResponse.redirect(new URL("/auth-error", request.url));
        }
      }
    } else {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(new URL("/auth-error", request.url));
    }
  } else {
    console.error("No code found in callback URL");
    return NextResponse.redirect(new URL("/auth-error", request.url));
  }
}
