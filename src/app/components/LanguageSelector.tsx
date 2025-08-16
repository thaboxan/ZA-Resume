"use client";
import { useLocale } from "lib/i18n/Provider";

const options = [
  { value: "en-ZA", label: "English (ZA)" },
  { value: "af", label: "Afrikaans" },
  { value: "zu", label: "Zulu" },
  { value: "xh", label: "Xhosa" },
] as const;

export const LanguageSelector = () => {
  const { locale, setLocale } = useLocale();
  return (
    <select
      aria-label="Select language"
      className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
