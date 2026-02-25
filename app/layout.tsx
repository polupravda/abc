import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConditionalHomeButton from "@/app/components/ConditionalHomeButton";
import { Providers } from "@/app/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABC Kids Phonics",
  description: "Learn letter sounds and practice pronunciation!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ConditionalHomeButton />
          {children}
        </Providers>
        <Script
          id="prevent-space-scroll" strategy="afterInteractive">
          {`
            // Global script to prevent space key scrolling
            window.addEventListener('keydown', function(e) {
              if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                return false;
              }
            }, {passive: false});
          `}
        </Script>
      </body>
    </html>
  );
}
