import Image from 'next/image';
import { useState } from 'react';

interface MDImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const MDImage = ({ src, alt, width = 800, height = 400 }: MDImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full my-8">
      <div className={`
        aspect-w-16 aspect-h-9 
        ${isLoading ? 'animate-pulse bg-gray-200' : ''}
      `}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`
            rounded-lg object-cover
            transition-opacity duration-300
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          onLoadingComplete={() => setIsLoading(false)}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {alt && (
        <p className="text-sm text-gray-500 mt-2 text-center italic">{alt}</p>
      )}
    </div>
  );
};

export default MDImage; 