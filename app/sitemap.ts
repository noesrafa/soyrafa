import { Post } from "@/types/blog";
import { getAllPosts } from "./lib/blog";

export default async function sitemap() {
  const baseUrl = "https://tudominio.com";
  const posts: Post[] = await getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const routes = ["", "/blog", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));

  return [...routes, ...postUrls];
}
