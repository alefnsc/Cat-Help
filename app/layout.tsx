import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from './components/Header/Header';
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat Help",
  description: "Web3 DAPP for Rescued Cats. The page provide interfarce to take test BNB tokens as donation for Rescued Cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./CatHelp.png" />
      </head>
      <body className={inter.className}>

        <Header />
        {children}
        <Footer />

      </body>
    </html>
  );
}
