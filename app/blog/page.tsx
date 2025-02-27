'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Blog/Breadcrumb';
import SearchBar from '@/components/Blog/SearchBar';
import CategorySelector from '@/components/Blog/CategorySelector';
import PostCard from '@/components/Blog/PostCard';
import { Post } from '@/types/blog';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Partial<Post>[]>([]);
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
        const uniqueCategories = Array.from(new Set(data.map((post: Partial<Post>) => post.category)));
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
          <PostCard key={post.slug} post={post as Post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
