import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";

export const Hero = () => {
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
        <h1 className="pb-2 text-4xl font-bold lg:text-5xl">
          <span className="text-gray-900">
            Create a professional
          </span>
          <br />
          <span className="text-gray-900">
            resume easily
          </span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 lg:mt-5 lg:text-xl">
          With this free, open-source, and powerful resume builder
        </p>
        <div className="mt-6 inline-block lg:mt-14">
          <Link href="/resume-import" className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl">
            <span>Create Resume</span>
            <span className="transition-transform hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="ml-6 mt-3 text-sm text-gray-500">No sign up required</p>
        <p className="mt-3 text-sm text-gray-600 lg:mt-36">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="font-semibold text-gray-900 underline underline-offset-2 transition-all hover:text-gray-700">
            resume parser
          </Link>
        </p>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
        <AutoTypingResume />
      </div>
    </section>
  );
};
