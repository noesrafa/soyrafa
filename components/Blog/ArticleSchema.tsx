import { Post } from '@/types/blog'

interface ArticleSchemaProps {
  post: Post
}

const ArticleSchema = ({ post }: ArticleSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Tu Nombre',
      url: 'https://tudominio.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tu Sitio Web',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tudominio.com/logo.png'
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ArticleSchema 