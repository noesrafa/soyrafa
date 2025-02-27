import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getPostsByCategory(category: string) {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      category: data.category,
      description: data.description,
      image: data.image || null,
    };
  });

  return posts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
} 