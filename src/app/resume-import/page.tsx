"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";

// Avoid importing ResumeDropzone on the server to prevent pdfjs-dist from
// being evaluated during prerender (DOMMatrix is not available in Node).
const ResumeDropzone = dynamic(
  () => import("components/ResumeDropzone").then((m) => m.ResumeDropzone),
  { ssr: false }
);

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
    <main>
      <div className="max-w-3xl px-10 py-10 mx-auto text-center border border-gray-200 rounded-md shadow-md mt-14 dark:border-neutral-800 dark:bg-neutral-900/50">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
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
                />
                <OrDivider />
              </>
            )}
            <h1 className="font-semibold text-gray-900 dark:text-neutral-100">
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
  <div className="mx-[-2.5rem] flex items-center pb-6 pt-8" aria-hidden="true">
    <div className="flex-grow border-t border-gray-200 dark:border-neutral-800" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400 dark:text-gray-500">or</span>
    <div className="flex-grow border-t border-gray-200 dark:border-neutral-800" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <>
  <p className="font-semibold text-gray-900 dark:text-neutral-100">{heading}</p>
      <div className="mt-5">
        <Link
          href="/resume-builder"
          className="outline-theme-blue rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-base font-semibold text-white"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};
