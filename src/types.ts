export enum Difficulty {
  Beginner = '初级',
  Intermediate = '中级',
  Advanced = '高级',
}

export enum Category {
  NonFinite = '非谓语动词',
  RelativeClause = '定语从句',
  AdverbialClause = '状语从句',
  NounClause = '名词性从句',
  Conjunction = '连词辨析',
}

export interface Question {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
  category: Category;
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
    reviewLink?: string;
  };
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}
