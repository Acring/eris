// SkeletonParagraph stories

import { SkeletonParagraph } from '@xsky/eris-ui';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'DATA ENTRY/Skeleton/SkeletonParagraph',
  component: SkeletonParagraph,
  tags: ['skip-test'],
  argTypes: {
    className: {
      type: 'string',
      description: '',
      defaultValue: '',
    },
    rows: {
      type: 'number',
      description: '段落的行数',
      defaultValue: '',
    },
  },
} as Meta;

type SkeletonParagraphStory = StoryObj<typeof SkeletonParagraph>;

/**
 * 基础样式
 */
export const BaseSkeletonParagraph: SkeletonParagraphStory = {
  args: {
    rows: 10,
  },
  render: (args) => (
    <div className="w-[300px]">
      <SkeletonParagraph {...args} />
    </div>
  ),
};
