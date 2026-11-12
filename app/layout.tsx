import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nizar Nur Afif — Software Engineer",
  description:
    "Personal developer portfolio of Nizar Nur Afif, Software Engineer from Kudus, Indonesia focused on scalable web applications, backend systems, and modern mobile experiences.",
  icons: {
    icon: "/nizar-logo.png",
  },
  openGraph: {
    title: "Nizar Nur Afif — Software Engineer",
    description:
      "Software Engineer passionate about building scalable web applications, robust backend systems, and modern mobile experiences.",
    type: "website",
  },
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[#3B82F6]/30 selection:text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
