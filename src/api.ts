import { Category, Paginated, Question } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }

    if (!response.ok) {
      console.error('non 2xx status from API', url);
      return null;
    }

    if (response.status === 404) {
      console.error('404 from API', url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('error parsing json', url, e);
      return null;
    }

    return json as T;
  }

  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;

    const response = await this.fetchFromApi<Category | null>(url);

    return response;
  }

  async getCategories(): Promise<Paginated<Category> | null> {
    const url = BASE_URL + '/categories';
    const response = await this.fetchFromApi<Paginated<Category>>(url);
    return response;
  }

  async getQuestions(
    categorySlug: string,
  ): Promise<Paginated<Question> | null> {
    const url = BASE_URL + `/questions?category=${categorySlug}`;
    const response = await this.fetchFromApi<Paginated<Question>>(url);
    return response;
  }

  async createQuestion(data: {
    text: string;
    categorySlug: string;
    answers: Array<{ text: string; correct: boolean }>;
  }): Promise<boolean> {
    try {
      const categoryResponse = await this.getCategory(data.categorySlug);
      if (!categoryResponse) {
        console.error('Category not found:', data.categorySlug);
        return false;
      }

      const payload = {
        text: data.text,
        categoryId: categoryResponse.id,
        answers: data.answers.map(a => ({
          text: a.text,
          correct: a.correct 
        }))
      };

      const res = await fetch(`${BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(`POST /questions failed`, res.status);
        try {
          const errorData = await res.text();
          console.error('Error response:', errorData);
        } catch (e) {
          console.error('Could not parse error response', e);
        }
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error in createQuestion', error);
      return false;
    }
  }
}
