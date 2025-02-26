import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Blog/Breadcrumb';
import { getAllPosts } from '@/app/lib/blog';
import { getPost } from '@/app/lib/blog';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: `${post.title} | Mi Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Tu Nombre'],
      tags: [post.category],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);
  
  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumb category={post.category} title={post.title} />
      
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          <span className="mx-2">•</span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">{post.category}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600">{post.description}</p>
      </div>
      
      {/* Tabla de contenidos y contenido del artículo */}
      <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:!text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      {/* Navegación entre artículos (opcional) */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between">
          <div>
            {/* Enlace al artículo anterior */}
          </div>
          <div>
            {/* Enlace al artículo siguiente */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage; 