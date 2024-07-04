import {addProduct} from "../lib/actions";
import {Button} from "./ui/button";

export default function UploadData() {
  return (
    <form action={addProduct}>
      <div className='flex flex-col gap-6'>
        <div>
          <label>Upload Product</label>
        </div>
        <input name='productName' type='text' placeholder='productName' />
        <input name='description' type='text' placeholder='description' />
        <input name='sizes' type='text' placeholder='sizes' />
        <input name='price' type='float' placeholder='price' />
        <input name='image' type='file' accept='image/*' />
        <Button>Submit</Button>
      </div>
    </form>
  );
}
