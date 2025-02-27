import React from "react";
import Breadcrumb from "@/components/Blog/Breadcrumb";
import { getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/Blog/PostCard";
import { Post } from "@/types/blog";
export async function generateStaticParams() {
  const categories = [
    "Inteligencia Artificial",
    "Desarrollo Web",
    "Tecnología",
  ];
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
        {posts.map((post) => (
          <PostCard key={post.slug} post={post as Post} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
