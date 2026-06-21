import { useContext } from 'react';
import { TutorContext } from './TutorContext';

export function useAI() {
  const context = useContext(TutorContext);
  if (!context) {
    throw new Error('useAI must be used within AIProvider');
  }
  return context;
}

