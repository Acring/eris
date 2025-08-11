import type { Metadata } from 'next';
import { TopologyFill16 } from '@xsky/eris-icons';
import { ScrollArea } from '@xsky/eris-ui';
import SideNav from '../../components/sideNav';

export const metadata: Metadata = {
  title: 'Eris UI',
  description: ' 设计系统 ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[calc(100vh-57px)] w-full min-w-[980px] max-w-[1400px]">
      <div className="sideNav absolute z-10 h-full w-[286px] bg-white px-3 py-2">
        <SideNav
          groups={[
            {
              value: 'overview',
              items: [
                {
                  name: ' 概览 ',
                  value: 'overview',
                  path: '/themes/overview',
                },
              ],
            },
            {
              name: ' 设计 ',
              value: 'design',
              icon: <TopologyFill16 />,
              items: [
                {
                  name: ' 设计原则 ',
                  value: 'design-principle',
                  path: '/themes/design-principle',
                },
              ],
            },
            {
              name: ' 全局样式 ',
              value: 'style',
              icon: <TopologyFill16 />,
              items: [
                {
                  name: ' 颜色 ',
                  value: 'color',
                  path: '/themes/color',
                },
                {
                  name: ' 图标 ',
                  value: 'icon',
                  path: '/themes/icon',
                },
                {
                  name: ' 圆角 ',
                  value: 'radius',
                  path: '/themes/radius',
                },
                {
                  name: ' 字体 ',
                  value: 'font',
                  path: '/themes/font',
                },
                {
                  name: ' 阴影 ',
                  value: 'shadow',
                  path: '/themes/shadow',
                },
              ],
            },
            {
              name: ' 设计模式 ',
              value: 'pattern',
              icon: <TopologyFill16 />,
              items: [
                {
                  name: ' 概览 ',
                  value: 'overview',
                  path: '/themes/pattern-overview',
                },
                {
                  name: ' 表单 ',
                  value: 'form',
                  path: '/themes/form',
                },
                {
                  name: ' 列表页 ',
                  value: 'list',
                  path: '/themes/list',
                },
              ],
            },
            {
              name: ' 可视化 ',
              value: 'visualization',
              icon: <TopologyFill16 />,
              items: [
                {
                  name: ' 图表 ',
                  value: 'chart',
                  path: '/themes/chart',
                },
              ],
            },
          ]}
        />
      </div>
      <ScrollArea width="100%">
        <div className="flex flex-1 pl-[256px] pt-4">
          <div className="w-full p-[0_170px_32px_64px]">{children}</div>
        </div>
      </ScrollArea>
    </div>
  );
}
