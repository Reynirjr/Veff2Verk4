'use client';

import { QuestionsApi } from '@/api';
import QuestionForm from '@/components/QuestionForm/QuestionForm';

const dummyCategories = [
    { slug: 'html', name: 'HTML' },
    { slug: 'css', name: 'CSS' },
    { slug: 'javascript', name: 'JavaScript' },
  ];

export default function NewQuestionPage() {
  async function handleCreateQuestion(data: {
    text: string;
    categorySlug: string;
    answers: Array<{ text: string; correct: boolean }>;
  }) {
    const api = new QuestionsApi();
    const ok = await api.createQuestion(data);
    return ok; 
  }

  return (
    <div>
      <h1>ný spurning</h1>
      <QuestionForm 
      onSubmit={handleCreateQuestion} 
      categories={dummyCategories}
      />
    </div>
  );
}
