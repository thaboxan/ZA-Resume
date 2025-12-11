const STEPS = [
  { title: "Add a resume pdf", text: "or create from scratch" },
  { title: "Preview design", text: "and make edits" },
  { title: "Download new resume", text: "and apply with confidence" },
];

export const Steps = () => {
  return (
    <section className="mx-auto mt-8 rounded-2xl border border-gray-200 bg-white px-8 pb-12 pt-10 shadow-sm lg:mt-2">
      <h1 className="text-center text-3xl font-bold text-gray-900 lg:text-4xl">
        3 Simple Steps
      </h1>
      
      <div className="mt-10 flex justify-center">
        <dl className="flex flex-col gap-y-12 lg:flex-row lg:justify-center lg:gap-x-16">
          {STEPS.map(({ title, text }, idx) => (
            <div className="relative self-start pl-16 lg:pl-14" key={idx}>
              <dt className="text-lg font-bold text-gray-900">
                <div className="absolute left-0 top-0 flex h-12 w-12 select-none items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-2xl font-bold text-white shadow-lg">
                    {idx + 1}
                  </div>
                </div>
                {title}
              </dt>
              <dd className="mt-2 text-gray-600">{text}</dd>
              
              {idx < STEPS.length - 1 && (
                <div className="absolute left-6 top-14 hidden h-px w-32 bg-gray-300 lg:block" />
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
