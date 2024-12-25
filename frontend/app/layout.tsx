import type { Metadata } from "next";
import { Sono } from "next/font/google";
import "./globals.css";

const SonoMono = Sono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Image to ASCII",
  description: "Generate images to an ascii text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SonoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
