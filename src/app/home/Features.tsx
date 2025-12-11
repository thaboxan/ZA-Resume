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
    <section className="py-16 lg:py-24">
      <div className="mx-auto lg:max-w-6xl">
        <dl className="grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-2 lg:gap-8">
          {FEATURES.map(({ src, title, text }) => (
            <div className="w-full max-w-md px-2 lg:max-w-none" key={title}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col">
                  <dt className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                        <Image
                          src={src}
                          className="h-8 w-8"
                          alt="Feature icon"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">
                        {title}
                      </h3>
                    </div>
                  </dt>
                  <dd className="mt-4 leading-relaxed text-gray-600">
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
