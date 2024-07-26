"use server";

import prisma from "@/app/lib/db";
import bycrptjs from "bcryptjs";
import {auth, signIn, signOut} from "@/app/lib/auth";
import {validateFormData} from "@/app/data/formDataValidation";
import {
  createCartItem,
  createProduct,
  createUserOrder,
  createUserOrderItem,
  createUserWithOauth,
  getUserByEmail,
  getUserByEmailWithCartItemsAndProducts,
  removeCartItem,
  removeCartItemByUserId,
  updateCartItemQuantity,
  updateCartItemQuantityAlreadyExists,
  updateCartItemSize,
  updateUserProfile,
  uploadImage,
} from "@/app/lib/supabase/helpers";
import {revalidatePath} from "next/cache";
import {createId} from "@paralleldrive/cuid2";
import {create} from "domain";

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

    const product = await createProduct(
      productName as string,
      description as string,
      sizes,
      price as string,
      image
    );

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

  let userUpdateData: any = {
    name: name,
  };

  if (image && image.name !== "undefined") {
    const imageUrl = await uploadImage(image, "profile_images");
    if (!imageUrl) {
      return {error: "Error uploading image"};
    }
    userUpdateData.image = imageUrl;
  }

  if (password) {
    const hashedPassword = bycrptjs.hashSync(password, 10);
    userUpdateData.password = hashedPassword;
  }

  try {
    const session = await auth();
    if (!session) {
      return {error: "You are Unauthorized to update this profile"};
    }
    const userEmail = session?.user?.email as string;
    await updateUserProfile(userEmail, userUpdateData);
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
    const alreadyInCart = await getUserByEmail(session?.user?.email!);

    const cartItem = alreadyInCart?.CartItem?.filter(
      (item) => item.size === size && item.productId === productId
    );

    if (cartItem?.length) {
      cartItem.forEach(async (item) => {
        await updateCartItemQuantityAlreadyExists(item.id, item.quantity + 1);
      });
    }

    if (!cartItem?.length) {
      console.log("Creating new cart item");
      const cartData = {
        productId,
        userId,
        quantity,
        size,
      };
      await createCartItem(cartData);

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
    await removeCartItem(cartItemId);
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
      await updateCartItemSize(cartItemId, size);
      revalidatePath("/cart");
    }
    if (quantity) {
      console.log("Updating quantity");
      await updateCartItemQuantity(cartItemId, quantity);
      revalidatePath("/cart");
    }
  } catch (error: any) {
    console.error("Error updating cart item:", error);
    return {error: "Error updating cart item", details: error.message};
  }
}

export async function createOrder() {
  try {
    const session = await auth();
    console.log("Session:", session);
    if (!session) {
      throw new Error("You are not authorized to perform this action");
    }

    const user = await getUserByEmailWithCartItemsAndProducts(
      session?.user?.email!
    );

    console.log("User:", user);

    if (!user || !user.CartItem.length) {
      throw new Error("No items in the cart");
    }
    console.log(user.CartItem);

    const total = user.CartItem.reduce(
      (acc, item) => acc + item.quantity * item.Product.price,
      0
    );

    const newOrder = await createUserOrder(user.id, total);

    console.log("New Order:", newOrder);

    // Step 2: Create the OrderItems
    const orderItems = user.CartItem.map((cartItem) => ({
      id: createId() as string,
      orderId: newOrder?.id as string,
      productId: cartItem.productId as string,
      quantity: cartItem.quantity as number,
      price: cartItem.Product.price as number,
    }));

    console.log("Order Items:", orderItems);

    orderItems.forEach(async (item) => {
      await createUserOrderItem(item);
    });

    // Step 3: Remove the cart items

    await removeCartItemByUserId(user.id);
    revalidatePath("/orders");
    return {success: true};
  } catch (error: any) {
    console.error("Error creating order:", error);
    return {success: false, error: error.message};
  }
}
