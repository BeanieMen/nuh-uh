import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";


const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-manrope-sans",
});


export const metadata: Metadata = {
  title: "Beanie's Portfolio",
  description: "An absolute BANGING portfolio website made with nuxt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
