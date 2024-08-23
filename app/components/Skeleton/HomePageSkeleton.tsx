import HeaderSkeletonWithoutSearch from "./HeaderWithoutSearchSkeleton";

export default function HomePageSkeleton() {
  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderSkeletonWithoutSearch />
      <main className='flex-1 px-8 sm:px-16 md:px-24 bg-muted'>
        <section className='w-full py-10 pt-24 md:pt-36'>
          <div className='grid gap-4'>
            <div className='h-12 w-2/3 bg-gray-200 rounded mx-auto'></div>
            <div className='h-6 w-1/2 bg-gray-200 rounded mx-auto'></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
              {[1, 2, 3].map((item) => (
                <div key={item} className='h-64 bg-gray-200 rounded'></div>
              ))}
            </div>
          </div>
        </section>
        {[1, 2, 3].map((section) => (
          <section key={section} className='w-full py-10'>
            <div className='h-8 w-48 bg-gray-200 rounded mb-6 mx-auto'></div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className='h-48 bg-gray-200 rounded'></div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
