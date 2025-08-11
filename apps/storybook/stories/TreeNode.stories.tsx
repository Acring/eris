import { Meta, StoryObj } from '@storybook/react';
import { Tree } from '@xsky/eris-ui';

const treeData = [
  {
    key: '0-0',
    title: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '0-0-1',
        children: [
          {
            key: '0-0-0-1',
            title: '0-0-0-1',
            children: [
              { key: '0-0-0-0-1', title: '0-0-0-0-1' },
              { key: '0-0-0-0-2', title: '0-0-0-0-2' },
            ],
          },
        ],
      },
    ],
  },
];

export default {
  title: 'DATA DISPLAY/Tree/TreeNode',
  component: Tree,
  tags: ['visual-test'],
  argTypes: {
    selectMode: {
      control: 'select',
      options: ['single', 'checkbox', 'radio'],
      defaultValue: { summary: 'single' },
      description: '选择模式',
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '是否禁用当前节点',
    },
    title: {
      control: {
        type: 'text',
      },
      description: '节点的标题',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '""' },
      },
    },
    tip: {
      control: {
        type: 'text',
      },
      description: '小 i 提示内容',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '""' },
      },
    },
    key: {
      control: {
        type: 'text',
      },
      description: 'key 在整个树范围内唯一',
    },
  },
} as Meta;

type TreeStory = StoryObj<typeof Tree>;

export const BasicTree: TreeStory = {
  render: () => {
    return <Tree treeData={treeData} defaultExpandAll />;
  },
};
