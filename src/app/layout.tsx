import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import { I18nProvider } from "lib/i18n/Provider";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
