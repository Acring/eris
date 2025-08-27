import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, TreeSelect } from '@xsky/eris-ui';
import type { TreeSelectOption, TreeSelectNodeProps } from '@xsky/eris-ui';
import { DirectoryLine16 } from '@xsky/eris-icons';

const treeData: TreeSelectOption[] = [
  {
    key: '0-0',
    title: '节点 0-0',
    children: [
      {
        key: '0-0-1',
        title: '节点 0-0-1',
        children: [
          {
            key: '0-0-0-1',
            title: '节点 0-0-0-1',
            children: [
              { key: '0-0-0-0-1', title: '节点 0-0-0-0-1' },
              { key: '0-0-0-0-2', title: '节点 0-0-0-0-2' },
              { key: '0-0-0-0-3', title: '节点 0-0-0-0-3' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '节点 0-1',
    disabled: true,
    children: [
      {
        key: '0-1-0',
        title: '节点 0-1-0',
      },
      {
        key: '0-1-1',
        title: '节点 0-1-1',
      },
    ],
  },
];

const treeDataSelected: TreeSelectOption[] = [
  {
    key: '0-0',
    title: '节点 0-0',
    children: [
      {
        key: '0-0-1',
        title: '节点 0-0-1',
        children: [
          {
            key: '0-0-0-1',
            title: '节点 0-0-0-1',
            children: [
              { key: '0-0-0-0-1', title: '节点 0-0-0-0-1' },
              { key: '0-0-0-0-2', title: '节点 0-0-0-0-2' },
              { key: '0-0-0-0-3', title: '节点 0-0-0-0-3' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '节点 0-1',
    children: [
      {
        key: '0-1-0',
        title: '节点 0-1-0',
      },
      {
        key: '0-1-1',
        title: '节点 0-1-1',
      },
    ],
  },
];

export default {
  title: 'DATA ENTRY/TreeSelect',
  component: TreeSelect,
  tags: ['visual-test'],
  argTypes: {
    selectMode: {
      control: {
        type: 'select',
        options: ['checkbox', 'radio', 'single'],
      },
      defaultValue: { summary: 'checkbox' },
      description: '选择模式',
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '是否禁用',
    },
    outlined: {
      control: 'boolean',
      defaultValue: { summary: 'true' },
      description: '是否显示边框',
    },
    autoFocus: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '是否自动获取焦点',
    },
    hideSelectedTag: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '是否隐藏选中项的标签',
    },
    open: {
      control: 'boolean',
      description: '控制下拉框的打开状态',
    },
    placeholder: {
      control: 'text',
      description: '选择框默认文本',
    },
    delay: {
      control: 'number',
      description: '异步搜索的防抖时间',
    },
    triggerSearchOnFocus: {
      control: 'boolean',
      description: '在 onFocus 时触发搜索',
    },
    creatable: {
      control: 'boolean',
      description: '允许用户在没有匹配选项时创建新选项',
    },
    disableClearable: {
      control: 'boolean',
      description: '隐藏清除全部按钮',
    },
    displayMode: {
      control: {
        type: 'select',
        options: ['tag', 'text'],
      },
      description: '多选时的展示模式',
    },
    separator: {
      control: 'text',
      description: '多选时文本展示的分隔符',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: '组件的大小',
    },
    checkStrictly: {
      control: 'boolean',
      description: '是否严格遵循父子节点不关联',
    },
    autoExpandParent: {
      control: 'boolean',
      description: '是否自动展开父节点',
    },
    showParentPath: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '单选时是否显示父级路径，例如：中国/北京',
    },
  },
} as Meta<typeof TreeSelect>;

type TreeSelectStory = StoryObj<typeof TreeSelect>;

export const Basic: TreeSelectStory = {
  args: {
    treeData,
    defaultExpandAll: true,
    placeholder: '请选择',
    onChange: (value) => {
      console.log('value', value);
    },
  },
};

export const Single: TreeSelectStory = {
  name: '单选模式',
  args: {
    treeData,
    placeholder: '请选择',
    selectMode: 'single',
  },
};

export const Multiple: TreeSelectStory = {
  name: 'checkbox 模式',
  parameters: {
    docs: {
      description: {
        story: '多选模式支持 tag 和 text 两种展示方式',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <TreeSelect
        treeData={treeData}
        selectMode="checkbox"
        displayMode="tag"
        placeholder="请选择多个选项(Tag模式)"
        className="w-[300px]"
        onChange={(value) => console.log('value', value)}
      />
      <TreeSelect
        treeData={treeData}
        selectMode="checkbox"
        displayMode="text"
        placeholder="请选择多个选项(Text模式)"
        className="w-[300px]"
        onChange={(value) => console.log('value', value)}
      />
      <TreeSelect
        treeData={treeDataSelected}
        defaultValue={['0-0-0-0-2', '0-0-0-0-3']}
        defaultSelectedKeys={['0-0-0-0-2', '0-0-0-0-3']}
        selectMode="checkbox"
        displayMode="tag"
        placeholder="请选择多个选项(Tag模式)"
        className="w-[300px]"
        onChange={(value) => console.log('value', value)}
      />
    </div>
  ),
};

export const RadioMode: TreeSelectStory = {
  name: 'radio 模式',
  args: {
    treeData,
    selectMode: 'radio',
    placeholder: '请选择',
  },
};

export const Disabled: TreeSelectStory = {
  args: {
    treeData,
    disabled: true,
    placeholder: '禁用状态',
  },
};

export const CustomRender: TreeSelectStory = {
  args: {
    treeData,
    placeholder: '自定义渲染',
    titleRender: (node: TreeSelectNodeProps) => (
      <div className="flex items-center gap-1">
        <DirectoryLine16 />
        <span>{node.title}</span>
      </div>
    ),
  },
};

export const DifferentSizes: TreeSelectStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TreeSelect treeData={treeData} placeholder="小尺寸" size="sm" />
      <TreeSelect treeData={treeData} placeholder="中尺寸" size="md" />
      <TreeSelect treeData={treeData} placeholder="大尺寸" size="lg" />
    </div>
  ),
};

export const WithError: TreeSelectStory = {
  args: {
    treeData,
    placeholder: '错误状态',
    error: true,
  },
};

export const WithParentPath: TreeSelectStory = {
  name: '显示父级路径',
  parameters: {
    docs: {
      description: {
        story: '可以通过 showParentPath 属性控制是否显示父级路径',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div>不显示父级路径（默认）：</div>
        <TreeSelect
          treeData={treeData}
          placeholder="请选择"
          defaultValue="0-0-0-0-1"
          className="w-[300px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>显示父级路径：</div>
        <TreeSelect
          treeData={treeData}
          placeholder="请选择"
          defaultValue="0-0-0-0-1"
          showParentPath
          selectMode="radio"
          className="w-[300px]"
        />
      </div>
    </div>
  ),
};

export const CustomPortal: StoryObj<typeof TreeSelect> = {
  name: '自定义挂载节点',
  render: () => {
    const CustomPortalStory = () => {
      const [container, setContainer] = React.useState<HTMLElement | null>(null);

      return (
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm text-gray-500">默认挂载到 body</div>
            <TreeSelect treeData={treeData} />
          </div>

          <div>
            <div
              ref={(el) => setContainer(el)}
              className="relative border-2 border-dashed border-blue-300 p-4 overflow-hidden h-[200px]"
            >
              <div className="mb-2 text-sm text-blue-500">这是自定义的 Portal 容器</div>
              <TreeSelect portalContainer={container} treeData={treeData} />
            </div>
          </div>
        </div>
      );
    };
    return <CustomPortalStory />;
  },
  parameters: {
    docs: {
      description: {
        story: '通过 `portalContainer` 属性可以自定义下拉菜单的挂载节点，默认挂载到 body。',
      },
    },
  },
};

export const OnBlur: TreeSelectStory = {
  name: 'onBlur',
  render: (args) => {
    function OnBlurStory(args: React.ComponentProps<typeof TreeSelect>) {
      return (
        <TreeSelect
          {...args}
          treeData={treeData}
          onChange={(value) => console.log('onChange', value)}
          onBlur={() => console.log('onBlur')}
          className="w-[300px]"
        />
      );
    }
    return <OnBlurStory {...args} />;
  },
};
