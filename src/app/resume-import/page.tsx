"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:py-14">
      <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 px-4 py-8 text-center shadow-md sm:rounded-xl sm:px-8 sm:py-10 md:px-10">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
              Import data from an existing resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a resume yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="You have data saved in browser from prior session"
                  buttonText="Continue where I left off"
                  onReset={() => {
                    localStorage.removeItem("za-cv-state");
                    setHasUsedAppBefore(false);
                  }}
                />
                <OrDivider />
              </>
            )}
            <h1 className="font-semibold text-gray-900">
              Override data with a new resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="mx-[-1rem] flex items-center pb-6 pt-8 sm:mx-[-2rem] md:mx-[-2.5rem]" aria-hidden="true">
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 mt-[-2px] flex-shrink text-base text-gray-400 sm:text-lg">or</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
  onReset,
}: {
  heading: string;
  buttonText: string;
  onReset?: () => void;
}) => {
  return (
    <>
      <p className="px-2 text-sm font-semibold text-gray-900 sm:text-base">{heading}</p>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/resume-builder"
          className="outline-theme-blue w-full rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-sm font-semibold text-white hover:bg-sky-600 sm:w-auto sm:text-base"
        >
          {buttonText}
        </Link>
        {onReset && (
          <button
            onClick={onReset}
            className="outline-theme-blue w-full rounded-full bg-red-500 px-6 pb-2 pt-1.5 text-sm font-semibold text-white hover:bg-red-600 sm:w-auto sm:text-base"
            type="button"
          >
            Reset
          </button>
        )}
      </div>
    </>
  );
};
