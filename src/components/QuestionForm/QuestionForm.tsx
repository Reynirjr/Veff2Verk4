'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import styles from './QuestionForm.module.css';

interface CategoryOption {
  slug: string;
  name: string;
}

interface QuestionFormProps {
  onSubmit: (data: {
    text: string;
    categorySlug: string;
    answers: Array<{ text: string; correct: boolean }>;
  }) => Promise<boolean>;

  categories: CategoryOption[];
}

export default function QuestionForm({ onSubmit, categories }: QuestionFormProps) {
  const [questionText, setQuestionText] = useState('');
  const [categorySlug, setCategorySlug] = useState('');

  const [answers, setAnswers] = useState([
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleAnswerTextChange(index: number, value: string) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index].text = value;
      return copy;
    });
  }

  function handleAnswerCorrectChange(index: number) {
    setAnswers((prev) =>
      prev.map((ans, i) => ({
        ...ans,
        correct: i === index, 
      }))
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      text: questionText,
      categorySlug,
      answers,
    };

    const success = await onSubmit(payload);
    setLoading(false);

    if (!success) {
      setError('Ekki tókst að vista spurningu. Reyndu aftur.');
    } else {
      setQuestionText('');
      setCategorySlug('');
      setAnswers([
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
      ]);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2 className={styles.title}>Búa til spurningu</h2>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Spurning:
            <input
              type="text"
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Hvað er HTML?"
              className={styles.input}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Veldu flokk:
            <select
              required
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className={styles.select}
            >
              <option value="">-- Veldu flokk --</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Svör (radio ⇒ eitt má vera rétt)</legend>
          {answers.map((answer, i) => (
            <div key={i} className={styles.answerRow}>
              <input
                type="radio"
                name="correctAnswer"
                checked={answer.correct}
                onChange={() => handleAnswerCorrectChange(i)}
                className={styles.radio}
              />
              <input
                type="text"
                required
                value={answer.text}
                onChange={(e) => handleAnswerTextChange(i, e.target.value)}
                placeholder={`Svar #${i + 1}`}
                className={styles.answerInput}
              />
            </div>
          ))}
        </fieldset>

        <div className={styles.formActions}>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Vista...' : 'Vista spurningu'}
          </button>
          <Link href="/" className={styles.backLink}>
            Til baka á forsíðu
          </Link>
        </div>
      </form>
    </div>
  );
}
