'use client';
import lodash from 'lodash';
import { Tooltip, cn } from '@xsky/eris-ui';
import { A, H1, P } from '../../../mdx-components';
import tailwind from '../../../tailwind.config';

// eslint-disable-next-line @typescript-eslint/dot-notation
const colors = tailwind.presets?.[0]?.plugins?.[0]?.['config']?.theme.extend.colors ?? {};

export default function Color() {
  return (
    <div className="">
      <H1> 颜色 </H1>
      <P>
        Eris
        将颜色分为两个层面，系统级颜色和产品级颜色，系统级颜色定义了所有可以使用的基础色板，中性色板，可视化色板等，产品级色板则是在基础色板的基础上进一步定义符合产品调性以及功能诉求的颜色
      </P>
      <P>
        更详细的颜色规范请访问:
        <A href="https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-114715&mode=dev">
          通用设计规范
        </A>
      </P>
      <H1 className="mt-4">🎨 全局色板 </H1>
      <div className={cn('flex flex-col justify-between gap-2 overflow-auto')}>
        {['blue', 'deep-red', 'red', 'yellow', 'green', 'purple', 'grey', 'base'].map((main) => {
          return (
            <div className="flex flex-col " key="key">
              <div className="text-bold text-subhead text-text-1 py-1">{main.toUpperCase()}</div>
              <div
                className={cn('rounded-md border p-1', {
                  'bg-gray-400': main === 'base',
                })}
              >
                <div className={cn('flex')}>
                  {lodash
                    .orderBy(
                      Object.keys(colors).filter((color) => color.startsWith(`${main}-`)),
                      (color) => +color.replace(`${main}-`, ''),
                      'desc',
                    )
                    .map((key) => {
                      const color = colors[key];
                      return (
                        <Tooltip key={key} title={color}>
                          <div
                            className="group relative flex h-[80px] min-w-[56px] flex-1 items-center gap-2 px-2 py-1 transition first:overflow-hidden first:rounded-l-md last:overflow-hidden last:rounded-r-md hover:z-10 hover:scale-105"
                            style={{
                              background: color,
                            }}
                          >
                            <div
                              className={cn('absolute left-1 top-1 text-sm text-white', {
                                'text-base-black': key?.includes('white'),
                              })}
                            >
                              {key}
                            </div>
                          </div>
                        </Tooltip>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
        <H1 className="mt-4">🎨 产品级色板 </H1>
        <div className={cn('flex flex-col justify-between gap-2 overflow-auto')}>
          {[
            'text',
            'primary',
            'success',
            'warning',
            'danger',
            'critical',
            'updating',
            'offline',
            'background',
            'fill',
            'icon',
            'divider',
            'stroke',
            'chart',
            'conditional',
          ].map((main) => {
            return (
              <div className="flex flex-col " key="key">
                <div className="text-bold text-subhead text-text-1 py-1">{main.toUpperCase()}</div>
                <div className={cn('rounded-md border bg-gray-400 p-1', {})}>
                  <div className={cn('flex flex-wrap gap-1')}>
                    {lodash
                      .orderBy(
                        Object.keys(colors).filter((color) => color.startsWith(`${main}-`)),
                        (color) => +color.replace(`${main}-`, ''),
                        'desc',
                      )
                      .map((key) => {
                        const color = colors[key];
                        return (
                          <Tooltip key={key} title={color}>
                            <div
                              className="group relative flex h-[80px] basis-[128px] items-center gap-2 rounded-md px-2 py-1 transition hover:z-10 hover:scale-105"
                              style={{
                                background: color,
                              }}
                            >
                              <div
                                className={cn(
                                  'absolute left-1 top-1 w-full overflow-hidden overflow-ellipsis  whitespace-nowrap text-sm text-white',
                                  {
                                    'text-base-black': key?.includes('white'),
                                  },
                                )}
                                title={key}
                              >
                                {key}
                              </div>
                            </div>
                          </Tooltip>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
