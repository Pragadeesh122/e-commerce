import {supabase} from "./supabase";

export async function uploadImage(file: File) {
  const imgName = `${Math.random()}-${file.name}`.replaceAll("/", "");
  const {data, error} = await supabase.storage
    .from("product_images")
    .upload(imgName, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/product_images/${imgName}`;
  return imageUrl;
}
