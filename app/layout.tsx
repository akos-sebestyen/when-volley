"use client";

import localFont from "next/font/local";
import "./globals.css";
import Search from "@/app/search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WJ6RZNER1B"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-WJ6RZNER1B');`,
          }}
        ></script>
      </head>
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
          <footer className="bg-gray-100 text-gray-800 py-4 flex items-center justify-center mt-5 w-full">
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
