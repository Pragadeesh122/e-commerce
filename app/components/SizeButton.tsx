import {cn} from "../lib/utils";
import {Button} from "./ui/button";

export default function SizeButton({
  size,
  setSize,
  selectedSize,
  setSelectedSize,
}: {
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleSize(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSelectedSize(size);
    setSize(size);
  }

  return (
    <button
      onClick={handleSize}
      className={cn(
        "px-4 py-2 rounded-md border-2",
        selectedSize === size ? "bg-blue-300" : ""
      )}>
      {size}
    </button>
  );
}
