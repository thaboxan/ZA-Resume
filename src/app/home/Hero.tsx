"use client";
import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { useT } from "lib/i18n/Provider";

export const Hero = () => {
  const t = useT();
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
        <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
          {t("hero.title.line1")}
          <br />
          {t("hero.title.line2")}
        </h1>
        <p className="mt-3 text-lg lg:mt-5 lg:text-xl">
          {t("hero.subtitle")}
        </p>
        <Link href="/resume-import" className="btn-primary mt-6 lg:mt-14">
          {t("hero.cta")} <span aria-hidden="true">→</span>
        </Link>
        <p className="ml-6 mt-3 text-sm text-gray-600">{t("hero.noSignup")}</p>
        <p className="mt-3 text-sm text-gray-600 lg:mt-36">
          {t("hero.parser.blurb")} {" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            {t("hero.parser.link")}
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
