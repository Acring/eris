// Skeleton stories

import { Skeleton } from '@xsky/eris-ui';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'DATA ENTRY/Skeleton/Skeleton',
  component: Skeleton,
  tags: ['skip-test'],
  argTypes: {
    className: {
      type: 'string',
      description:
        '控制骨架屏样式，提供了变量：skeleton-height-xs/sm/md/lg/xl/xxl；skeleton-width-xs/sm/md/lg/xl；这些变量对应设计骨架屏宽、高的规范',
      defaultValue: '',
    },
  },
} as Meta;

type SkeletonStory = StoryObj<typeof Skeleton>;

/**
 * 基础样式
 */
export const BaseSkeleton: SkeletonStory = {
  args: {},
  render: (args) => (
    <div className="w-[300px]">
      <Skeleton {...args} />
    </div>
  ),
};
