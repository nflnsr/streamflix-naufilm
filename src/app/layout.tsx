import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/provider/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamFlix-NauFilm",
  description: "StreamFlix-NauFilm Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Header />
          <Suspense>{children}</Suspense>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
