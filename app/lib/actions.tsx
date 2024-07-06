"use server";

import prisma from "@/app/lib/db";
import bycrptjs from "bcryptjs";
import {Prisma} from "@prisma/client";

import {auth, signIn, signOut} from "@/app/lib/auth";
import {validateFormData} from "@/app/data/formDataValidation";
import {uploadImage} from "@/app/lib/supabase/helpers";
import {revalidatePath} from "next/cache";

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

  const validation = validateFormData(password, name, email);

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
    const image = await uploadImage(imageFile, "product_images");
    if (!image) {
      return {error: "Error uploading image"};
    }

    const product = await prisma.product.create({
      data: {
        productName: productName as string,
        description: description as string,
        size: sizes as string[],
        price: parseFloat(price as string),
        displayImage: image,
        wear: "casual",
      },
    });

    if (!product) {
      return {error: "Error creating product"};
    }
    return {success: true};
  } catch (error: any) {
    console.error("Error creating product:", error);
    return {error: "Error creating product", details: error.message};
  }
}

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const passwordCheck = formData.get("passwordCheck") as string;
  const image = formData.get("image") as File;

  if (password) {
    if (password !== passwordCheck) {
      return {error: "Passwords do not match"};
    }
  }

  const validation = validateFormData(password, name);
  if (validation !== "passed") {
    return {error: validation};
  }

  let user: Prisma.UserUpdateInput = {
    name: name as string,
  };
  let userImage: string = "";

  if (!(image?.name === "undefined")) {
    const imageUrl = await uploadImage(image, "profile_images");
    if (!imageUrl) {
      return {error: "Error uploading image"};
    }
    user = {
      ...user,
      image: imageUrl as string,
    };
  }

  if (password) {
    const hashedPassword = bycrptjs.hashSync(password, 10);
    user = {
      ...user,
      password: hashedPassword as string,
    };
  }

  try {
    const session = await auth();
    if (!session) {
      return {error: "You are Unauthorized to update this profile"};
    }
    const userEmail = session?.user?.email as string;
    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: user,
    });
    revalidatePath("/profile");
    return {success: "Profile updated successfully"};
  } catch (err: any) {
    return {error: "Error updating profile", details: err.message};
  }
}
