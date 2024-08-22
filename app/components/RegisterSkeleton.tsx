// app/components/ui/RegisterPageSkeleton.tsx
export default function RegisterPageSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col gap-6 px-6 py-8 border-gray-400 border-2 rounded-md'>
        <div className='h-6 w-24 bg-gray-200 rounded mx-auto'></div>
        <div className='flex flex-col gap-4'>
          <div className='h-10 w-72 bg-gray-200 rounded'></div>
          <div className='h-10 w-72 bg-gray-200 rounded'></div>
          <div className='h-10 w-72 bg-gray-200 rounded'></div>
        </div>
        <div className='h-10 w-full bg-gray-200 rounded'></div>
        <div className='h-4 w-56 bg-gray-200 rounded'></div>
      </div>
    </div>
  );
}
