// import Spinner from "@/app/components/Spinner";

import HomePageSkeleton from "./components/Skeleton/HomePageSkeleton";

// export default function Loading() {
//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <Spinner />;
//     </div>
//   );
// }

export default function Loading() {
  return <HomePageSkeleton />;
}
