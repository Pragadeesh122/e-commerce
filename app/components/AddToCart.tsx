"use client";

import {useState} from "react";
import {Button} from "./ui/button";
import SizeButton from "./SizeButton";
import {addToCart} from "../lib/actions";

export default function AddToCart({
  product,
  userId,
}: {
  product: {
    id: string;
    productName: string;
    price: number;
    description: string;
    size: string[];
    images: string[];
    quantity: number;
  };
  userId: string;
}) {
  const [size, setSize] = useState<string>("");
  const [productQuantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [response, setResponse] = useState<{error: string} | null>();

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prevQuantity) => {
      if (type === "increment") {
        return prevQuantity + 1;
      } else if (type === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setPending(true);
      event.preventDefault();
      const formData = new FormData();
      formData.append("productId", product.id);
      formData.append("userId", userId);
      formData.append("quantity", productQuantity.toString());
      formData.append("size", selectedSize);

      const res = await addToCart(formData);
      if (res?.error) {
        setResponse(res);
      } else {
        setTimeout(() => setPending(false), 1000);
        return;
      }
    } finally {
      if (pending) setPending(false);
    }
  }

  return (
    <div className='flex-1 flex flex-col gap-6 px-6 lg:px-0'>
      <h1 className='text-xl sm:text-3xl font-bold'>{product?.productName}</h1>
      <p className='text-gray-600 font-semibold'>Formal Wear</p>
      <p className='text-lg sm:text-xl font-semibold'>{`$${product?.price}`}</p>
      <p className='text-gray-600 text-md sm:text-lg'>{product?.description}</p>
      <div className='mb-4 flex gap-6 items-center lg:block'>
        <p className='text-gray-600 lg:mb-4 text-md font-medium sm:text-md'>
          Quantity:
        </p>
        <div className='flex items-center space-x-2'>
          <button
            disabled={productQuantity === 1}
            className='px-2 text-4xl disabled:text-gray-500'
            onClick={() => handleQuantityChange("decrement")}>
            -
          </button>
          <span className='border-2 px-4 py-2 rounded-md'>
            {productQuantity}
          </span>
          <button
            disabled={productQuantity === product.quantity}
            className='px-2 text-2xl disabled:text-gray-500'
            onClick={() => handleQuantityChange("increment")}>
            +
          </button>
        </div>
      </div>
      <div className='mb-4'>
        <p className='text-gray-600 font-medium mb-4'>Available Sizes:</p>
        <div className='flex space-x-4'>
          {product?.size.map((size) => (
            <SizeButton
              key={size}
              size={size}
              setSize={setSize}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          ))}
        </div>
        {!size && response?.error && (
          <div className='mt-4 text-red-500'>Please select a size</div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <Button
          disabled={pending}
          type='submit'
          className='px-6 py-3 rounded-md w-full disabled:bg-gray-400'>
          {pending ? "Adding..." : "Add to Cart"}
        </Button>
      </form>
    </div>
  );
}
