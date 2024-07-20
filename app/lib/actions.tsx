"use server";

import prisma from "@/app/lib/db";
import bycrptjs from "bcryptjs";
import {Prisma} from "@prisma/client";

import {auth, signIn, signOut} from "@/app/lib/auth";
import {validateFormData} from "@/app/data/formDataValidation";
import {createUserWithOauth, uploadImage} from "@/app/lib/supabase/helpers";
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

  const userData = {name: name, email: email, password: hashedPassword};

  try {
    await createUserWithOauth(userData);
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

    const productData = {
      productName: productName as string,
      description: description as string,
      size: sizes as string[],
      price: parseFloat(price as string),
      displayImage: image,
      wear: "casual",
    };

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

export async function addToCart(formData: FormData) {
  const productId = formData.get("productId") as string;
  const userId = formData.get("userId") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const size = formData.get("size") as string;

  if (!size) {
    return {error: "Please select a size"};
  }

  try {
    const session = await auth();
    const alreadyInCart = await prisma.user.findFirst({
      where: {
        email: session?.user?.email!,
      },
      include: {
        cartItems: true,
      },
    });

    const cartItem = alreadyInCart?.cartItems?.filter(
      (item) => item.size === size && item.productId === productId
    );

    if (cartItem?.length) {
      cartItem.forEach(async (item) => {
        await prisma.cartItem.update({
          where: {
            id: item.id,
          },
          data: {
            quantity: item.quantity + quantity,
          },
        });
      });
    }

    if (!cartItem?.length) {
      console.log("Creating new cart item");
      await prisma.cartItem.create({
        data: {
          product: {
            connect: {
              id: productId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          quantity,
          size,
        },
      });

      revalidatePath("/products/[productId]", "page");
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return {error: "Error adding to cart", details: error.message};
  }
}

export async function removeFromCart(formData: FormData) {
  const cartItemId = formData.get("cartId") as string;
  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
    revalidatePath("/cart");
  } catch (error: any) {
    console.error("Error removing from cart:", error);
    return {error: "Error removing from cart", details: error.message};
  }
}

export async function updateCartItem(formData: FormData) {
  const cartItemId = formData.get("cartId") as string;
  const size = formData.get("size") as string;
  const quantity = parseInt(formData.get("quantity") as string) + 1;

  try {
    if (size) {
      console.log("Updating size");
      await prisma.cartItem.update({
        where: {
          id: cartItemId,
        },
        data: {
          size,
        },
      });
    }
    if (quantity) {
      console.log("Updating quantity");
      await prisma.cartItem.update({
        where: {
          id: cartItemId,
        },
        data: {
          quantity,
        },
      });
    }
  } catch (error: any) {
    console.error("Error updating cart item:", error);
    return {error: "Error updating cart item", details: error.message};
  }
}

export async function createOrder() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You are not authorized to perform this action");
    }

    const user = await prisma.user.findUnique({
      where: {email: session?.user?.email!},
      include: {cartItems: {include: {product: true}}},
    });

    if (!user || !user.cartItems.length) {
      throw new Error("No items in the cart");
    }

    const total = user.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    // Step 1: Create the Order
    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        total,
      },
    });

    // Step 2: Create the OrderItems
    const orderItems = user.cartItems.map((cartItem) => ({
      orderId: newOrder.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      price: cartItem.product.price,
    }));

    await prisma.orderItem.createMany({data: orderItems});

    // Clear the cart
    await prisma.cartItem.deleteMany({where: {userId: user.id}});
    return {success: true};
  } catch (error: any) {
    console.error("Error creating order:", error);
    return {success: false, error: error.message};
  }
}
