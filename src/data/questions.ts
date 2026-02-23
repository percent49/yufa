import { Question, Difficulty, Category } from '../types';

export const questions: Question[] = [
  {
    id: '1',
    sentenceBefore: '',
    sentenceAfter: ' tired, she still finished the report.',
    options: ['Although', 'Because', 'Unless', 'Despite'],
    correctAnswer: 'Although',
    difficulty: Difficulty.Beginner,
    category: Category.AdverbialClause,
    explanation: {
      rule: 'Although 引导让步状语从句，表示“尽管”。句子虽然有“尽管”，但主句不能再用 but。',
      example: 'Although it was raining, they went out.',
      commonMistake: '容易在主句前加 but。注意 Although 和 but 不能同时出现在一个复合句中。',
      reviewLink: 'https://www.bing.com/search?q=although+用法详解'
    }
  },
  {
    id: '2',
    sentenceBefore: 'The boy ',
    sentenceAfter: ' is playing football is my brother.',
    options: ['who', 'which', 'whose', 'whom'],
    correctAnswer: 'who',
    difficulty: Difficulty.Beginner,
    category: Category.RelativeClause,
    explanation: {
      rule: 'who 引导定语从句，先行词是人，且在从句中作主语。',
      example: 'The girl who is singing is my sister.',
      commonMistake: '误用 which（先行词为物）或 whom（在从句中作宾语）。',
      reviewLink: 'https://www.bing.com/search?q=who+定语从句+用法'
    }
  },
  {
    id: '3',
    sentenceBefore: 'I don\'t know ',
    sentenceAfter: ' he will come back tomorrow.',
    options: ['if', 'that', 'which', 'what'],
    correctAnswer: 'if',
    difficulty: Difficulty.Intermediate,
    category: Category.NounClause,
    explanation: {
      rule: 'if 在宾语从句中表示“是否”，常用于不确定的情况。',
      example: 'I wonder if it will rain.',
      commonMistake: '误用 that，that 引导宾语从句时不表示具体含义，仅起连接作用，用于陈述事实。',
      reviewLink: 'https://www.bing.com/search?q=宾语从句+if+that+区别'
    }
  },
  {
    id: '4',
    sentenceBefore: '',
    sentenceAfter: ' hard, you will pass the exam.',
    options: ['Working', 'Work', 'To work', 'Worked'],
    correctAnswer: 'Working',
    difficulty: Difficulty.Intermediate,
    category: Category.NonFinite,
    explanation: {
      rule: '现在分词（doing）作状语，表示主动关系或伴随状态。此处 Working hard 与主语 you 是主动关系。',
      example: 'Hearing the news, they jumped with joy.',
      commonMistake: '误用过去分词 Worked（表示被动）或祈使句 Work（后面通常接 and/or）。',
      reviewLink: 'https://www.bing.com/search?q=现在分词作状语'
    }
  },
  {
    id: '5',
    sentenceBefore: 'This is the school ',
    sentenceAfter: ' I studied three years ago.',
    options: ['where', 'which', 'that', 'when'],
    correctAnswer: 'where',
    difficulty: Difficulty.Advanced,
    category: Category.RelativeClause,
    explanation: {
      rule: 'where 引导定语从句，先行词是表示地点的名词，且在从句中作地点状语。',
      example: 'This is the room where I live.',
      commonMistake: '误用 which。如果从句缺主语或宾语，用 which；如果从句不缺成分且表地点，用 where。',
      reviewLink: 'https://www.bing.com/search?q=定语从句+where+which+辨析'
    }
  },
  {
    id: '6',
    sentenceBefore: 'He was so tired ',
    sentenceAfter: ' he fell asleep immediately.',
    options: ['that', 'which', 'as', 'than'],
    correctAnswer: 'that',
    difficulty: Difficulty.Beginner,
    category: Category.AdverbialClause,
    explanation: {
      rule: 'so...that... 引导结果状语从句，意为“如此...以至于...”。',
      example: 'The box is so heavy that I can\'t lift it.',
      commonMistake: '误用 as 或 which。注意 so 后面接形容词/副词，that 引导从句。',
    }
  },
  {
    id: '7',
    sentenceBefore: '',
    sentenceAfter: ' by the noise, the baby started to cry.',
    options: ['Frightened', 'Frightening', 'To frighten', 'Frighten'],
    correctAnswer: 'Frightened',
    difficulty: Difficulty.Advanced,
    category: Category.NonFinite,
    explanation: {
      rule: '过去分词（done）作状语，表示被动关系或已完成的动作。婴儿是被噪音吓到的。',
      example: 'Moved by the story, she cried.',
      commonMistake: '误用现在分词 Frightening（表示“令人恐惧的”，通常修饰物）。',
    }
  },
  {
    id: '8',
    sentenceBefore: 'Do you know the reason ',
    sentenceAfter: ' he was late?',
    options: ['why', 'which', 'that', 'because'],
    correctAnswer: 'why',
    difficulty: Difficulty.Intermediate,
    category: Category.RelativeClause,
    explanation: {
      rule: 'why 引导定语从句，先行词是 reason，且在从句中作原因状语。',
      example: 'I don\'t know the reason why he left.',
      commonMistake: '误用 because。because 引导的是原因状语从句，不是定语从句。',
    }
  }
];
