import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    exclude: [
      'lucide-react',
      '@supabase/realtime-js' // Exclude Supabase sub-dependency from pre-bundling
    ],
  },
});
