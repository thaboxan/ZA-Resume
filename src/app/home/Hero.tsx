"use client";
import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { useT } from "lib/i18n/Provider";
import { motion } from "framer-motion";
import { Particles } from "components/animations/Particles";
import { ScrollProgress } from "components/animations/ScrollProgress";

export const Hero = () => {
  const t = useT();
  return (
    <section className="relative overflow-hidden lg:flex lg:h-[825px] lg:justify-center">
      <ScrollProgress />
      <Particles count={45} />
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
        <motion.h1
          className="text-primary pb-2 text-4xl font-bold lg:text-5xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("hero.title.line1")}
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {t("hero.title.line2")}
          </motion.span>
        </motion.h1>
        <motion.p
          className="mt-3 text-lg lg:mt-5 lg:text-xl text-neutral-800 dark:text-neutral-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <Link href="/resume-import" className="btn-primary mt-6 lg:mt-14">
          {t("hero.cta")} <span aria-hidden="true">→</span>
        </Link>
  <p className="ml-6 mt-3 text-sm text-gray-600 dark:text-gray-300">{t("hero.noSignup")}</p>
  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 lg:mt-36">
          {t("hero.parser.blurb")} {" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            {t("hero.parser.link")}
          </Link>
        </p>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <motion.div
        className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <AutoTypingResume />
      </motion.div>
    </section>
  );
};
