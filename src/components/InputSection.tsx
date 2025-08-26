import React, { useState } from 'react';
import { PresentationStyle } from '../types';
import { Sparkles, ChevronDown } from 'lucide-react';

interface InputSectionProps {
  onGenerate: (topic: string, style: PresentationStyle) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState<PresentationStyle>('professional');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim(), style);
    }
  };

  return (
    <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md shadow-2xl shadow-primary/10 dark:shadow-none rounded-2xl p-8 mb-12 border border-neutral-200 dark:border-neutral-700/80">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
            What's your presentation about?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The Future of Renewable Energy"
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 text-lg transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="style" className="block text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
            Choose a visual style
          </label>
          <div className="relative">
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value as PresentationStyle)}
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white appearance-none text-lg transition-all"
            >
              <option value="professional">Professional</option>
              <option value="minimal">Minimal</option>
              <option value="creative">Creative</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={!topic.trim() || isLoading}
          className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:from-neutral-400 disabled:to-neutral-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-3 text-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Crafting your masterpiece...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-6 w-6" />
              <span>Generate Slides</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
