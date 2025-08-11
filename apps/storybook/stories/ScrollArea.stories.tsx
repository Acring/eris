import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@xsky/eris-ui';

const tags = Array.from({ length: 15 }).map(
  (_, index, total) =>
    `v1.2.0-beta.${total.length - index}:  Let life be beautiful like summer flowers`,
);
const scrollContent = (
  <div className="p-[15px]">
    {tags.map((tag) => (
      <div key={tag} className="mt-2.5 whitespace-nowrap leading-6">
        {tag}
      </div>
    ))}
  </div>
);
const metaScrollArea: Meta<typeof ScrollArea> = {
  title: 'OTHER/ScrollArea',
  component: ScrollArea,
  tags: ['skip-test'],
  argTypes: {
    children: { table: { disable: true } },
    color: {
      control: {
        type: 'text',
      },
      description: '滑块的颜色，接受多种颜色值格式，如十六进制、RGB、关键字',
      table: {
        type: { summary: 'string' },
      },
    },
    forceMountVertical: {
      control: {
        type: 'boolean',
      },
      description: '是否默认展示垂直滚动条',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    forceMountHorizontal: {
      control: {
        type: 'boolean',
      },
      description: '是否默认展示水平滚动条',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabledHorizontal: {
      control: {
        type: 'boolean',
      },
      description: '是否开启水平滚动条',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabledVertical: {
      control: {
        type: 'boolean',
      },
      description: '是否开启垂直滚动条',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onScroll: {
      control: false,
      description: '滑动时的回调函数。',
      table: {
        type: { summary: 'function' },
      },
    },
    onScrollToEdge: {
      control: false,
      description: '滚动到边缘时的回调函数。',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

type Story = StoryObj<typeof ScrollArea>;

export const Basic: Story = {
  args: {
    children: scrollContent,
    width: 200,
    height: 250,
  },
  parameters: {
    docs: {
      extractProps: {
        exclude: ['children'],
      },
    },
  },
};
export const Size: Story = {
  render: () => (
    <div className="flex items-start gap-2">
      <ScrollArea width={200} height={250}>
        {scrollContent}
      </ScrollArea>
      <ScrollArea width={200} height={250} thumbSize="thin">
        {scrollContent}
      </ScrollArea>
    </div>
  ),
};
export const Color: Story = {
  render: () => (
    <div className="bg-grey-1000  w-[200px]">
      <ScrollArea width={200} height={250} color="#F6F8FD">
        {scrollContent}
      </ScrollArea>
    </div>
  ),
};
export const WidthAndHeight: Story = {
  render: () => (
    <div>
      <h4>ScrollArea 支持设置 width 和 height </h4>
      <ScrollArea width={200} height={250}>
        {scrollContent}
      </ScrollArea>
      <h4>也可以包裹一层div，在父 div 设置宽度和高度 </h4>
      <div className="rounded shadow-lg" style={{ height: 250, width: 200 }}>
        <ScrollArea width={'100%'} height={'100%'}>
          {scrollContent}
        </ScrollArea>
      </div>
    </div>
  ),
};

export const ForceMountVertical: Story = {
  render: () => (
    <ScrollArea width={200} height={250} forceMountVertical>
      {scrollContent}
    </ScrollArea>
  ),
};
export const ForceMountHorizontal: Story = {
  render: () => (
    <ScrollArea width={200} height={250} forceMountHorizontal={false}>
      {scrollContent}
    </ScrollArea>
  ),
};
export const MaxHeight: Story = {
  render: () => (
    <ScrollArea maxHeight={200} maxWidth={200}>
      {scrollContent}
    </ScrollArea>
  ),
};

export const DisabledScroll: Story = {
  render: () => (
    <div className="flex">
      <div>
        正常情况
        <ScrollArea width={200} height={250}>
          {scrollContent}
        </ScrollArea>
      </div>
      <div>
        禁止水平滚动，超出会换行
        <ScrollArea width={200} height={250} disabledHorizontal>
          {
            <div className="p-[15px]">
              {tags.map((tag) => (
                <div key={tag} className="mt-2.5 leading-6">
                  {tag}
                </div>
              ))}
            </div>
          }
        </ScrollArea>
      </div>
      <div>
        禁止垂直滚动，超出不显示
        <ScrollArea width={200} height={250} disabledVertical>
          {scrollContent}
        </ScrollArea>
      </div>
    </div>
  ),
};
export default metaScrollArea;

export const ShowEdgeShadow: Story = {
  render: () => (
    <ScrollArea width={200} height={250} showEdgeShadow>
      {scrollContent}
    </ScrollArea>
  ),
};

export const OnScrollToEdge: Story = {
  render: () => (
    <ScrollArea
      width={200}
      height={250}
      onScrollToEdge={(state) => {
        console.log('🦄  file: ScrollArea.stories.tsx:91  state:', state);
      }}
    >
      {scrollContent}
    </ScrollArea>
  ),
};
