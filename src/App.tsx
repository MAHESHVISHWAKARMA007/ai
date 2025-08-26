import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { SlidePreview } from './components/SlidePreview';
import { ExportSection } from './components/ExportSection';
import { HistorySection } from './components/HistorySection';
import { Footer } from './components/Footer';
import { generateSlides } from './services/aiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Presentation, PresentationStyle } from './types';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { AuthModal } from './components/AuthModal';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentPresentation, setCurrentPresentation] = useState<Presentation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { user, history, addPresentationToHistory, removePresentationFromHistory } = useAuth();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleGenerateSlides = async (topic: string, style: PresentationStyle) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateSlides(topic, style);
      
      const presentation: Presentation = {
        id: crypto.randomUUID(),
        topic,
        style,
        slides: response.slides.map((slide, index) => ({
          ...slide,
          id: `${Date.now()}-${index}`,
        })),
        createdAt: new Date().toISOString()
      };

      setCurrentPresentation(presentation);
      
      if (user) {
        await addPresentationToHistory(presentation);
      }

    } catch (err) {
      console.error('Error generating slides:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPresentation = (presentation: Presentation) => {
    setCurrentPresentation(presentation);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePresentation = async (id: string) => {
    if (user) {
      await removePresentationFromHistory(id);
    }
    if (currentPresentation?.id === id) {
      setCurrentPresentation(null);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen font-sans bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary-500/10 dark:bg-primary-500/20 blur-[100px]"></div>
      </div>
      
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: {
          background: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
        }
      }} />

      <AnimatePresence>
        {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
      </AnimatePresence>
      
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        onSignIn={() => setIsAuthModalOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <InputSection onGenerate={handleGenerateSlides} isLoading={isLoading} />
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-8 rounded-md animate-fade-in" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <SlidePreview presentation={currentPresentation} />
        
        {currentPresentation && <ExportSection presentation={currentPresentation} />}
        
        <HistorySection
          presentations={history}
          onSelectPresentation={handleSelectPresentation}
          onDeletePresentation={handleDeletePresentation}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
