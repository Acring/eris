import Image from 'next/image';
import React from 'react';
import { Button, Spinner, ConfigProvider } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import xSpinner from './assets/x_spinner.gif';
import xSpinnerWhite from './assets/x_spinner_white.gif';
import LoadingSvg from './assets/loading.svg';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ['skip-test'],
  title: 'FEEDBACK/Spinner',
  argTypes: {
    classes: {
      control: 'object',
      description: '自定义类名',
      table: {
        type: {
          summary: 'SpinnerClassName',
          detail: 'interface SpinnerClassName {\n  root?: string;\n  body?: string;\n}',
        },
      },
    },
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md', 'lg'],
      },
      defaultValue: 'md',
      description: '组件的大小。',
    },
    tip: {
      type: 'string',
      defaultValue: '',
      description: '提示的内容。',
    },
    tipPosition: {
      type: {
        name: 'enum',
        value: ['top', 'bottom', 'left', 'right'],
      },
      defaultValue: 'bottom',
      description: '提示的位置。',
    },
    children: {
      type: 'string',
      defaultValue: '',
      description: '加载中覆盖的子元素',
    },
    spinning: {
      type: 'boolean',
      defaultValue: false,
      description: '子元素是否加载中',
    },
    color: {
      description: '颜色',
      defaultValue: 'default',
    },
  },
};

type Story = StoryObj<typeof Spinner> & {
  [key: string]: any;
};

export const Base: Story = {
  args: {
    size: 'md',
  },
  render: (args) => <Spinner {...args} />,
};

export const Tip: Story = {
  args: {
    size: 'md',
    tip: '加载中',
  },
  render: () => (
    <div className="text-primary-normal flex items-start gap-2">
      <Spinner size="sm" tip="加载中" />
      <Spinner size="md" tip="加载中" />
      <Spinner size="lg" tip="加载中" />
    </div>
  ),
};

export const TipPosition: Story = {
  args: {
    size: 'md',
    tip: '加载中',
    tipPosition: 'top',
  },
  render: () => (
    <div className="text-primary-normal flex flex-col items-start gap-2">
      <Spinner size="md" tip="加载中" tipPosition="top" />
      <Spinner size="md" tip="加载中" tipPosition="bottom" />
      <Spinner size="md" tip="加载中" tipPosition="left" />
      <Spinner size="md" tip="加载中" tipPosition="right" />
    </div>
  ),
};

export const WithChildrenDefault: Story = {
  args: {
    size: 'md',
    tip: '加载中',
  },
  render: () => (
    <Spinner size="md" tip="加载中">
      <div className="h-10  border-spacing-1 overflow-hidden rounded-lg bg-blue-500 p-2">
        I am a child element default
      </div>
    </Spinner>
  ),
};

export const WithChildren: Story = {
  args: {
    size: 'md',
    tip: '加载中',
  },
  SpinningElements: ({ controlSpining = false }) => {
    const [spinning, setSpinning] = React.useState(controlSpining);
    const SpinnerChild = () => {
      return (
        <div className="h-10 border-spacing-1 overflow-hidden rounded-lg bg-blue-500 p-2">
          I am a child element
        </div>
      );
    };
    return (
      <div className="rounded-2 flex flex-col items-start gap-2 p-2">
        {!controlSpining && <Button onClick={() => setSpinning(!spinning)}>Toggle</Button>}
        <Spinner
          classes={{ root: 'text-red-400', body: 'h-full' }}
          size="sm"
          tip="加载中"
          spinning={spinning}
        >
          <SpinnerChild />
        </Spinner>
        <Spinner size="md" tip="加载中" spinning={spinning}>
          <SpinnerChild />
        </Spinner>
        <Spinner size="lg" tip="加载中" spinning={spinning}>
          <SpinnerChild />
        </Spinner>
      </div>
    );
  },
  render: () => <WithChildren.SpinningElements></WithChildren.SpinningElements>,
};
export const Dark: Story = {
  render: () => (
    <div className="flex w-[320px] justify-between text-white">
      <div className="flex w-[150px] flex-col items-center gap-2 bg-blue-500 ">
        默认暗色背景下
        <Spinner size="sm" tip="加载中" color="white" />
        <Spinner size="md" tip="加载中" color="white" />
        <Spinner size="lg" tip="加载中" color="white" />
      </div>
      <div className="flex w-[150px] flex-col items-center gap-2 bg-blue-500 ">
        自定义暗色背景下
        <ConfigProvider
          spinnerIndicator={{
            white: {
              md: <Image src={xSpinnerWhite} width={32} height={32} alt="spinner" />,
              lg: <Image src={xSpinnerWhite} width={64} height={64} alt="spinner" />,
            },
          }}
        >
          <Spinner size="sm" tip="加载中" color="white" />
          <Spinner size="md" tip="加载中" color="white" />
          <Spinner size="lg" tip="加载中" color="white" />
        </ConfigProvider>
      </div>
    </div>
  ),
};

export const WithConfigProvider: Story = {
  render: () => (
    <ConfigProvider
      spinnerIndicator={{
        default: {
          md: <Image src={xSpinner} width={32} height={32} alt="spinner" />,
          lg: <Image src={xSpinner} width={64} height={64} alt="spinner" />,
        },
      }}
    >
      <WithChildren.SpinningElements controlSpining={true} />
    </ConfigProvider>
  ),
};
const CustomSpinning = ({ size = 32 }: { size?: number }) => {
  return (
    <div className="flex animate-spin">
      <Image
        className="text-primary-normal"
        width={size}
        height={size}
        src={LoadingSvg}
        alt="spinner"
      />
    </div>
  );
};

export const Oem: Story = {
  render: () => (
    <>
      <ConfigProvider
        spinnerIndicator={{
          default: {
            sm: <CustomSpinning size={16} />,
            md: <CustomSpinning />,
            lg: <CustomSpinning size={64} />,
          },
        }}
      >
        <WithChildren.SpinningElements controlSpining={true} />
      </ConfigProvider>
    </>
  ),
};

export const Color: Story = {
  render: () => (
    <>
      <div className="flex w-[320px] justify-between">
        <div className="flex w-[150px] flex-col items-center gap-2 bg-grey-200">
          默认不同场景下
          <Spinner size="md" tip="暗色加载中" color="white" />
          <Spinner size="md" tip="正常加载中" color="default" />
          <Spinner size="md" tip="Danger 加载中" color="danger" />
        </div>
      </div>
    </>
  ),
};
export default meta;
