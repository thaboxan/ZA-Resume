import Image from "next/image";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureUSSrc from "public/assets/feature-us.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featureOpenSourceSrc from "public/assets/feature-open-source.svg";
import { Link } from "components/documentation";
import { RevealOnScroll } from "components/animations/RevealOnScroll";
import { Icon3D } from "components/animations/Icon3D";

const FEATURES = [
  {
    src: featureFreeSrc,
    title: "Free Forever",
  text: "ZA-Resume is created with the belief that everyone should have free and easy access to a modern professional resume design",
  },
  {
    src: featureUSSrc,
    title: "SA CV Standards",
    text: "ZA-Resume follows South African CV best practices and is friendly to common ATS systems used locally",
  },
  {
    src: featurePrivacySrc,
    title: "Privacy Focus",
  text: "ZA-Resume stores data locally in your browser so only you have access to your data and with complete control",
  },
  {
    src: featureOpenSourceSrc,
    title: "Open-Source",
    text: (
      <>
    ZA-Resume is an open-source project, and its source code can be viewed
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
    <section className="py-16 lg:py-36">
      <div className="mx-auto lg:max-w-4xl">
        <dl className="grid grid-cols-1 justify-items-center gap-y-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-16">
          {FEATURES.map(({ src, title, text }, idx) => (
            <RevealOnScroll key={title} delay={idx * 0.08}>
              <div className="px-2">
                <div className="relative w-96 self-center pl-16">
                  <dt className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    <Icon3D className="absolute left-0 top-1 h-12 w-12">
                      <Image src={src} className="h-10 w-10" alt="" aria-hidden="true" />
                    </Icon3D>
                    {title}
                  </dt>
                  <dd className="mt-2 text-neutral-700 dark:text-neutral-300">{text}</dd>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </dl>
      </div>
    </section>
  );
};
