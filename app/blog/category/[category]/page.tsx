import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Blog/Breadcrumb';
import { getPostsByCategory } from '@/lib/posts';

export async function generateStaticParams() {
  // You'll need to implement this to get all categories
  const categories = ['Inteligencia Artificial', 'Desarrollo Web', 'Tecnología'];
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const decodedCategory = decodeURIComponent(params.category);
  const posts = await getPostsByCategory(decodedCategory);
  const displayCategory = posts[0]?.category || decodedCategory;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb category={displayCategory} />
      
      <h1 className="text-3xl font-bold mb-8">
        Artículos en {displayCategory}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <span className="mx-2">•</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 