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

export async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
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

export async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map(filename => ({
    slug: filename.replace('.md', ''),
  }));
} 