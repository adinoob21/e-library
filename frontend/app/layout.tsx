import { Geist } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from './providers'

const geist = Geist({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ITPedia",
  description: "An electronic library with chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geist.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
