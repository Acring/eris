import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Card, Checkbox, CardProps, cn, Tabs } from '@xsky/eris-ui';
import { RightLine16 } from '@xsky/eris-icons';

export default {
  title: 'DATA DISPLAY/Card',
  component: Card,
  tags: ['visual-test'],
  argTypes: {
    type: {
      description: '卡片类型，可设置为 `inner` 或 不设置 ',
    },
    size: {
      table: {
        type: { summary: 'default | small' },
        defaultValue: { summary: 'default' },
      },
      description: '卡片大小 ',
    },
    extra: {
      description: '右上角的操作区域 ',
    },
    title: {
      description: '标题区域',
    },
  },
} as Meta;

type CardStory = StoryObj<CardProps>;

export const Basic: CardStory = {
  tags: ['visual-test'],
  args: {
    className: 'w-[300px] h-[300px]',
    title: '标题',
    extra: (
      <div className="text-text-2 hover:text-primary-hover flex cursor-pointer">
        更多
        <RightLine16 className="pt-[3px]" />
      </div>
    ),
    children: (
      <div>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
      </div>
    ),
  },
};

export const Size: CardStory = {
  render: () => (
    <div className="flex items-start gap-2">
      <Card title={<div className="text-subhead">标题</div>} className="w-[300px]">
        <div>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
        </div>
      </Card>
      <Card title="标题" className="w-[300px]" size="small">
        <div>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
        </div>
      </Card>
      <Card title="标题" className="w-[300px] px-[8px] py-[8px]" size="small">
        <div>内容</div>
      </Card>
    </div>
  ),
};

export const Inner: CardStory = {
  render: () => (
    <Card title="标题" className="w-[400px]">
      <Card title="嵌套标题1" className="mb-[14px] w-[300px]" type="inner">
        内容1
      </Card>
      <Card title="嵌套标题2" className="w-[300px]" type="inner">
        内容2
      </Card>
    </Card>
  ),
};

const OperateCard = () => {
  const [checked, setChecked] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const handleCheckedChange = (newChecked: boolean) => setChecked(newChecked);
  console.log('controlled checked', checked);
  return (
    <Card
      title={
        <Checkbox
          checked={checked}
          onChange={handleCheckedChange}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="h-full w-full"
        >
          <div className="ml-[8px] cursor-pointer">标签</div>
        </Checkbox>
      }
      extra="操作区域"
      className={cn(
        'border-stroke-border-2 w-[400px] border border-solid transition-shadow duration-200',
        {
          'border-primary-normal': checked,
          'shadow-elevation-3-bottom': hovered,
          'shadow-none': !hovered,
        },
      )}
    >
      <div className="bg-grey-100 h-[100px] w-full">内容</div>
    </Card>
  );
};

export const WithOperate: CardStory = {
  render: () => <OperateCard />,
};

export const WithTab: CardStory = {
  render: () => {
    return (
      <Card title="标题" className="w-[400px]">
        <Tabs
          tabs={[
            {
              key: '1',
              label: `Tab 1`,
              children: `Content of Tab Pane 1`,
            },
            {
              key: '2',
              label: `Tab 2`,
              children: `Content of Tab Pane 2`,
            },
          ]}
        />
      </Card>
    );
  },
};

export const WithLongTitle: CardStory = {
  render: () => {
    const longTitle = '标题标题标题标题标题标题标题标题标题标题标题标题';

    return (
      <>
        <Card
          title={longTitle}
          className="w-[400px] mb-2"
          extra={
            <div className="text-text-2 hover:text-primary-hover flex cursor-pointer">
              更多操作
              <RightLine16 className="pt-[3px]" />
            </div>
          }
        >
          默认换行
        </Card>
        <Card
          title={<div className="truncate">{longTitle}</div>}
          className="w-[400px]"
          extra={
            <div className="text-text-2 hover:text-primary-hover flex cursor-pointer">
              更多操作
              <RightLine16 className="pt-[3px]" />
            </div>
          }
        >
          省略
        </Card>
      </>
    );
  },
};
