"use client";
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

type Locale = "en-ZA" | "af" | "zu" | "xh";

type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = {
  "en-ZA": {
    "app.title": "ZA-Resume - Free South African CV Builder & Parser",
    "hero.title.line1": "Create a professional",
    "hero.title.line2": "CV easily",
    "hero.subtitle": "A free, open-source, data-light CV builder for South Africa",
    "hero.cta": "Create CV",
    "hero.noSignup": "No sign up required",
    "hero.parser.link": "CV parser",
    "hero.parser.blurb": "Already have a CV? Test its ATS readability with the ",
    "nav.builder": "Builder",
    "nav.parser": "Parser",
    "profile.name": "Name",
    "profile.objective": "Objective",
    "profile.email": "Email",
    "profile.phone": "Phone (+27)",
    "profile.website": "Website",
    "profile.location": "Location (City, Province)",
  "error.title": "Something went wrong",
  "error.retry": "Try again",
  "error.home": "Go home",
  },
  af: {
    "app.title": "ZA-Resume - Gratis Suid-Afrikaanse CV Bouer & Parser",
    "hero.title.line1": "Skep 'n professionele",
    "hero.title.line2": "CV maklik",
    "hero.subtitle": "'n Gratis, oopbronk, databewuste CV-bouer vir Suid-Afrika",
    "hero.cta": "Skep CV",
    "hero.noSignup": "Geen aanmelding nodig nie",
    "hero.parser.link": "CV ontleder",
    "hero.parser.blurb": "Het jy reeds 'n CV? Toets sy ATS-leesbaarheid met die ",
    "nav.builder": "Bouer",
    "nav.parser": "Ontleder",
    "profile.name": "Naam",
    "profile.objective": "Doelwit",
    "profile.email": "E-pos",
    "profile.phone": "Foon (+27)",
    "profile.website": "Webwerf",
    "profile.location": "Ligging (Stad, Provinsie)",
  "error.title": "Iets het verkeerd geloop",
  "error.retry": "Probeer weer",
  "error.home": "Gaan tuis",
  },
  zu: {
    "app.title": "ZA-Resume - Ibhilida ye-CV yaseNingizimu Afrika yamahhala",
    "hero.title.line1": "Yakha i",
    "hero.title.line2": "CV yobungcweti kalula",
    "hero.subtitle": "I-CV builder yamahhala, evulekile, esindayo kudatha eNingizimu Afrika",
    "hero.cta": "Yakha i-CV",
    "hero.noSignup": "Akudingi ukubhalisa",
    "hero.parser.link": "ihumushi le-CV",
    "hero.parser.blurb": "Usunayo i-CV? Hlola ukufundeka kwayo kwe-ATS nge- ",
    "nav.builder": "Umakhi",
    "nav.parser": "Ihumushi",
    "profile.name": "Igama",
    "profile.objective": "Inhloso",
    "profile.email": "I-imeyili",
    "profile.phone": "Ucingo (+27)",
    "profile.website": "Iwebhusayithi",
    "profile.location": "Indawo (Idolobha, Isifundazwe)",
  "error.title": "Kunento engahambanga kahle",
  "error.retry": "Zama futhi",
  "error.home": "Buyela ekhaya",
  },
  xh: {
    "app.title": "ZA-Resume - Isakhi se-CV saseMzantsi Afrika sasimahla",
    "hero.title.line1": "Yenza i",
    "hero.title.line2": "CV yobungcali lula",
    "hero.subtitle": "Isakhi se-CV simahla, esivulelekileyo, esigcina idatha eMzantsi Afrika",
    "hero.cta": "Yenza i-CV",
    "hero.noSignup": "Akukho bhaliso luyimfuneko",
    "hero.parser.link": "umhlalutyi we-CV",
    "hero.parser.blurb": "Unayo sele i-CV? Vavanya ukufundeka kwayo kwe-ATS nge- ",
    "nav.builder": "Umakhi",
    "nav.parser": "Umhlalutyi",
    "profile.name": "Igama",
    "profile.objective": "Iinjongo",
    "profile.email": "Imeile",
    "profile.phone": "Ifowuni (+27)",
    "profile.website": "Iwebhusayithi",
    "profile.location": "Indawo (Isixeko, iPhondo)",
  "error.title": "Kukho into engahambanga kakuhle",
  "error.retry": "Zama kwakhona",
  "error.home": "Buya ekhaya",
  },
};

const I18nContext = createContext<{ locale: Locale; t: (k: string) => string; setLocale: (l: Locale)=>void } | null>(null);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en-ZA");

  useEffect(() => {
    const fromStorage = typeof window !== "undefined" ? (localStorage.getItem("locale") as Locale | null) : null;
    if (fromStorage && dictionaries[fromStorage]) setLocale(fromStorage);
  }, []);

  const value = useMemo(() => {
    const dict = dictionaries[locale] || dictionaries["en-ZA"];
    const t = (k: string) => dict[k] ?? k;
    return { locale, t, setLocale: (l: Locale) => { localStorage.setItem("locale", l); setLocale(l); } };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useT = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used within I18nProvider");
  return ctx.t;
};

export const useLocale = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLocale must be used within I18nProvider");
  return { locale: ctx.locale, setLocale: ctx.setLocale };
};
