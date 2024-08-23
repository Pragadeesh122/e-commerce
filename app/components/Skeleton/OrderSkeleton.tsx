// app/components/ui/OrdersPageSkeleton.tsx
import HeaderSkeleton from "./HeaderSkeleton";
import HeaderSkeletonWithoutSearch from "@/app/components/Skeleton/HeaderWithoutSearchSkeleton";

export default function OrdersPageSkeleton() {
  return (
    <div className='min-h-screen flex flex-col pt-32 pb-6 gap-4 items-center justify-center bg-muted'>
      <HeaderSkeletonWithoutSearch />
      <main className='w-full max-w-4xl mx-auto'>
        <div className='h-10 w-48 bg-gray-200 rounded mb-8 mx-auto'></div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3, 4, 5, 6].map((order) => (
            <div key={order} className='bg-white p-4 rounded-lg shadow'>
              <div className='flex justify-between items-center mb-4'>
                <div className='h-6 w-24 bg-gray-200 rounded'></div>
                <div className='h-6 w-16 bg-gray-200 rounded'></div>
              </div>
              <div className='h-4 w-32 bg-gray-200 rounded mb-2'></div>
              <div className='h-4 w-48 bg-gray-200 rounded mb-4'></div>
              <div className='flex justify-end'>
                <div className='h-16 w-16 bg-gray-200 rounded'></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
