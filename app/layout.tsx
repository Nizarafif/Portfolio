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
  title: "Nizar Nur Afif — Junior Full Stack Developer | Laravel & React",
  description:
    "Portfolio of Nizar Nur Afif, Junior Full Stack Developer specializing in PHP, Laravel, React, JavaScript, and MySQL. Software Engineering graduate from Politeknik Balekambang Jepara.",
  icons: {
    icon: "/nizar-logo.png",
  },
  keywords: [
    "Nizar Nur Afif",
    "Junior Full Stack Developer",
    "Junior Web Developer",
    "Programmer IT",
    "Laravel Developer",
    "PHP Developer",
    "React Developer",
    "Full Stack Developer Indonesia",
    "Web Developer Kudus",
  ],
  authors: [{ name: "Nizar Nur Afif" }],
  openGraph: {
    title: "Nizar Nur Afif — Junior Full Stack Developer | Laravel & React",
    description:
      "Software Engineering graduate specializing in backend and full-stack web application development with PHP, Laravel, React, and MySQL.",
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
      <body className="font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-emerald-500/25 selection:text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
