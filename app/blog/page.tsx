'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Blog/Breadcrumb';
import SearchBar from '@/components/Blog/SearchBar';
import CategorySelector from '@/components/Blog/CategorySelector';
import Image from 'next/image';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
}

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/posts?${params}`);
      const data = await response.json();
      setPosts(data);
      
      // Update categories only on initial load
      if (categories.length === 0) {
        const uniqueCategories = Array.from(new Set(data.map((post: Post) => post.category)));
        setCategories(uniqueCategories as string[]);
      }
    };

    fetchPosts();
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar onSearch={setSearchQuery} />
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {post.image && (
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{new Date(post.date).toLocaleDateString()}</span>
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

export default BlogPage;
