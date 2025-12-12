export interface ReactQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  code?: string;
}
