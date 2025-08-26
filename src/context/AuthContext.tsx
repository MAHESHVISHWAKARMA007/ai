import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session, User, AuthApiError } from '@supabase/supabase-js';
import { Presentation } from '../types';
import { fetchHistory, saveHistory, deleteHistoryItem } from '../services/supabaseService';
import toast from 'react-hot-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  history: Presentation[];
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  addPresentationToHistory: (presentation: Presentation) => Promise<void>;
  removePresentationFromHistory: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }
    
    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchHistory(user.id)
        .then(data => {
          setHistory(data);
        })
        .catch(err => {
          console.error(err);
          toast.error('Could not fetch presentation history.');
        })
        .finally(() => setLoading(false));
    } else {
      setHistory([]); // Clear history on logout
    }
  }, [user]);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
      throw error;
    }
    toast.success('Account created! Please check your email to verify your account before signing in.');
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error instanceof AuthApiError && error.message === 'Email not confirmed') {
        toast.error('Please verify your email address before signing in.');
      } else {
        toast.error(error.message);
      }
      throw error;
    }
    toast.success('Signed in successfully.');
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      throw error;
    }
    toast.success('Signed out successfully.');
  };

  const addPresentationToHistory = async (presentation: Presentation) => {
    if (!user) return;
    try {
      await saveHistory(user.id, presentation);
      setHistory(prev => [presentation, ...prev]);
      toast.success('Presentation saved to your history.');
    } catch (error) {
      toast.error('Failed to save presentation.');
    }
  };

  const removePresentationFromHistory = async (id: string) => {
    if (!user) return;
    try {
      await deleteHistoryItem(id);
      setHistory(prev => prev.filter(p => p.id !== id));
      toast.success('Presentation removed from history.');
    } catch (error) {
      toast.error('Failed to remove presentation.');
    }
  };

  const value = {
    session,
    user,
    history,
    loading,
    signUp,
    signIn,
    signOut,
    addPresentationToHistory,
    removePresentationFromHistory,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
