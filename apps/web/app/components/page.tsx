'use client';
import { useSearchParams } from 'next/navigation';

export default function ComponentsPage() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component');
  return (
    <iframe
      src={
        component
          ? `/storybook-static/index.html?path=/docs/${component}`
          : '/storybook-static/index.html'
      }
      style={{
        height: 'calc(100vh - 57px)',
      }}
      title="components"
      width="100%"
    />
  );
}
