// import Spinner from "@/app/components/Spinner";

// export default function Loading() {
//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <Spinner />;
//     </div>
//   );
// }

// app/kids/loading.tsx
import HeaderSkeleton from "@/app/components/HeaderSkeleton";
import FeatureSectionSkeleton from "@/app/components/FeatureSectionSkeleton";

export default function Loading() {
  return (
    <div className='flex flex-col'>
      <HeaderSkeleton />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-32'>
          <FeatureSectionSkeleton count={6} />
        </section>
      </main>
    </div>
  );
}
