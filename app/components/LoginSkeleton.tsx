// app/components/ui/LoginPageSkeleton.tsx
export default function LoginPageSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col gap-6 px-6 py-8 border-gray-400 border-2 rounded-md'>
        <div className='h-6 w-16 bg-gray-200 rounded mx-auto'></div>
        <div className='flex flex-col gap-4'>
          <div className='h-10 w-72 bg-gray-200 rounded'></div>
          <div className='h-10 w-72 bg-gray-200 rounded'></div>
        </div>
        <div className='h-4 w-48 bg-gray-200 rounded'></div>
        <div className='h-10 w-full bg-gray-200 rounded'></div>
        <div className='flex items-center justify-center'>
          <div className='h-px w-1/3 bg-gray-200'></div>
          <div className='h-4 w-8 bg-gray-200 rounded mx-4'></div>
          <div className='h-px w-1/3 bg-gray-200'></div>
        </div>
        <div className='h-10 w-full bg-gray-200 rounded'></div>
        <div className='h-10 w-full bg-gray-200 rounded'></div>
      </div>
    </div>
  );
}
