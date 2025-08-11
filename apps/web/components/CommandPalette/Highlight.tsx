import { findAll } from 'highlight-words-core';
import React, { useMemo } from 'react';
import { CommandPalette } from '@xsky/eris-ui';

const { useCommandState } = CommandPalette;

export function Highlight({
  children,
  caseSensitive = false,
}: {
  children: string;
  caseSensitive?: boolean;
}) {
  const search = useCommandState((state) => state.search);
  const highlights = search.split('');

  const chunks = useMemo(() => {
    return findAll({
      textToHighlight: children,
      searchWords: highlights,
      caseSensitive,
    });
  }, [caseSensitive, highlights, children]);

  return (
    <div>
      {chunks.map(({ end, highlight, start }, index) => {
        const label = children.substr(start, end - start);
        return (
          <React.Fragment key={index}>
            {highlight ? <span className="text-text-1 font-medium">{label}</span> : label}
          </React.Fragment>
        );
      })}
    </div>
  );
}
