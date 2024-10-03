"use client";

import {Heart} from "lucide-react";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {addToWishlist, removeFromWishlist} from "../lib/actions";

export default function WhislistButton({
  imageId,
  isWishlisted: initialWishlistedState,
}: {
  imageId: string;
  isWishlisted: boolean;
}) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(
    initialWishlistedState
  );
  const {data: session} = useSession();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    const realtimeWislistState = !isWishlisted;
    const formData = new FormData();
    formData.set("imageId", imageId);
    formData.set("email", session?.user?.email as string);

    if (realtimeWislistState) {
      console.log("Adding to wishlist");
      await addToWishlist(formData);
    } else {
      console.log("Removing from wishlist");
      await removeFromWishlist(formData);
    }
  };

  return (
    <div
      className='w-10 h-10 rounded-full   bg-muted
       absolute top-[-15px] right-[-10px] z-40 flex items-end justify-start cursor-pointer'
      onClick={handleClick}>
      {isWishlisted ? (
        <div className='ml-2 mb-0.5'>❤️️</div>
      ) : (
        <Heart className='h-4 w-4  text-black  ml-2 mb-1.5' />
      )}
    </div>
  );
}
