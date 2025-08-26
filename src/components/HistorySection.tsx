import React from 'react';
import { motion } from 'framer-motion';
import { History, Clock, FileText, Trash2, User } from 'lucide-react';
import { Presentation } from '../types';
import { useAuth } from '../context/AuthContext';

interface HistorySectionProps {
  presentations: Presentation[];
  onSelectPresentation: (presentation: Presentation) => void;
  onDeletePresentation: (id: string) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  presentations,
  onSelectPresentation,
  onDeletePresentation
}) => {
  const { user, loading } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderContent = () => {
    if (!user) {
      return (
        <div className="text-center py-10">
          <div className="text-neutral-400 dark:text-neutral-500 mb-3">
            <User className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-neutral-500 dark:text-neutral-400">Sign in to save and view your presentation history.</p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4">Loading history...</p>
        </div>
      );
    }

    if (presentations.length === 0) {
      return (
        <div className="text-center py-10">
          <div className="text-neutral-400 dark:text-neutral-500 mb-3">
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-neutral-500 dark:text-neutral-400">Your generated presentations will appear here.</p>
        </div>
      );
    }

    return (
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {presentations.map((presentation) => (
          <motion.div
            key={presentation.id}
            variants={itemVariants}
            className="flex items-center justify-between p-3 bg-white/30 dark:bg-neutral-800/30 rounded-lg hover:bg-primary-50/80 dark:hover:bg-primary-900/40 transition-all duration-200 transform hover:scale-[1.02] cursor-pointer group"
            onClick={() => onSelectPresentation(presentation)}
          >
            <div className="flex-1 flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 bg-white dark:bg-neutral-700 p-2 rounded-md shadow-sm">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-neutral-900 dark:text-white truncate">
                  {presentation.topic}
                </p>
                <div className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(presentation.createdAt).toLocaleDateString()}</span>
                  <span className="capitalize">• {presentation.style}</span>
                  <span>• {presentation.slides.length} slides</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={(e) => { e.stopPropagation(); onDeletePresentation(presentation.id); }}
              className="p-2 text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Delete presentation"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-700/80 shadow-lg rounded-2xl p-6 mt-12">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center space-x-3">
        <History className="h-6 w-6 text-primary" />
        <span>Presentation History</span>
      </h3>
      {renderContent()}
    </div>
  );
};
