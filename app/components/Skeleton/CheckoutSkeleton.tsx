// app/components/ui/CheckoutPageSkeleton.tsx
export default function CheckoutPageSkeleton() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-12 border-2 mt-[700px] md:mt-12 rounded-md'>
        <div className='h-8 w-48 bg-gray-200 rounded mx-auto mt-4'></div>
        <div className='px-4 py-4 md:px-12 md:py-12 rounded-md flex flex-col md:flex-row gap-16'>
          <div className='flex-1 overflow-auto px-6 max-h-[60vh]'>
            <div className='h-6 w-36 bg-gray-200 rounded mb-4'></div>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='flex flex-col gap-4 border-2 rounded-md mb-4 px-4 py-2'>
                <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
                <div className='flex justify-between items-end'>
                  <div className='h-12 w-12 bg-gray-200 rounded'></div>
                  <div className='h-4 w-16 bg-gray-200 rounded'></div>
                </div>
              </div>
            ))}
            <div className='mt-8 flex justify-end'>
              <div className='h-6 w-32 bg-gray-200 rounded'></div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='max-w-md mx-auto p-6 bg-white rounded-lg'>
              <form className='bg-white p-2 rounded-md space-y-4'>
                {["Email", "Name", "Address"].map((field) => (
                  <div key={field} className='mb-4'>
                    <div className='h-4 w-20 bg-gray-200 rounded mb-2'></div>
                    <div className='h-10 w-full bg-gray-200 rounded'></div>
                  </div>
                ))}
                <div className='h-40 w-full bg-gray-200 rounded'></div>
                <div className='h-12 w-full bg-gray-200 rounded mt-5'></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
