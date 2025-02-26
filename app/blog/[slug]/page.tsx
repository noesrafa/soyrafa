import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkImages from 'remark-images';
import rehypeImgSize from 'rehype-img-size';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Blog/Breadcrumb';

// Función para obtener un post específico
export async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Usar gray-matter para parsear el frontmatter
    const { data, content } = matter(fileContents);
    
    // Convertir markdown a HTML con tabla de contenidos
    const processedContent = await remark()
      .use(remarkToc, { heading: 'Contenido' })
      .use(remarkImages)
      .use(remarkRehype)
      .use(rehypeImgSize, { dir: 'public' })
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(content);
      
    const contentHtml = processedContent.toString();
    
    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
      description: data.description,
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error processing blog post:', error);
    throw new Error('Failed to process blog post');
  }
}

// Función para generar rutas estáticas
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map(filename => ({
    slug: filename.replace('.md', ''),
  }));
}

// Metadata dinámica para SEO
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