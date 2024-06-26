"use server";

import {signIn, signOut} from "@/app/lib/auth";

export async function googleSignInAction() {
  await signIn("google", {redirectTo: "/"});
}

export async function githubSignInAction() {
  await signIn("github", {redirectTo: "/"});
}

export async function signOutAction() {
  await signOut({redirectTo: "/login"});
}
