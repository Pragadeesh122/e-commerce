import {supabase} from "./supabase";

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
    console.error("Error fetching mens wear:", error.message);
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
    console.error("Error fetching mens wear:", error.message);
    return [];
  }

  return data;
}

export async function getRecommendedProducts() {
  const {data, error} = await supabase
    .from("Product")
    .select("*")
    .eq("isPopular", true)
    .eq("isTopRated", true)
    .eq("isOnSale", true);

  if (error) {
    console.error("Error fetching mens wear:", error.message);
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
  const {data, error} = await supabase.from("User").insert([userData]);

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
