import HeaderSkeletonWithoutSearch from "../components/Skeleton/HeaderWithoutSearchSkeleton";

export default function AboutSkeleton() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <HeaderSkeletonWithoutSearch />

      <main className='flex-grow container mx-auto px-4 py-12 mt-24'>
        <div className='h-12 w-3/4 bg-gray-200 rounded mx-auto mb-12'></div>

        <div className='grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-xl shadow-lg'>
          <div className='w-full h-[400px] bg-gray-200 rounded-lg'></div>
          <div className='space-y-6'>
            <div className='h-8 w-3/4 bg-gray-200 rounded'></div>
            <div className='h-4 w-full bg-gray-200 rounded'></div>
            <div className='h-4 w-full bg-gray-200 rounded'></div>
            <div className='h-8 w-3/4 bg-gray-200 rounded'></div>
            <div className='h-4 w-full bg-gray-200 rounded'></div>
            <div className='h-4 w-full bg-gray-200 rounded'></div>
          </div>
        </div>

        <div className='mt-16 space-y-12'>
          {[1, 2, 3, 4].map((section) => (
            <section
              key={section}
              className='bg-white p-8 rounded-xl shadow-lg'>
              <div className='h-8 w-1/2 bg-gray-200 rounded mb-6'></div>
              <div className='space-y-4'>
                <div className='h-4 w-full bg-gray-200 rounded'></div>
                <div className='h-4 w-full bg-gray-200 rounded'></div>
                <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
              </div>
            </section>
          ))}

          <section className='bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-xl shadow-lg text-center'>
            <div className='h-8 w-1/2 bg-gray-200 rounded mx-auto mb-6'></div>
            <div className='h-4 w-3/4 bg-gray-200 rounded mx-auto mb-8'></div>
            <div className='h-12 w-48 bg-gray-200 rounded-full mx-auto'></div>
          </section>
        </div>
      </main>
    </div>
  );
}
