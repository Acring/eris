'use client';

import { cn } from '@xsky/eris-ui';
import { A, H1, P } from '../../../mdx-components';

// TODO: 由前端来构造这个数据
// *tw*
const boxShadowGroup = [
  ['shadow-elevation-3-bottom', 'shadow-elevation-3-right'],
  [
    'shadow-elevation-2-bottom',
    'shadow-elevation-2-top',
    'shadow-elevation-2-right',
    'shadow-elevation-2-left',
  ],
  [
    'shadow-elevation-1-bottom',
    'shadow-elevation-1-top',
    'shadow-elevation-1-right',
    'shadow-elevation-1-left',
  ],
];

export default function Shadow() {
  return (
    <div>
      <H1> 阴影 </H1>
      <P> 通过模拟元素的投影体现元素之间的高度距离与层次关系。</P>
      <P>
        详见:{' '}
        <A href="https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=21702%3A14990&mode=dev">
          通用设计规范
        </A>
      </P>
      <div className="flex-start flex flex-col flex-wrap gap-5">
        {boxShadowGroup.map((boxShadow, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className="flex-start flex gap-3" key={index}>
              {boxShadow.map((key) => (
                <div
                  className="flex flex-[200px] flex-shrink-0 flex-grow-0 flex-col items-center gap-2"
                  key={key}
                >
                  <div className={cn('h-10 w-full  truncate rounded-md p-1', key)}>{key}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
