import React, { useState } from 'react';
import { Download, FileText, Presentation as PresentationIcon } from 'lucide-react';
import { exportToPDF, exportToPPT } from '../services/exportService';
import { Presentation as PresentationType } from '../types';

interface ExportSectionProps {
  presentation: PresentationType | null;
}

export const ExportSection: React.FC<ExportSectionProps> = ({ presentation }) => {
  const [isExporting, setIsExporting] = useState<'pdf' | 'ppt' | null>(null);

  const handleExportPDF = async () => {
    if (!presentation) return;
    setIsExporting('pdf');
    try {
      await exportToPDF(presentation);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportPPT = async () => {
    if (!presentation) return;
    setIsExporting('ppt');
    try {
      await exportToPPT(presentation);
    } finally {
      setIsExporting(null);
    }
  };

  if (!presentation) return null;

  return (
    <div className="bg-white/60 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/80 shadow-lg rounded-2xl p-6 my-12">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center space-x-3">
        <Download className="h-6 w-6 text-primary" />
        <span>Export Your Presentation</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleExportPDF}
          disabled={!!isExporting}
          className="flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {isExporting === 'pdf' ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <FileText className="h-5 w-5" />
          )}
          <span>{isExporting === 'pdf' ? 'Exporting PDF...' : 'Download as PDF'}</span>
        </button>

        <button
          onClick={handleExportPPT}
          disabled={!!isExporting}
          className="flex items-center justify-center space-x-3 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {isExporting === 'ppt' ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <PresentationIcon className="h-5 w-5" />
          )}
          <span>{isExporting === 'ppt' ? 'Exporting PPTX...' : 'Download as PPTX'}</span>
        </button>
      </div>
    </div>
  );
};
