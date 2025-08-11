import { InputNumber, Pagination, Switch } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ['visual-test'],
  title: 'NAVIGATION/Pagination',
  argTypes: {
    selectedCount: {
      control: {
        type: 'number',
      },
      description: '已选中的条数',
    },
    rowsPerPageOptions: {
      control: {
        type: 'object',
      },
      table: {
        defaultValue: { summary: '[10, 50, 100, 200]' },
      },
      description: '每页条数选项',
    },
    totalCount: {
      control: {
        type: 'number',
      },
      description: '总条数',
    },
    defaultPage: {
      control: {
        type: 'number',
      },
      description: '默认页码',
    },
    page: {
      control: {
        type: 'number',
      },
      description: '当前页码',
    },
    rowsPerPage: {
      control: {
        type: 'number',
      },
      description: '每页条数',
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md'],
      description: '按钮大小',
    },
    mini: {
      control: {
        type: 'boolean',
      },
      description: '是否为迷你模式',
    },
    onPageChange: {
      action: 'onPageChange',
      description: '页码改变时的回调',
    },
    onRowsPerPageChange: {
      action: 'onRowsPerPageChange',
      description: '每页条数改变时的回调',
    },
  },
  args: {
    rowsPerPageOptions: [10, 50, 100, 200],
    page: 1,
    rowsPerPage: 10,
    size: 'md',
    mini: false,
    onPageChange: (page: number) => console.log('onPageChange', page),
    onRowsPerPageChange: (rowsPerPage: number) => console.log('onRowsPerPageChange', rowsPerPage),
  },
};

type Story = StoryObj<typeof Pagination>;

export const Base: Story = {
  args: {
    selectedCount: 0,
    totalCount: 1000,
    defaultPage: 1,
    rowsPerPage: 100,
  },
};

export const Small: Story = {
  args: {
    selectedCount: 0,
    totalCount: 1000,
    defaultPage: 1,
    rowsPerPage: 100,
    size: 'sm',
  },
};

export const Mini: Story = {
  args: {
    defaultPage: 1,
    totalCount: 300,
    rowsPerPage: 100,
    mini: true,
  },
};

function ShowCountStory(args: any) {
  const [showCount, setShowCount] = useState(args['showCount']);
  const [selectedCount, setSelectedCount] = useState(args['selectedCount']);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Switch checked={showCount} onChange={setShowCount}></Switch>
        <InputNumber value={selectedCount} onChange={setSelectedCount} className="w-[72px]" />
      </div>
      <Pagination {...args} showCount={showCount} selectedCount={selectedCount} />
    </div>
  );
}

export const ShowCount: Story = {
  args: {
    selectedCount: 10,
    totalCount: 1000,
    defaultPage: 1,
    rowsPerPage: 100,
    showCount: false,
  },
  render: (args) => <ShowCountStory {...args} />,
};

export default meta;
