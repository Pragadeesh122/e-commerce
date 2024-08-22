// app/components/ui/CartPageSkeleton.tsx
import HeaderSkeleton from "./HeaderSkeleton";

export default function CartPageSkeleton() {
  return (
    <div className='min-h-screen p-4 bg-gray-100 pt-24 sm:pt-32'>
      <HeaderSkeleton />
      <div className='max-w-3xl mx-auto'>
        <div className='h-8 w-48 bg-gray-200 rounded mb-6'></div>
        <div className='space-y-8'>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className='flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg shadow'>
              <div className='flex items-center'>
                <div className='w-24 h-24 bg-gray-200 rounded'></div>
                <div className='ml-4 flex-1'>
                  <div className='h-6 w-32 bg-gray-200 rounded mb-2'></div>
                  <div className='h-4 w-24 bg-gray-200 rounded mb-2'></div>
                  <div className='h-4 w-20 bg-gray-200 rounded'></div>
                </div>
              </div>
              <div className='h-10 w-32 bg-gray-200 rounded mt-4 sm:mt-0'></div>
            </div>
          ))}
        </div>
        <div className='mt-12'>
          <div className='h-12 w-full bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  );
}
