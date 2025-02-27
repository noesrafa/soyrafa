import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link 
      href={`/blog/${post.slug}`} 
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
  );
};

export default PostCard; 