import Link from 'next/link';

interface BreadcrumbProps {
  category?: string;
  title?: string;
}

const Breadcrumb = ({ category, title }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link href="/blog" className="hover:text-gray-700">
        Blog
      </Link>
      
      {category && (
        <>
          <span>/</span>
          <Link 
            href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}
            className="hover:text-gray-700"
          >
            {category}
          </Link>
        </>
      )}
      
      {title && (
        <>
          <span>/</span>
          <span className="text-gray-700">{title}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb; 