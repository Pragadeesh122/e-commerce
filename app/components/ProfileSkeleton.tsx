// app/components/ui/ProfilePageSkeleton.tsx
import HeaderSkeleton from "./HeaderSkeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <HeaderSkeleton />
      <div className='flex flex-col gap-6 px-6 sm:px-10 py-4 border-2 min-w-96 rounded-lg'>
        <div className='h-6 w-20 bg-gray-200 rounded'></div>
        {["Name", "Email", "New Password", "Re-enter Password"].map(
          (field, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <div className='h-4 w-32 bg-gray-200 rounded'></div>
              <div className='h-10 w-full bg-gray-200 rounded'></div>
            </div>
          )
        )}
        <div className='flex flex-col gap-3'>
          <div className='h-4 w-40 bg-gray-200 rounded'></div>
          <div className='h-14 w-full bg-gray-200 rounded'></div>
        </div>
        <div className='flex justify-end gap-2'>
          <div className='h-10 w-24 bg-gray-200 rounded'></div>
          <div className='h-10 w-24 bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  );
}
