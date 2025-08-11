// SkeletonText stories

import { SkeletonText } from '@xsky/eris-ui';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'DATA ENTRY/Skeleton/SkeletonText',
  component: SkeletonText,
  tags: ['skip-test'],
  argTypes: {
    className: {
      type: 'string',
      description: '',
      defaultValue: '',
    },
    rows: {
      type: 'number',
      description: '文本的行数',
      defaultValue: '',
    },
    startRow: {
      type: 'number',
      description: '从第几行开始',
      defaultValue: 1,
    },
  },
} as Meta;

type SkeletonTextStory = StoryObj<typeof SkeletonText>;

/**
 * 基础样式
 */
export const BaseSkeletonText: SkeletonTextStory = {
  args: {
    rows: 10,
  },
  render: (args) => (
    <div className="w-[300px]">
      <SkeletonText {...args} />
    </div>
  ),
};

/**
 * 从第几行开始
 */
export const StartRowSkeletonText: SkeletonTextStory = {
  args: {
    rows: 5,
    startRow: 3,
  },
  render: (args) => (
    <div className="w-[300px]">
      <SkeletonText {...args} />
    </div>
  ),
};
