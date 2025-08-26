import React from 'react';
import { Heart, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-neutral-600 dark:text-neutral-400 mb-2">
            <Code className="h-4 w-4" />
            <span className="text-sm">Crafted with</span>
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} AI Slide Generator. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
