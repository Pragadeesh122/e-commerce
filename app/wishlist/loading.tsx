import FeatureSectionSkeleton from "@/app/components/Skeleton/FeatureSectionSkeleton";
import HeaderSkeletonWithoutSearch from "../components/Skeleton/HeaderWithoutSearchSkeleton";

export default function Loading() {
  return (
    <div className='flex flex-col'>
      <HeaderSkeletonWithoutSearch />
      <main className='flex-1 px-14 bg-muted'>
        <section className='w-full py-10 pt-32'>
          <FeatureSectionSkeleton count={3} />
        </section>
      </main>
    </div>
  );
}
