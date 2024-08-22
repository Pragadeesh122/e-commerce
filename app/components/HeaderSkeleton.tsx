// app/components/ui/HeaderSkeleton.tsx
export default function HeaderSkeleton() {
  return (
    <header className='fixed left-0 right-0 top-0 bg-background border-b z-50'>
      <div className='mx-auto flex items-center justify-between gap-10 px-4 md:px-24 py-5'>
        <div className='w-40 h-8 bg-gray-200 rounded'></div>
        <div className='hidden md:flex space-x-4'>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className='w-24 h-6 bg-gray-200 rounded'></div>
          ))}
        </div>
        <div className='hidden sm:block relative flex-1 max-w-sm'>
          <div className='w-full h-10 bg-gray-200 rounded'></div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
          <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
        </div>
      </div>
    </header>
  );
}
