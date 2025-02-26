export const metadata = {
  title: 'Blog | Mi Sitio Web',
  description: 'Artículos sobre tecnología, desarrollo web y más',
  openGraph: {
    title: 'Blog | Mi Sitio Web',
    description: 'Artículos sobre tecnología, desarrollo web y más',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 