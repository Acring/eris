import React from 'react';
import Image from 'next/image';
import {
  Button,
  HandlerElementType,
  StepItem,
  Steps,
  StepsProps,
  StepsPropsVertical,
} from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import LoadingIcon from './assets/loading.png';

// @ts-ignore
export default {
  title: 'NAVIGATION/Steps',
  component: Steps,
  tags: ['visual-test'],
  argTypes: {
    className: {
      description: '根节点样式名',
    },
    innerClasses: {
      type: 'string',
      description: '内部自定义样式名',
    },
    mode: {
      type: {
        name: 'enum',
        value: ['interactive', 'display'],
      },
      description: '步骤条的模式, 仅在 vertical 布局下生效',
      table: {
        type: { summary: ['interactive', 'display'] },
        defaultValue: { summary: 'interactive' },
      },
    },
    current: {
      control: {
        type: 'number',
      },
      description: '当前步骤, 仅在 mode 为 interactive 时生效',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    items: {
      control: {
        type: 'array',
      },
      description: '步骤项',
      table: {
        type: {
          summary: 'StepItem[]',

          detail: `
            interface StepItem {
              title: ReactNode | string;
              description?: ReactNode | string;
              actionStatus?: 'abnormal' | 'warning' | 'error' | 'done';
              content?: Content<Direction>;
              controller?: Controller;
            }

            interfaceController = {
              type?: HandlerElementType;
              text?: string | ReactNode;
              loadingIcon?: ReactNode;
              onClick?: (e: React.MouseEvent<HTMLElement>) => void;
            }`,
        },
      },
    },
    direction: {
      type: {
        name: 'enum',
        value: ['vertical', 'horizontal'],
      },
      description: '步骤条布局',
      table: {
        type: { summary: ['vertical', 'horizontal'] },
        defaultValue: { summary: 'vertical' },
      },
    },
    type: {
      type: {
        name: 'enum',
        value: ['line', 'card'],
      },
      description: '步骤条的类型，用于展示不同形态',
      table: {
        type: { summary: ['line', 'card'] },
        defaultValue: { summary: 'line' },
      },
    },
    size: {
      type: {
        name: 'enum',
        value: ['default', 'lg'],
      },
      description: '步骤条的大小，仅在垂直布局下生效',
      table: {
        type: { summary: ['default', 'lg'] },
        defaultValue: { summary: 'default' },
      },
    },
    onStepClick: {
      control: {
        type: 'function',
      },
      description: '点击已完成步骤标题的回调函数',
      table: {
        type: { summary: '(current: number, e: React.MouseEvent<HTMLDivElement>) => void' },
      },
    },
  },
} as Meta;

type StepsStory = StoryObj<StepsProps>;

const StepsComponent = (args: StepsPropsVertical & { current: number }) => {
  const { items, current: defaultCurrent, direction, size } = args;
  const [current, setCurrent] = React.useState(defaultCurrent);
  const onClick = (current: number) => {
    setCurrent(current);
  };
  React.useEffect(() => {
    setCurrent(defaultCurrent);
  }, [defaultCurrent]);
  return (
    <Steps
      current={current}
      items={items}
      direction={direction}
      size={size}
      onStepClick={onClick}
    />
  );
};

export const BaseSteps: StepsStory = {
  args: {
    items: [
      {
        title: '第一步',
        description: '第一步的描述',
        content: '这是第一步的内容呀',
      },
      {
        title: '第二步',
        description: '第二步的描述',
        content: '这是第二步的内容呀',
      },
      {
        title: '第三步',
        description: '第三步的描述',
        content: '这是第三步的内容呀',
      },
    ],
    current: 2,
    size: 'default',
    direction: 'vertical',
  },
};

export const LgVerticalSteps: StepsStory = {
  args: {
    items: [
      {
        title: '第一步',
        description: '第一步的描述',
        content: '这是一的内容呀',
      },
      {
        title: '第二步',
        description: '第二步的描述',
        content: '这是二的内容呀',
      },
      {
        title: '第三步',
        description: '第三步的描述',
        content: '这是三的内容呀',
      },
    ],
    current: 2,
    size: 'lg',
  },
};

export const HorizontalSteps: StepsStory = {
  render() {
    const items = [
      {
        title: '第一步',
      },
      {
        title: '第二步',
        description: '第二步的描述',
      },
      {
        title: '第三步',
        description: '第三步的描述',
      },
    ];
    return (
      <div>
        <h3>横向（常用）</h3>
        <Steps
          className="shadow-none"
          current={2}
          direction="horizontal"
          items={[
            ...items,
            {
              title: '第四步',
              description: '第四步的描述',
            },
            {
              title: '第五步',
              description: '第五步的描述',
            },
          ]}
          type="card"
        />
        <div className="mt-[20px]" />
        <h3>横向（简洁）</h3>
        <Steps current={2} direction="horizontal" items={items} />
      </div>
    );
  },
};

export const AbnormalHorizontalSteps: StepsStory = {
  args: {
    items: [
      {
        title: '第一步',
        actionStatus: 'warning',
        description: '当前步骤状态异常',
      },
      {
        title: '第二步',
        actionStatus: 'error',
        description: '当前步骤状态错误',
      },
      {
        title: '第三步标题很长很长很长很长很长很长第三步标题很长很长很长很长很长很长',
        description: '标题超长自动换行',
      },
    ],
    current: 2,
    direction: 'horizontal',
  },
};

export const CustomizeTitleSteps: StepsStory = {
  args: {
    items: [
      {
        title: '第一步',
        description: '第一步的描述',
        content: '这是第一步的内容呀',
      },
      {
        title: (
          <>
            <span>带按钮的标题</span>
            <Button className="ml-[4px]" type="text" color="primary" size="xs">
              文字按钮
            </Button>
          </>
        ),
        description: '第二步的描述',
        content: '这是第二步的内容呀',
      },
      {
        title: '第三步',
        description: '第三步的描述',
        content: '这是第三步的内容呀',
      },
    ],
    current: 2,
    size: 'default',
    direction: 'vertical',
  },
};

export const DisplaySteps: StepsStory = {
  args: {
    items: [
      {
        title: '第一步',
        description: '第一步的描述',
        content: '这是第一步的内容呀',
      },
      {
        title: '第二步',
        description: '第二步的描述',
        content: '这是第二步的内容呀',
      },
      {
        title: '第三步',
        description: '第三步的描述',
        content: '这是第三步的内容呀',
      },
    ],
    direction: 'vertical',
    mode: 'display',
  },
};

export const CardSteps: StepsStory = {
  tags: ['skip-test'],
  render() {
    const defaultItems = [
      {
        title: '文件存储前置资源文件存储前置资源置资置资',
        description: '需要先创建好对应集集群',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
      {
        title: '对接外部集群',
        description: '需要对接拥有管理员权限的外部集群',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
      {
        title: '创建存储后端',
        description: '按照业务所需类型为标准文件系统的存储后端',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
    ];
    const finishItems: StepItem<'horizontal'>[] = [
      {
        title: '文件存储前置资源文件存储前置资源置资置资',
        description: '需要先创建好对应集集群',
        actionStatus: 'done',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
      {
        title: '对接外部集群',
        description: '需要对接拥有管理员权限的外部集群',
        actionStatus: 'done',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
      {
        title: '创建存储后端',
        description: '按照业务所需类型为标准文件系统的存储后端',
        actionStatus: 'done',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
    ];
    const moreItems = [
      {
        title: 'File storage prerequisites File storage prerequisites',
        description:
          'The storage backend is a standard file system according to the business requirements.',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
      {
        title: '对接外部集群',
        description: '需要对接拥有管理员权限的外部集群',
        controller: {
          type: HandlerElementType.button,
          text: '创建',
          loadingIcon: (
            <Image
              className="text-primary-normal ml-[8px] animate-spin"
              width={16}
              height={16}
              src={LoadingIcon}
              alt="spinner"
            />
          ),
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
      {
        title: '创建存储后端',
        description: '按照业务所需类型为标准文件系统的存储后端',
        controller: {
          type: HandlerElementType.link,
          text: '访问创建引导',
          onClick: (e: any) => {
            alert('点击');
          },
        },
      },
      {
        title: '对接外部集群2',
        description: '按照业务所需类型为标准文件系统的存储后端',
        controller: <div>自定义元素</div>,
      },
      {
        title: '创建存储后端2',
        description: '按照业务所需类型为标准文件系统的存储后端',
      },
      {
        title: '对接外部集群3',
        description: '需要对接拥有管理员权限的外部集群',
      },
      {
        title: '创建存储后端3',
        description: '按照业务所需类型为标准文件系统的存储后端',
      },
    ];
    const customItems: StepItem<'horizontal'>[] = [
      {
        title: '文件存储前置资源文件存储前置资源置资置资',
        description:
          '需要先创建好对应集集群需要先创建好对应集集群需要先创建好对应集集群需要先创建好对应集集群需要先创建好对应集集群',
        actionStatus: 'done',
        controller: {
          type: HandlerElementType.button,
          text: (
            <Button size="sm" onClick={() => alert('点击1')}>
              测试1
            </Button>
          ),
          loadingIcon: (
            <Image
              className="text-primary-normal ml-[8px] animate-spin"
              width={16}
              height={16}
              src={LoadingIcon}
              alt="spinner"
            />
          ),
        },
      },
      {
        title: '对接外部集群',
        description: '需要对接拥有管理员权限的外部集群',
        actionStatus: 'done',
        controller: {
          type: HandlerElementType.button,
          text: (
            <Button size="sm" onClick={() => alert('点击2')}>
              测试2
            </Button>
          ),
        },
      },
      {
        title: '创建存储后端',
        description: '按照业务所需类型为标准文件系统的存储后端',
        actionStatus: 'done',
        controller: {
          type: HandlerElementType.link,
          text: <div>我是普通文本</div>,
        },
      },
    ];
    return (
      <div>
        <Steps type="card" current={2} direction="horizontal" items={defaultItems} />
        <Steps className="mt-[20px]" type="card" direction="horizontal" items={finishItems} />
        <Steps
          className="mt-[20px]"
          type="card"
          items={moreItems}
          current={2}
          direction="horizontal"
        />
        <Steps className="mt-[20px]" type="card" direction="horizontal" items={customItems} />
      </div>
    );
  },
};

export const HideGoBackSteps: StepsStory = {
  args: {
    items: [
      {
        title: '第一步',
        description: '第一步的描述',
        content: '这是第一步的内容呀',
      },
      {
        title: '第二步',
        description: '第二步的描述',
        content: '这是第二步的内容呀',
      },
      {
        title: '第三步',
        description: '第三步的描述',
        content: '这是第三步的内容呀',
      },
    ],
    current: 2,
    size: 'default',
    direction: 'vertical',
    hideGoBack: true,
  },
};
