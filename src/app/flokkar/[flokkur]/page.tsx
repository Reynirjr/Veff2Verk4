import { Category } from '@/components/Category/Category';
import Navigation from '@/components/Navigation/Navigation';

interface FlokkurPageProps {
  params: {
    flokkur: string;
  };
}

export default function FlokkurPage({ params }: FlokkurPageProps) {
  const { flokkur } = params;

  return (
    <div>
      <Navigation />
      <Category slug={flokkur} />
    </div>
  );
}
