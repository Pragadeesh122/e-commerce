export default function SectionHeader({
  heading,
  subHeading,
  description,
}: {
  heading?: string;
  subHeading: string;
  description: string;
}) {
  return (
    <div className='space-y-3 text-center mb-8'>
      {heading && (
        <div className='inline-block border-1 shadow-lg py-2 rounded-full bg-background px-6 text-sm mb-4 font-semibold'>
          {heading}
        </div>
      )}

      <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
        {subHeading}
      </h2>
      <p className='mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
        {description}
      </p>
    </div>
  );
}
