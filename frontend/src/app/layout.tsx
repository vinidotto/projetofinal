import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import Header from "./header/page";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

const Footer = () => {
  return (
    <footer className="bg-customColor text-white py-4">
      <div className="container mx-auto text-center">@Dotto</div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-colorBg">
              {children}
            </main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
