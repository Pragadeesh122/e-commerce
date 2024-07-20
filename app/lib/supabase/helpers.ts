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
