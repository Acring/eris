import { TextLink, cn } from '@xsky/eris-ui';

export function H1({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={cn('text-text-1 mb-2 border-b pb-1 text-3xl font-bold', className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn('text-text-1 my-2 border-b pb-1 text-2xl font-bold', className)}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-text-1 mb-1 text-xl font-bold', className)}>{children}</h3>;
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-text-2 mb-1', className)}>{children}</p>;
}

export function A({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a className="inline-block" href={href}>
      <TextLink>{children}</TextLink>
    </a>
  );
}

export function Code({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        'inline-block rounded-sm bg-gray-100 px-1 py-[1px] dark:bg-gray-800',
        className,
      )}
    >
      {children}
    </code>
  );
}

export function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="[&>li+li]:mt-1">{children}</ul>;
}

export function Ol({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal">{children}</ol>;
}

export function Li({ children }: { children: React.ReactNode }) {
  return <li className=" ml-2 list-disc">{children}</li>;
}

export function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-primary-normal text-text-3 mb-1 border-l-2 py-[4px] pl-2 [&>p]:m-0">
      {children}
    </blockquote>
  );
}

export function useMDXComponents(components: any) {
  // return components;
  // Allows customizing built-in components, e.g. to add styling.
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    a: A,
    code: Code,
    ul: Ul,
    ol: Ol,
    li: Li,
    hr: () => <hr className="mb-4 mt-2" />,
    blockquote: Blockquote,

    pre: (props: any) => (
      <pre
        {...props}
        className="mb-1 block w-full [&>code]:w-full [&>code]:rounded-lg [&>code]:p-2 "
      />
    ),
    ...components,
  };
}
