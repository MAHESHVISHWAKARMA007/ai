import React from 'react';
import { Moon, Sun, Presentation, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSignIn: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, onSignIn }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2.5 rounded-xl shadow-lg shadow-primary/30">
              <Presentation className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                AI Slide Generator
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Craft compelling presentations in seconds
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700/50 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="p-2 bg-neutral-200 dark:bg-neutral-700/50 rounded-full">
                    <UserIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium hidden sm:inline">{user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 bg-neutral-200 dark:bg-neutral-700/50 hover:bg-neutral-300 dark:hover:bg-neutral-600/50 text-neutral-800 dark:text-neutral-200 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
