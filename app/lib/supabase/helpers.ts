import {supabase} from "./supabase";
import {createId} from "@paralleldrive/cuid2";

export async function uploadImage(file: File, path: string) {
  const imgName = `${Math.random()}-${file.name}`.replaceAll("/", "");
  const {data, error} = await supabase.storage.from(path).upload(imgName, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${path}/${imgName}`;
  return imageUrl;
}

export async function getImages() {
  const {data: images, error} = await supabase
    .from("Product") // assuming your table name is 'products'
    .select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return images;
}

export async function getUserByEmail(email: string) {
  const {data: user, error} = await supabase
    .from("User")
    .select(
      `
    name,
    email,
    image,
    id,
    CartItem (
      id, 
      productId, 
      quantity, 
      size
    )
  `
    )
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return user;
}

export async function getUserByEmailWithCartItemsAndProducts(email: string) {
  const {data: user, error} = await supabase
    .from("User")
    .select(
      `
      id,
      name,
      email,
      image,
      CartItem(*, Product(*))
    `
    )
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return user;
}

export async function getMensWear() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("isMens", true);

  if (error) {
    console.error("Error fetching mens wear:", error.message);
    return [];
  }

  return data;
}

export async function getWomensWear() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("isWomen", true);

  if (error) {
    console.error("Error fetching mens wear:", error.message);
    return [];
  }

  return data;
}

export async function getKidsWear() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("isKids", true);

  if (error) {
    console.error("Error fetching mens wear:", error.message);
    return [];
  }

  return data;
}

export async function getEventWear() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("wear", "Event wear");

  if (error) {
    console.error("Error fetching mens wear:", error.message);
    return [];
  }

  return data;
}

export async function getCasualWear() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("wear", "Casual wear");

  if (error) {
    console.error("Error fetching mens wear:", error.message);
    return [];
  }

  return data;
}

export async function getFormalWear() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("wear", "Formal wear");

  if (error) {
    console.error("Error fetching Formal wear:", error.message);
    return [];
  }

  return data;
}

export async function getTrendingProducts() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("isTrending", true);

  if (error) {
    console.error("Error fetching Trending wear:", error.message);
    return [];
  }

  return data;
}

export async function getRecommendedProducts() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .or("isTopRated.eq.true,isOnSale.eq.true,isPopular.eq.true");

  if (error) {
    console.error("Error fetching recommended wears:", error.message);
    return [];
  }

  return data;
}

export async function getProductById(id: string) {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  return data;
}

export async function getUser(email: string) {
  const {data, error} = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
  return data;
}

export async function createUserWithOauth(userData: {
  email: string;
  name: string;
  image?: string;
  password?: string;
}) {
  const {data, error} = await supabase
    .from("User")
    .insert([{...userData, id: createId()}]);

  if (error) {
    console.error("Error creating user:", error.message);
    return null;
  }

  return data;
}

export async function getUserByEmailWithOrder(email: string) {
  const {data, error} = await supabase
    .from("User")
    .select(
      `
      id,
      name,
      email,
      image,
        Order (
        *,
        OrderItem (
          *,
          Product (*)
        )
      )
    `
    )
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data;
}

export async function createProduct(
  productName: string,
  description: string,
  sizes: string[],
  price: string,
  image: string
) {
  const {data, error} = await supabase.from("Product").insert([
    {
      id: createId(),
      productName: productName,
      description: description,
      size: sizes,
      price: parseFloat(price),
      displayImage: image,
      wear: "casual",
    },
  ]);

  if (error) {
    console.error("Error creating product:", error.message);
    return null;
  }

  return data;
}

export async function updateUserProfile(
  email: string,
  updateData: {name?: string; image?: string; password?: string}
) {
  const {error} = await supabase
    .from("User")
    .update(updateData)
    .eq("email", email);

  if (error) {
    console.error("Error updating user:", error.message);
    return null;
  }
}

export async function updateCartItemQuantityAlreadyExists(
  id: string,
  quantity: number
) {
  const {error} = await supabase
    .from("CartItem")
    .update({quantity})
    .eq("id", id);

  if (error) {
    console.error("Error updating cart item:", error.message);
    return null;
  }
}

export async function createCartItem(cartData: {
  productId: string;
  userId: string;
  quantity: number;
  size: string;
}) {
  const {data, error} = await supabase
    .from("CartItem")
    .insert([{...cartData, id: createId()}])
    .select();

  if (error) {
    console.error("Error creating cart item:", error.message);
    return null;
  }
}

export async function removeCartItem(id: string) {
  const {data, error} = await supabase.from("CartItem").delete().eq("id", id);

  if (error) {
    console.error("Error removing cart item:", error.message);
    return null;
  }
  console.log("Cart item removed", data);
  return data;
}

export async function updateCartItemSize(id: string, size: string) {
  const {error} = await supabase.from("CartItem").update(size).eq("id", id);

  if (error) {
    console.error("Error updating cart item:", error.message);
    return null;
  }
}

export async function updateCartItemQuantity(id: string, quantity: number) {
  const {error} = await supabase.from("CartItem").update(quantity).eq("id", id);

  if (error) {
    console.error("Error updating cart item:", error.message);
    return null;
  }
}

export async function createUserOrder(userId: string, total: number) {
  const {data, error} = await supabase
    .from("Order")
    .insert([
      {id: createId(), createdAt: new Date().toISOString(), userId, total},
    ])
    .select();

  if (error) {
    console.error("Error creating order:", error.message);
    return null;
  }
  return data[0];
}

export async function createUserOrderItem(
  orderItemData: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
  }[]
) {
  const {data, error} = await supabase
    .from("OrderItem")
    .insert([orderItemData]);

  if (error) {
    console.error("Error creating order item:", error.message);
    return null;
  }
  console.log("Order item created", data);
  return data;
}
