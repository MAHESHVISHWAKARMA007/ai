import { supabase } from '../lib/supabaseClient';
import { Presentation } from '../types';

export const fetchHistory = async (userId: string): Promise<Presentation[]> => {
  const { data, error } = await supabase
    .from('history')
    .select('action')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
  
  // The 'action' column contains the full Presentation object
  return data.map(item => item.action);
};

export const saveHistory = async (userId: string, presentation: Presentation): Promise<Presentation> => {
  const { data, error } = await supabase
    .from('history')
    .insert({
      id: presentation.id, // Use presentation ID as history ID
      user_id: userId,
      action: presentation,
    })
    .select('action')
    .single();

  if (error) {
    console.error('Error saving history:', error);
    throw error;
  }

  return data.action;
};

export const deleteHistoryItem = async (id: string): Promise<void> => {
  const { error } = await supabase.from('history').delete().eq('id', id);

  if (error) {
    console.error('Error deleting history item:', error);
    throw error;
  }
};
