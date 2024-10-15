"use client";

import localFont from "next/font/local";
import "./globals.css";
import Search from "@/app/search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>when volley??</title>
        <meta
          name="description"
          content="No Frills, just volleyball schedules."
        />

        {/* Favicon link */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/image/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/image/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <QueryClientProvider client={queryClient}>
          <div className="flex-grow">
            <main className="flex-grow">
              <Search />
              {children}
            </main>
          </div>

          {/* Updated Footer with Light Background */}
          <footer className="bg-gray-100 text-gray-800 py-4 flex items-center justify-center mt-auto w-full">
            <a
              href="https://github.com/akos-sebestyen/when-volley"
              className="text-blue-500 hover:underline flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* GitHub Icon as an Image */}
              <img
                src="/icons/github.svg"
                alt="GitHub"
                className="mr-2 h-6 w-6"
              />
            </a>
          </footer>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
