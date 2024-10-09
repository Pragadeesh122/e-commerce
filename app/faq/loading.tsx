import React from "react";
import HeaderSkeletonWithoutSearch from "../components/Skeleton/HeaderWithoutSearchSkeleton";

export default function FAQSkeleton() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <HeaderSkeletonWithoutSearch />

      <main className='flex-grow container mx-auto px-4 py-12 mt-24'>
        <div className='h-12 w-3/4 bg-gray-200 rounded mx-auto mb-12'></div>

        <div className='max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className='mb-6'>
              <div className='h-6 w-full bg-gray-200 rounded mb-2'></div>
              <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
            </div>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <div className='h-6 w-1/2 bg-gray-200 rounded mx-auto mb-4'></div>
          <div className='h-10 w-48 bg-gray-200 rounded-full mx-auto'></div>
        </div>
      </main>
    </div>
  );
}
