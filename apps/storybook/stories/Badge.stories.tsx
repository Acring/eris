import { Badge } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { AlertLine20 } from '@xsky/eris-icons';

export default {
  title: 'DATA DISPLAY/Badge',
  component: Badge,
  tags: ['visual-test'],
  argTypes: {
    count: {
      control: {
        type: 'number',
      },
      description: '展示的数字，大于maxCount 就展示 maxCount +',
    },
    maxCount: {
      control: {
        type: 'number',
      },
      defaultValue: 99,
      description: '封顶的数字',
    },
    maxCountContent: {
      description: '自定义超过封顶数字的展示内容',
    },
    dot: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: ' 不展示数字，展示小红点 ',
    },
  },
} as Meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  render: () => (
    <>
      <Badge count={9}>
        <AlertLine20 />
      </Badge>
      <br />
      <Badge count={99}>
        <AlertLine20 />
      </Badge>
      <br />
      <Badge count={100}>
        <AlertLine20 />
      </Badge>
    </>
  ),
};

export const Dot: Story = {
  args: {
    dot: true,
  },
  render: (args) => <Badge {...args}>紧急</Badge>,
};

export const MaxCount: Story = {
  args: {
    count: 1000,
    maxCount: 100,
  },
  render: (args) => (
    <Badge {...args}>
      <AlertLine20 />
    </Badge>
  ),
};

export const MaxCountContent: Story = {
  args: {
    count: 10001,
    maxCountContent: '一万+',
  },
  render: (args) => (
    <Badge {...args}>
      <AlertLine20 />
    </Badge>
  ),
};
