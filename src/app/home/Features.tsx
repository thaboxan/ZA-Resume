import Image from "next/image";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureUSSrc from "public/assets/feature-us.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featureOpenSourceSrc from "public/assets/feature-open-source.svg";
import { Link } from "components/documentation";

const FEATURES = [
  {
    src: featureFreeSrc,
    title: "Free Forever",
    text: "CareerCraft is created with the belief that everyone should have free and easy access to a modern professional resume design",
  },
  {
    src: featureUSSrc,
    title: "South African Best Practices",
    text: "CareerCraft has built-in best practices for the South African job market and works well with top ATS platforms such as Greenhouse and Lever",
  },
  {
    src: featurePrivacySrc,
    title: "Privacy Focus",
    text: "CareerCraft stores data locally in your browser so only you have access to your data and with complete control",
  },
  {
    src: featureOpenSourceSrc,
    title: "Open-Source",
    text: (
      <>
        CareerCraft is an open-source project, and its source code can be viewed
        by anyone on its{" "}
        <Link href="https://github.com/thaboxan/ZA-Resume">
          GitHub repository
        </Link>
      </>
    ),
  },
];

export const Features = () => {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl lg:max-w-6xl">
        <dl className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {FEATURES.map(({ src, title, text }) => (
            <div className="w-full" key={title}>
              <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg sm:rounded-2xl sm:p-8">
                <div className="flex flex-col">
                  <dt className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 sm:h-14 sm:w-14 sm:rounded-xl">
                        <Image
                          src={src}
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          alt="Feature icon"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
                        {title}
                      </h3>
                    </div>
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base">
                    {text}
                  </dd>
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
