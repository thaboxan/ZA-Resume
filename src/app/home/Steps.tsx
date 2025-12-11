const STEPS = [
  { title: "Add a resume pdf", text: "or create from scratch" },
  { title: "Preview design", text: "and make edits" },
  { title: "Download new resume", text: "and apply with confidence" },
];

export const Steps = () => {
  return (
    <section className="mx-4 mt-8 rounded-xl border border-gray-200 bg-white px-4 py-8 shadow-sm sm:mx-6 sm:rounded-2xl sm:px-8 sm:pb-12 sm:pt-10 md:mx-8 lg:mt-2">
      <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
        3 Simple Steps
      </h1>
      
      <div className="mt-8 flex justify-center sm:mt-10">
        <dl className="flex flex-col gap-y-8 sm:gap-y-12 lg:flex-row lg:justify-center lg:gap-x-16">
          {STEPS.map(({ title, text }, idx) => (
            <div className="relative self-start pl-14 sm:pl-16 lg:pl-14" key={idx}>
              <dt className="text-base font-bold text-gray-900 sm:text-lg">
                <div className="absolute left-0 top-0 flex h-10 w-10 select-none items-center justify-center sm:h-12 sm:w-12">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white shadow-lg sm:h-12 sm:w-12 sm:text-2xl">
                    {idx + 1}
                  </div>
                </div>
                {title}
              </dt>
              <dd className="mt-2 text-sm text-gray-600 sm:text-base">{text}</dd>
              
              {idx < STEPS.length - 1 && (
                <div className="absolute left-5 top-12 hidden h-px w-32 bg-gray-300 sm:left-6 sm:top-14 lg:block" />
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
