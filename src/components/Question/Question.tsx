import React, { JSX } from 'react';
import { Question as QuestionType } from '../../types';
import styles from './Question.module.css';

export function Question({
  question,
}: {
  question: QuestionType;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answerId !== null) {
      setIsSubmitted(true);
      console.log('submit, valið svar:', answerId);
    }
  };

  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.questionTitle}>{question.text}</h2>
      <form onSubmit={onSubmit}>
        <ul className={styles.answersList}>
          {question.answers.map((answer) => {
            const isCorrect = answerId === answer.id && answer.correct;
            const isWrong = isSubmitted && answerId === answer.id && !answer.correct;
            
            return (
              <li key={answer.id} className={styles.answerItem}>
                <input
                  type="radio"
                  name="answer"
                  value={answer.id}
                  onChange={() => setAnswerId(answer.id)}
                  disabled={isSubmitted}
                  className={styles.answerRadio}
                  id={`answer-${answer.id}`}
                />
                <label htmlFor={`answer-${answer.id}`} className={styles.answerText}>
                  {answer.text}
                </label>
                {isSubmitted && (
                  <span className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
                    {isCorrect ? '—RÉTT' : isWrong ? '—RANGT' : ''}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        
        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={isSubmitted || answerId === null}
            className={styles.submitButton}
          >
            {isSubmitted ? 'Svarað' : 'Svara'}
          </button>
          
          {isSubmitted && (
            <button 
              type="button" 
              onClick={() => {
                setIsSubmitted(false);
                setAnswerId(null);
              }}
              className={styles.resetButton}
            >
              Svara aftur
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
