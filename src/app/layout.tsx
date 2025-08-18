import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import { I18nProvider } from "lib/i18n/Provider";
import { Footer } from "components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata = {
  title: "ZA-Resume - Free South African CV Builder and Parser",
  description:
    "ZA-Resume is a free, open-source, and data-light CV builder tailored for South Africa. Create a professional CV in minutes and test ATS readability with our parser.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" className="dark">
  <head />
  <body className={inter.className}>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const stored = localStorage.getItem('theme');
    // Default to dark unless user explicitly chose light
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch {}
})();`,
          }}
        />
        <I18nProvider>
          <TopNavBar />
          {children}
          <Footer />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
