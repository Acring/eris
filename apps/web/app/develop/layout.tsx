import type { Metadata } from 'next';
import { TopologyFill16 } from '@xsky/eris-icons';
import { ScrollArea } from '@xsky/eris-ui';
import SideNav from '../../components/sideNav';

export const metadata: Metadata = {
  title: 'Eris UI',
  description: ' 研发文档 ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[calc(100vh-57px)] w-full min-w-[980px] max-w-[1400px]">
      <div className="sideNav absolute z-10 h-full w-[286px] px-3 py-2">
        <SideNav
          groups={[
            {
              value: 'overview',
              items: [
                {
                  name: ' 介绍 ',
                  value: 'introduction',
                  path: '/develop/introduction',
                },
                // {
                //   name: ' 更新日志 ',
                //   value: 'changelog',
                //   path: '/develop/changelog',
                // },
              ],
            },
            {
              name: ' 如何使用 ',
              value: 'usage',
              icon: <TopologyFill16 />,
              items: [
                {
                  name: ' 快速上手 ',
                  value: 'quick-start',
                  path: '/develop/quick-start',
                },
                {
                  name: ' 在 Next.js 中使用 ',
                  value: 'nextjs',
                  path: '/develop/nextjs',
                },
                {
                  name: ' 在 Vite 中使用 ',
                  value: 'vite',
                  path: '/develop/vite',
                },
                {
                  name: ' 样式系统 ',
                  value: 'style-system',
                  path: '/develop/style-system',
                },
              ],
            },
            {
              name: ' 参与开发 ',
              icon: <TopologyFill16 />,
              value: 'develop',
              items: [
                {
                  name: ' 概览 ',
                  value: 'overview',
                  path: '/develop/develop-overview',
                },
                {
                  name: 'API 设计规范 ',
                  value: 'api',
                  path: '/develop/api',
                },
              ],
            },
            {
              name: ' 其它 ',
              icon: <TopologyFill16 />,
              value: 'other',
              items: [
                {
                  name: 'ConfigProvider 全局化配置',
                  value: 'config-provider',
                  path: '/develop/config-provider',
                },
              ],
            },
          ]}
        />
      </div>
      <ScrollArea width="100%">
        <div className="flex w-full flex-1 pl-[256px] pt-4">
          <div className="w-full p-[0_170px_32px_64px]">{children}</div>
        </div>
      </ScrollArea>
    </div>
  );
}
