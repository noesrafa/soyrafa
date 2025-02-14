import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Menu from "@/components/Menu";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafael Alexander",
  description: "Rafael Alexander - Full Stack Product Engineer",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
