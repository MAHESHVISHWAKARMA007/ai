import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../types';
import { TrendingUp, Users, BarChart3, CheckCircle, Star } from 'lucide-react';
import { ImageLoader } from './ImageLoader';

interface SlideCardProps {
  slide: Slide;
  index: number;
}

export const SlideCard: React.FC<SlideCardProps> = ({ slide, index }) => {
  const getLayoutComponent = () => {
    switch (slide.layout) {
      case 'title': return <TitleLayout slide={slide} />;
      case 'image': return <ImageLayout slide={slide} />;
      case 'split': return <SplitLayout slide={slide} />;
      case 'conclusion': return <ConclusionLayout slide={slide} />;
      case 'detailed': return <DetailedLayout slide={slide} />;
      case 'comparison': return <ComparisonLayout slide={slide} />;
      default: return <ContentLayout slide={slide} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/40 dark:bg-neutral-800/40 backdrop-blur-2xl border border-white/20 dark:border-neutral-700/50 shadow-xl shadow-primary/5 dark:shadow-none rounded-2xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-200/80 dark:border-neutral-700/60 bg-white/30 dark:bg-neutral-800/30">
        <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-semibold px-4 py-1 rounded-full">
          Slide {index + 1}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 capitalize px-3 py-1 bg-neutral-100 dark:bg-neutral-700/50 rounded-full font-medium">
          {slide.layout} Layout
        </span>
      </div>
      
      {getLayoutComponent()}
    </motion.div>
  );
};

const TitleLayout: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="relative h-[500px]">
    <ImageLoader 
      src={slide.imageUrl}
      alt={slide.title}
      className="w-full h-full object-cover"
      placeholderText="Presentation Cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight shadow-black/50 [text-shadow:0_2px_4px_var(--tw-shadow-color)]">{slide.title}</h2>
      {slide.subtitle && (
        <p className="text-xl md:text-2xl font-light mb-6 opacity-90 max-w-3xl shadow-black/50 [text-shadow:0_1px_3px_var(--tw-shadow-color)]">{slide.subtitle}</p>
      )}
    </div>
  </div>
);

const DetailedLayout: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="p-6 md:p-8 space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{slide.title}</h3>
        {slide.subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">{slide.subtitle}</p>}
        
        {slide.detailedContent && (
          <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
            <p>{slide.detailedContent}</p>
          </div>
        )}
      </div>
      
      <div className="lg:col-span-4 space-y-6">
        <ImageLoader
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-56 object-cover rounded-xl shadow-lg"
          placeholderText="Supporting Visual"
        />
        {slide.secondaryImageUrl && (
          <ImageLoader
            src={slide.secondaryImageUrl}
            alt={`${slide.title} data`}
            className="w-full h-40 object-cover rounded-xl shadow-md"
            placeholderText="Data/Chart"
          />
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
      <div>
        <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center">
          <CheckCircle className="h-6 w-6 text-green-500 mr-3" /> Key Insights
        </h4>
        <ul className="space-y-3">
          {slide.bulletPoints.map((point, i) => (
            <li key={i} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2.5"></div>
              <span className="text-base text-neutral-700 dark:text-neutral-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {slide.keyPoints && (
        <div>
          <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 text-primary-500 mr-3" /> Key Metrics
          </h4>
          <ul className="space-y-3">
            {slide.keyPoints.map((point, i) => (
              <li key={i} className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                <span className="text-base font-medium text-primary-800 dark:text-primary-200">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const ImageLayout: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="p-6 md:p-8">
    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{slide.title}</h3>
    {slide.subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">{slide.subtitle}</p>}
    
    <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
      <ImageLoader src={slide.imageUrl} alt={slide.title} className="w-full h-80 object-cover" placeholderText="Main Visual" />
    </div>
    
    {slide.content && <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">{slide.content}</p>}
  </div>
);

const SplitLayout: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 items-center">
    <div>
      <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{slide.title}</h3>
      {slide.subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">{slide.subtitle}</p>}
      
      <ul className="space-y-4">
        {slide.bulletPoints.map((point, i) => (
          <li key={i} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2.5 h-2.5 bg-primary-500 rounded-full mt-2"></div>
            <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
      <ImageLoader src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" placeholderText="Contextual Image" />
    </div>
  </div>
);

const ContentLayout: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="p-6 md:p-8">
    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{slide.title}</h3>
    {slide.subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">{slide.subtitle}</p>}
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ul className="space-y-4">
        {slide.bulletPoints.map((point, i) => (
          <li key={i} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2.5 h-2.5 bg-primary-500 rounded-full mt-2"></div>
            <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
      
      {slide.imageUrl && (
        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
          <ImageLoader src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" placeholderText="Visual Aid" />
        </div>
      )}
    </div>
  </div>
);

const ComparisonLayout: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="p-6 md:p-8">
    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{slide.title}</h3>
    {slide.subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">{slide.subtitle}</p>}
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700/50">
        <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">Advantages</h4>
        <ul className="space-y-3">
          {slide.bulletPoints.slice(0, Math.ceil(slide.bulletPoints.length / 2)).map((point, i) => (
            <li key={i} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-sm text-green-700 dark:text-green-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-700/50">
        <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">Challenges</h4>
        <ul className="space-y-3">
          {slide.bulletPoints.slice(Math.ceil(slide.bulletPoints.length / 2)).map((point, i) => (
            <li key={i} className="flex items-start space-x-3">
              <BarChart3 className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
              <span className="text-sm text-red-700 dark:text-red-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ConclusionLayout: React.FC<{ slide: Slide }> = ({ slide }) => (
  <div className="relative h-[500px]">
    <ImageLoader src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" placeholderText="Final Image" />
    <div className="absolute inset-0 bg-gradient-to-t from-accent-900/80 to-primary-900/50"></div>
    <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white text-center">
      <h3 className="text-4xl md:text-5xl font-extrabold mb-6 shadow-black/50 [text-shadow:0_2px_4px_var(--tw-shadow-color)]">{slide.title}</h3>
      
      <ul className="space-y-4 max-w-2xl">
        {slide.bulletPoints.slice(0, 4).map((point, i) => (
          <li key={i} className="flex items-center space-x-3 text-lg">
            <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span className="opacity-90 shadow-black/50 [text-shadow:0_1px_3px_var(--tw-shadow-color)]">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
