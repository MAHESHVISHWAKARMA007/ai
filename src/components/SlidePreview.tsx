import React from 'react';
import { motion } from 'framer-motion';
import { SlideCard } from './SlideCard';
import { Presentation } from '../types';

interface SlidePreviewProps {
  presentation: Presentation | null;
}

export const SlidePreview: React.FC<SlidePreviewProps> = ({ presentation }) => {
  if (!presentation) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="bg-white/40 dark:bg-neutral-800/40 backdrop-blur-lg rounded-2xl p-12 max-w-2xl mx-auto border border-dashed border-neutral-300 dark:border-neutral-700">
          <div className="text-primary-500 mb-4">
            <svg className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Your Slides Await
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Enter a topic and choose a style above, then click 'Generate Slides' to let the AI work its magic.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 my-12"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">
          {presentation.topic}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 capitalize text-lg">
          {presentation.style} Style • {presentation.slides.length} Slides
        </p>
      </div>

      <div id="slides-container">
        {presentation.slides.map((slide, index) => (
          <div key={slide.id} className="print-page-break">
            <SlideCard
              slide={slide}
              index={index}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
