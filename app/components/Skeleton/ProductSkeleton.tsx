// app/components/ui/ProductPageSkeleton.tsx
import HeaderSkeleton from "./HeaderSkeleton";
import HeaderSkeletonWithoutSearch from "./HeaderWithoutSearchSkeleton";

export default function ProductPageSkeleton() {
  return (
    <div className='max-w-7xl mx-auto p-6 flex items-center justify-center h-screen'>
      <HeaderSkeletonWithoutSearch />
      <div className='flex flex-col py-6 mt-64 sm:mt-0 gap-20 lg:flex-row border-2 sm:py-12 sm:px-24 rounded-xl'>
        {/* Image Carousel Skeleton */}
        <div className='flex-1 px-12'>
          <div className='relative w-full h-[520px] bg-gray-200 rounded-lg'></div>
          <div className='flex justify-center mt-4 space-x-2'>
            <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
            <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
          </div>
        </div>

        {/* Product Information Skeleton */}
        <div className='flex-1 flex flex-col gap-6 px-6 lg:px-0'>
          <div className='h-10 w-3/4 bg-gray-200 rounded'></div>
          <div className='h-6 w-1/2 bg-gray-200 rounded'></div>
          <div className='h-8 w-1/4 bg-gray-200 rounded'></div>
          <div className='h-24 w-full bg-gray-200 rounded'></div>

          {/* Quantity Selector Skeleton */}
          <div className='mb-4 flex gap-6 items-center lg:block'>
            <div className='h-6 w-20 bg-gray-200 rounded'></div>
            <div className='flex items-center space-x-2 mt-2'>
              <div className='w-8 h-8 bg-gray-300 rounded'></div>
              <div className='w-12 h-8 bg-gray-200 rounded'></div>
              <div className='w-8 h-8 bg-gray-300 rounded'></div>
            </div>
          </div>

          {/* Size Selector Skeleton */}
          <div className='mb-4'>
            <div className='h-6 w-32 bg-gray-200 rounded mb-2'></div>
            <div className='flex space-x-4'>
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className='w-12 h-12 bg-gray-200 rounded'></div>
              ))}
            </div>
          </div>

          {/* Add to Cart Button Skeleton */}
          <div className='h-12 w-full bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  );
}
