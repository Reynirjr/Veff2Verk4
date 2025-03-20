import { Category } from '@/components/Category/Category';
import Navigation from '@/components/Navigation/Navigation';
import { notFound } from 'next/navigation';
import { QuestionsApi } from '@/api';

export default async function FlokkaPage({
  params,
}: {
  params: Promise<{ flokkur: string }>;
}) {
  const { flokkur } = await params;

  const api = new QuestionsApi();
  const category = await api.getCategory(flokkur);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <Navigation />
      <Category slug={flokkur} />
    </div>
  );
}