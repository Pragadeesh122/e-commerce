"use server";

import prisma from "@/app/lib/db";
import bycrptjs from "bcryptjs";

import {signIn, signOut} from "@/app/lib/auth";
import {validateFormData} from "@/app/data/formDataValidation";
import {uploadImage} from "@/app/lib/supabase/helpers";

export async function googleSignInAction() {
  await signIn("google", {redirectTo: "/"});
}

export async function githubSignInAction() {
  await signIn("github", {redirectTo: "/"});
}

export async function signOutAction() {
  await signOut({redirectTo: "/login"});
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashedPassword = bycrptjs.hashSync(password, 10);
  console.log("name:", name, "email:", email, "password:", hashedPassword);

  const validation = validateFormData(name, email, password);

  if (validation !== "passed") {
    return {error: validation};
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    return {error: "The name or email is already in use"};
  }

  return {success: "User successfully created"};
}

export async function signInUser(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return response;
  } catch (error: any) {
    return {error: "Invalid Credentials"};
  }
}

export async function addProduct(formData: FormData) {
  const imageFile = formData.get("image") as File;
  const productName = formData.get("productName");
  const description = formData.get("description");
  const sizes = JSON.parse(formData.get("sizes") as string);
  const price = formData.get("price");
  try {
    const image = await uploadImage(imageFile);
    if (!image) {
      return {error: "Error uploading image"};
    }

    const product = await prisma.product.create({
      data: {
        productName: productName as string,
        description: description as string,
        size: sizes as string[],
        price: parseFloat(price as string),
        image,
      },
    });

    if (!product) {
      return {error: "Error creating product"};
    }
    return {success: true};
  } catch (error: any) {
    console.error("Error creating product:", error); // Log the actual error message
    return {error: "Error creating product", details: error.message};
  }
}
