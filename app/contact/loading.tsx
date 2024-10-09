import HeaderSkeletonWithoutSearch from "../components/Skeleton/HeaderWithoutSearchSkeleton";

export default function ContactSkeleton() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <HeaderSkeletonWithoutSearch />

      <main className='flex-grow container mx-auto px-4 py-12 mt-24'>
        <div className='h-12 w-3/4 bg-gray-200 rounded mx-auto mb-4'></div>
        <div className='h-6 w-1/2 bg-gray-200 rounded mx-auto mb-12'></div>

        <div className='grid md:grid-cols-2 gap-12'>
          <div className='bg-white p-8 rounded-xl shadow-lg'>
            <div className='h-8 w-3/4 bg-gray-200 rounded mb-6'></div>
            <div className='space-y-4'>
              {[1, 2, 3, 4, 5].map((input) => (
                <div key={input} className='space-y-1'>
                  <div className='h-4 w-1/4 bg-gray-200 rounded'></div>
                  <div className='h-10 w-full bg-gray-200 rounded'></div>
                </div>
              ))}
              <div className='h-12 w-full bg-gray-200 rounded'></div>
            </div>
          </div>

          <div className='bg-white p-8 rounded-xl shadow-lg'>
            <div className='h-8 w-3/4 bg-gray-200 rounded mb-6'></div>
            <div className='space-y-6'>
              {[1, 2, 3, 4].map((info) => (
                <div key={info} className='flex items-start'>
                  <div className='w-6 h-6 bg-gray-200 rounded-full mr-3'></div>
                  <div className='flex-1'>
                    <div className='h-6 w-3/4 bg-gray-200 rounded mb-2'></div>
                    <div className='h-4 w-full bg-gray-200 rounded'></div>
                    <div className='h-4 w-full bg-gray-200 rounded'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <div className='h-6 w-1/2 bg-gray-200 rounded mx-auto'></div>
        </div>
      </main>
    </div>
  );
}
