'use client';
import { cn } from '@xsky/eris-ui';
import { H1, P } from '../../../mdx-components';

function BorderItem({ className, name }: { className: string; name: string }) {
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center border shadow-md', className)}>
      <div>{name}</div>
    </div>
  );
}
export default function Radius() {
  return (
    <div>
      <H1> 圆角 </H1>
      <P> 项目中通常使用的圆角有下面几种 </P>
      <div className="mt-5 flex flex-wrap gap-5">
        <BorderItem className="rounded-xs" name="xs(1px)" />
        <BorderItem className="rounded-sm" name="sm(2px)" />
        <BorderItem className="rounded-md" name="md(4px)" />
        <BorderItem className="rounded-full" name="full" />
      </div>
    </div>
  );
}
