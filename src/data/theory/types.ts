export type TheoryBlock = {
  /** Key concepts explained simply */
  concepts: string[];
  /** Worked example with step-by-step solution */
  example?: {
    question: string;
    steps: string[];
    answer: string;
  };
  /** Helpful tips/tricks */
  tips?: string[];
  /** Common mistakes to avoid */
  pitfalls?: string[];
};
