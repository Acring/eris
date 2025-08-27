import * as icons from '@xsky/eris-icons';
import { Input, Tooltip, App, useApp } from '@xsky/eris-ui';
import { Meta } from '@storybook/react';
import lodash from 'lodash';

import React, { useState, useCallback } from 'react';

export default {
  title: 'icons',
  tags: ['skip-test'],
} as Meta;

export const Default = () => {
  // Copy textarea, pre, div, etc.
  function copyText(el: any) {
    // Old IE
    if ((document.body as any).createTextRange) {
      const textRange = (document.body as any).createTextRange();
      textRange.moveToElementText(el);
      textRange.select();
      return textRange.execCommand('Copy');
    }

    // non-Old IE
    if (window.getSelection && document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(el);

      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }

      return document.execCommand('copy', false, el.innerText);
    }
  }

  const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback((text: string) => {
      const el = document.createElement('span');
      el.innerText = text;
      document.body.appendChild(el);
      copyText(el);
      document.body.removeChild(el);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }, []);

    return { isCopied, copyToClipboard };
  };

  function IconList(size: number, search: string) {
    const { copyToClipboard } = useCopyToClipboard();
    const { message } = useApp();
    // 忽略大小写 和 支持 _ 的写法 minus_line_16 (figma 中是 _)
    // 支持 MinusLine16
    const camelCaseSearch = lodash.camelCase(search);
    return (
      <div className="mt-3">
        <h3 className="text-lg">{size}px</h3>
        <div className="flex flex-wrap gap-5">
          {Object.keys(icons)
            .filter((key) => key.includes(`${size}`))
            .filter((key) =>
              search ? key.toLowerCase().includes(camelCaseSearch.toLowerCase()) : true,
            )
            .map((key) => {
              const Icon = (icons as any)[key];
              return (
                <Tooltip key={key} title={key}>
                  <div
                    className="flex flex-col rounded-md border p-1"
                    key={key}
                    onClick={() => {
                      const componentText = `<${key} />`;
                      message?.pushSuccess({
                        message: `${componentText} copied 🎉`,
                      });
                      copyToClipboard(componentText);
                    }}
                  >
                    <Icon className="text-text-2" />
                  </div>
                </Tooltip>
              );
            })}
        </div>
      </div>
    );
  }
  const IconPreview = () => {
    const [search, setSearch] = useState('');
    return (
      <div>
        <Input onChange={setSearch} placeholder="搜索图标" />
        {IconList(12, search)}
        {IconList(16, search)}
        {IconList(20, search)}
      </div>
    );
  };
  return (
    <App>
      <IconPreview />
    </App>
  );
};
