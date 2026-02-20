
export type Language = 'ca' | 'es';

export interface Level {
  id: number;
  title: Record<Language, string>;
  equation: Record<Language, string>;
  expectedAnswer: string; // The numeric value of X
}

export interface AppState {
  currentLevel: number;
  completedLevels: number[];
  hintsUsed: number;
  completed: boolean;
  history: ChatMessage[];
  totalLevels: number;
  language: Language;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}
