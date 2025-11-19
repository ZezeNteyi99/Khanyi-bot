export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  timestamp: Date;
  relatedTopic?: TopicType; 
}

export enum TopicType {
  GENERAL = 'GENERAL',
  AI_VS_ML = 'AI_VS_ML',
  NEURAL_NETWORKS = 'NEURAL_NETWORKS',
  NLP = 'NLP',
  ETHICS = 'ETHICS',
  CV = 'CV'
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  citation: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentTopic: TopicType;
}