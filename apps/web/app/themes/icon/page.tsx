'use client';
import { useState } from 'react';
import * as icons from '@xsky/eris-icons';
import icon from '@xsky/eris-icons/package.json';
import { Input, TextLink, Tooltip } from '@xsky/eris-ui';
import { H1, H3, P } from '../../../mdx-components';

export default function Icon() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <H1>
        {' '}
        图标 {icon.name}-v{icon.version}
      </H1>
      <P> 根据公司内部项目整理的常用图标 </P>
      <TextLink noUnderline>
        <div className="flex items-center">
          <span className="mr-0.5 inline-flex">
            <icons.DownloadLine16 />
          </span>
          <a download href="/figma-icon-sync.zip">
            下载 Figma 图标发布插件
          </a>
        </div>
      </TextLink>
      <div className="mt-5">
        <Input onChange={(v) => setSearch(v)} placeholder="搜索图标" />
        {IconList(12, search)}
        {IconList(16, search)}
        {IconList(20, search)}
      </div>
    </div>
  );
}

function IconList(size: number, search: string) {
  return (
    <div className="mt-3">
      <H3>{size}px</H3>
      <div className="flex flex-wrap gap-5">
        {Object.keys(icons)
          .filter((key) => key.includes(`${size}`))
          .filter((key) => (search ? key.toLowerCase().includes(search.toLowerCase()) : true))
          .map((key) => {
            const Icon = (icons as any)[key];
            return (
              <Tooltip key={key} title={key}>
                <div className="flex flex-col rounded-md border p-1">
                  <Icon className="text-text-2" />
                </div>
              </Tooltip>
            );
          })}
      </div>
    </div>
  );
}
