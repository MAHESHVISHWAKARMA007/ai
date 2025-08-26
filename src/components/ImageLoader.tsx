import React, { useState } from 'react';
import { CameraOff } from 'lucide-react';

interface ImageLoaderProps {
  src?: string;
  alt: string;
  className: string;
  placeholderText: string;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className, placeholderText }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!src || hasError) {
    return (
      <div className={`${className} flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-lg`}>
        <CameraOff className="h-12 w-12 mb-2" />
        <span className="text-xs text-center px-2">{placeholderText}</span>
      </div>
    );
  }

  return (
    <div className={`${className} relative bg-neutral-200 dark:bg-neutral-700 overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        crossOrigin="anonymous"
      />
    </div>
  );
};
