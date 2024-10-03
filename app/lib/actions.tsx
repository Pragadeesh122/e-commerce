"use server";

import bycrptjs from "bcryptjs";
import {auth, signIn, signOut} from "@/app/lib/auth";
import {validateFormData} from "@/app/data/formDataValidation";
import {
  addItemsToWishlist,
  createCartItem,
  createProduct,
  createUserOrder,
  createUserOrderItem,
  createUserWithOauth,
  getUserByEmail,
  getUserByEmailWithCartItemsAndProducts,
  getUserByVerificationToken,
  getUserProfileWithEmail,
  getWishlist,
  removeCartItem,
  removeCartItemByUserId,
  removeWishlistItem,
  updateCartItemQuantity,
  updateCartItemQuantityAlreadyExists,
  updateCartItemSize,
  updateUserProfile,
  updateUserVerificationStatus,
  uploadImage,
} from "@/app/lib/supabase/helpers";
import {revalidatePath, revalidateTag} from "next/cache";
import {createId} from "@paralleldrive/cuid2";
import nodemailer from "nodemailer";
import {redirect} from "next/navigation";

export async function googleSignInAction() {
  await signIn("google", {redirectTo: "/"});
}

export async function githubSignInAction() {
  await signIn("github", {redirectTo: "/"});
}

export async function signOutAction() {
  await signOut({redirectTo: "/login"});
}

async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.USER_GMAIL,
    to: email,
    subject: "Verify Your Email Address for EleganceHub",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
        }
        h1 {
          color: #4a4a4a;
          text-align: center;
        }
        .btn {
          display: inline-block;
          background-color: #3498db;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 0.8em;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to EleganceHub!</h1>
        <p>Thank you for registering with us. To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
        <p style="text-align: center;">
          <a href="${verificationLink}" class="btn">Verify Email Address</a>
        </p>
        <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        <p>${verificationLink}</p>
        <p>This link will expire in 24 hours for security reasons. If you didn't request this verification, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>This is an automated message, please do not reply to this email. If you need assistance, please contact our support team.</p>
        <p>&copy; ${new Date().getFullYear()} EleganceHub. All rights reserved.</p>
      </div>
    </body>
    </html>
  `,
  });
}

export async function verifyEmail(token: string) {
  try {
    const user = await getUserByVerificationToken(token);
    if (!user) {
      return redirect("/login?error=Invalid or expired verification token");
    }

    await updateUserVerificationStatus(user.id, true);

    return redirect(
      "/login?success=Email verified successfully. You can now log in."
    );
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    return redirect(
      "/login?error=An error occurred while verifying your email"
    );
  }
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

  const verificationToken = crypto.randomUUID();

  const userData = {
    name: name,
    email: email,
    password: hashedPassword,
    verificationToken: verificationToken,
    verified: false,
  };

  try {
    console.log("Creating user with OAuth");
    await createUserWithOauth(userData);
    await sendVerificationEmail(email, verificationToken);
  } catch (error: any) {
    console.log("Error creating user:", error.message);
    return {error: "The name or email is already in use"};
  }

  return {
    success:
      "User successfully created. Please check your email to verify your account.",
  };
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

    if (!session) {
      return {error: "You are not authorized to perform this action"};
    }

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
      // revalidateTag("user-by-email");
      revalidatePath("/products/[productId]", "page");
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return {error: "Error adding to cart", details: error.message};
  }
}

export async function addToWishlist(formData: FormData) {
  const imageId = formData.get("imageId") as string;
  const email = formData.get("email") as string;
  try {
    const session = await auth();
    if (!session) {
      return {error: "You are not authorized to perform this action"};
    }

    const user = await getUserProfileWithEmail(email);
    if (!user) {
      return {error: "User not found"};
    }

    await addItemsToWishlist(user.id, imageId);
    revalidatePath("/wishlist", "page");
  } catch (error: any) {
    console.error("Error adding to wishlist:", error);
    return {error: "Error adding to wishlist", details: error.message};
  }
}

export async function removeFromWishlist(formData: FormData) {
  const imageId = formData.get("imageId") as string;
  const email = formData.get("email") as string;
  try {
    const session = await auth();
    if (!session) {
      return {error: "You are not authorized to perform this action"};
    }

    const user = await getUserProfileWithEmail(email);
    if (!user) {
      return {error: "User not found"};
    }
    const wishlistItem = await getWishlist(user.id, imageId);
    if (!wishlistItem) {
      return {error: "Wishlist item not found"};
    }
    await removeWishlistItem(wishlistItem.id);
    revalidatePath("/wishlist", "page");
  } catch (error: any) {
    console.error("Error removing from wishlist:", error);
    return {error: "Error removing from wishlist", details: error.message};
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

    await removeCartItemByUserId(user.id);
    revalidatePath("/orders");
    return {success: true};
  } catch (error: any) {
    console.error("Error creating order:", error);
    return {success: false, error: error.message};
  }
}
