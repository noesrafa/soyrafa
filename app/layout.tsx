import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Menu from "@/components/Menu";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tudominio.com'),
  title: {
    default: 'Rafael Alexander',
    template: '%s | Rafael Alexander'
  },
  description: 'Rafael Alexander - Full Stack Product Engineer',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://soyrafa.com',
    siteName: 'Rafael Alexander',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rafael Alexander - Full Stack Product Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tuhandle'
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  },
  verification: {
    google: 'tu-codigo-de-verificacion',
  }
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
