import {Card, CardContent} from "./ui/card";

type SkeletonProps = {
  count: number;
};

export default function FeatureSectionSkeleton({count}: SkeletonProps) {
  return (
    <section className='w-full py-10 md:py-12 lg:py-16'>
      <div className='grid gap-4'>
        <div className='space-y-3 text-center mb-8'>
          <div className='h-6 bg-gray-200 w-1/4 mx-auto rounded'></div>
          <div className='h-10 bg-gray-200 w-3/4 mx-auto rounded'></div>
          <div className='h-4 bg-gray-200 w-2/3 mx-auto rounded'></div>
        </div>
        <div className='grid gap-x-6 gap-y-12 items-center justify-center grid-cols-[repeat(auto-fit,minmax(150px,270px))]'>
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className='overflow-hidden'>
                <div className='relative w-full h-72'>
                  <div className='absolute inset-0 bg-gray-200'></div>
                </div>
                <CardContent className='p-4'>
                  <div className='flex flex-col gap-4'>
                    <div className='h-10 bg-gray-200 rounded'></div>
                    <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
                    <div className='flex justify-between'>
                      <div className='h-6 w-1/4 bg-gray-200 rounded'></div>
                      <div className='h-6 w-1/4 bg-gray-200 rounded'></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
