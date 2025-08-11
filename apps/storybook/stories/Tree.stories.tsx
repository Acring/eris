import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tree, TreeNodeProps, Radio, Input, Empty } from '@xsky/eris-ui';
import { DirectoryLine16 } from '@xsky/eris-icons';

const treeData = [
  {
    key: '0-0',
    title: '0-0',
    tip: 'tooltip text',
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
  {
    key: '0-1',
    title: '0-1',
    disabled: true,
    children: [
      {
        key: '0-1-0',
        title: '0-1-0',
      },
      {
        key: '0-1-1',
        title: '0-1-1',
      },
    ],
  },
];

export default {
  title: 'DATA DISPLAY/Tree/Tree',
  component: Tree,
  tags: ['visual-test'],
  argTypes: {
    autoExpandParent: {
      control: 'boolean',
      defaultValue: { summary: 'true' },
      description: '是否自动展开父节点',
    },
    checkStrictly: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: 'checkable 状态下节点选择完全受控（父子节点选中状态不再关联）',
    },
    selectable: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '是否可选中',
    },
    multiple: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '是否可多选',
    },
    expandOnClickNode: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '可选择时，支持点击节点也能展开收起',
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      description: '禁用状态',
    },
    selectedKeys: {
      control: 'object',
      description: '选中的节点（受控）',
    },
    defaultSelectedKeys: {
      control: 'object',
      description: '默认选中的节点',
    },
    value: {
      control: 'object',
      description:
        '当前选中的值（受控），如果父元素选中，则只返回父元素的 key，否则返回子元素的 key',
    },
    defaultValue: {
      control: 'object',
      description: '默认选中的值',
    },
    defaultExpandAll: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: 'false' },
      description: '默认展开所有的节点',
    },
    defaultExpandedKeys: {
      control: 'object',
      description: '默认展开的指定节点',
    },
    expandedKeys: {
      control: 'object',
      description: '展开的节点（受控）',
    },
    icon: {
      description: '自定义节点图标',
    },
    titleRender: {
      description: '自定义标题的渲染',
    },
    treeData: {
      description: '树结构',
    },
    onSelect: {
      description: '点击节点触发',
    },
    onChange: {
      description: '选中节点变化时触发，参数为当前选中的 value 值',
    },
    onExpand: {
      description: '展开收起节点时触发',
    },
    treeItemClassName: {
      description: '每个节点的 className',
    },
  },
} as Meta;

type TreeStory = StoryObj<typeof Tree>;

export const BasicTree: TreeStory = {
  name: 'BasicTree',
  args: {
    defaultExpandAll: true,
    treeData,
    className: 'w-[300px]',
  },
};

export const SmallTree: TreeStory = {
  name: 'SmallTree',
  args: {
    defaultExpandAll: true,
    treeData,
    className: 'w-[300px]',
    treeItemClassName: 'py-[3px]',
  },
};

export const SingleSelectTree: TreeStory = {
  args: {
    defaultSelectedKeys: ['0-0-1'],
    defaultExpandedKeys: ['0-0-1'],
    selectable: true,
    treeData,
    className: 'w-[300px]',
    onChange(value) {
      console.log('🦄  value:', value);
    },
    onSelect: (selectedKeys, { selected, node, isLeaf }) => {
      console.log('🦄  selectedKeys:', selectedKeys);
    },
  },
};

export const WithCheckboxTree: TreeStory = {
  args: {
    defaultSelectedKeys: ['0-0-1', '0-1-0'],
    defaultExpandAll: true,
    selectable: true,
    selectMode: 'checkbox',
    treeData,
    className: 'w-[300px]',
  },
};

export const CheckStrictlyTree: TreeStory = {
  args: {
    defaultSelectedKeys: ['0-0'],
    defaultExpandAll: true,
    selectable: true,
    selectMode: 'checkbox',
    checkStrictly: true,
    treeData,
    className: 'w-[300px]',
  },
};

export const CustomIconTree: TreeStory = {
  args: {
    defaultExpandAll: true,
    icon: <DirectoryLine16 className="text-icon-outlined-displayed pr-[4px]" />,
    titleRender: (item: TreeNodeProps) => {
      return <span className="text-primary-normal">{item.title}</span>;
    },
    selectable: true,
    selectMode: 'checkbox',
    treeData,
    className: 'w-[300px]',
  },
};

export const DisabledTree: TreeStory = {
  render: () => {
    return (
      <>
        <div className="flex">
          <Tree
            treeData={treeData}
            defaultExpandAll
            selectable
            selectMode="checkbox"
            disabled
            className="w-[300px]"
          />
          <Tree treeData={treeData} defaultExpandAll selectable disabled className="w-[300px]" />
        </div>
      </>
    );
  },
};

export const RadioTree: TreeStory = {
  args: {
    defaultExpandAll: true,
    selectable: true,
    selectMode: 'radio',
    treeData,
    className: 'w-[300px]',
    onChange(value) {
      console.log('🦄  value:', value);
    },
    onSelect: (selectedKeys, { selected, node, isLeaf }) => {
      console.log('🦄  selectedKeys:', selectedKeys);
    },
  },
};

function searchData(inputValue: string) {
  const loop = (data: TreeNodeProps[]) => {
    const result: TreeNodeProps[] = [];
    data.forEach((item: TreeNodeProps) => {
      const title = (item.title || '').toString();
      if (title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        const filterData = loop(item.children);

        if (filterData.length) {
          result.push({ ...item, children: filterData });
        }
      }
    });
    return result;
  };

  return loop(treeData);
}

const SearchTree = () => {
  const [innerTreeData, setInnerTreeData] = useState<TreeNodeProps[]>(treeData);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!inputValue) {
      setInnerTreeData(treeData);
    } else {
      const result = searchData(inputValue);
      setInnerTreeData(result);
    }
  }, [inputValue]);

  return (
    <div className="w-[300px]">
      <Input onChange={setInputValue} />
      {innerTreeData.length === 0 ? (
        <Empty description="暂无搜索结果，请重新输入" />
      ) : (
        <Tree
          selectMode="checkbox"
          titleRender={(node) => {
            const title = (node.title || '').toString();
            if (!title) return null;
            if (inputValue) {
              const index = title.toLowerCase().indexOf(inputValue.toLowerCase());

              if (index === -1) {
                return title;
              }

              const prefix = title.substring(0, index);
              const suffix = title.substring(index + inputValue.length);
              return (
                <span>
                  {prefix}
                  <span className="text-primary-normal">
                    {title.substring(index, index + inputValue.length)}
                  </span>
                  {suffix}
                </span>
              );
            }

            return title;
          }}
          className="pt-[4px]"
          treeData={innerTreeData}
          defaultExpandAll
          selectable
        />
      )}
    </div>
  );
};
export const SearchDataTree: TreeStory = {
  render: () => <SearchTree />,
};

function ControlledTreeStory() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">受控的 Tree 组件</h3>
        <p className="text-sm text-text-2">当前选中的 value: {value.join(', ')}</p>
      </div>
      <Tree
        treeData={treeData}
        defaultExpandAll
        selectable
        value={value}
        onChange={(value) => {
          console.log('🦄  value:', value);
          setValue(value as string[]);
        }}
      />
    </div>
  );
}

export const ControlledTree: TreeStory = {
  render: () => <ControlledTreeStory />,
};

export const WithValueTree: TreeStory = {
  render: () => <WithValueTreeStory />,
};

function WithValueTreeStory() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const handleSelect = (
    keys: string[],
    { selected, node, isLeaf }: { selected: boolean; node: TreeNodeProps; isLeaf: boolean },
  ) => {
    console.log('选中的节点 keys:', keys);
    setSelectedKeys(keys);
  };

  const handleChange = (newValue: string[]) => {
    console.log('value 值:', newValue);
    setValue(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Tree 组件的 value 属性示例</h3>
        <p className="text-sm text-text-2">
          当父元素选中时，value 只包含父元素；当子元素选中时，value 包含子元素
        </p>
      </div>
      <Tree
        treeData={treeData}
        defaultExpandAll
        selectable
        className="w-[300px]"
        selectedKeys={selectedKeys}
        value={value}
        onSelect={handleSelect}
        onChange={(value) => handleChange(value as string[])}
      />
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">selectedKeys:</span>
          <code className="rounded bg-gray-100 px-2 py-1 text-sm">
            {JSON.stringify(selectedKeys)}
          </code>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">value:</span>
          <code className="rounded bg-gray-100 px-2 py-1 text-sm">{JSON.stringify(value)}</code>
        </div>
      </div>
    </div>
  );
}

// 添加一个更复杂的示例，展示中国城市的层级结构
function CityTreeWithValueStory() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const cityTreeData = [
    {
      key: 'china',
      title: '中国',
      children: [
        {
          key: 'sichuan',
          title: '四川',
          children: [
            { key: 'chengdu', title: '成都' },
            { key: 'mianyang', title: '绵阳' },
          ],
        },
        {
          key: 'liaoning',
          title: '辽宁',
          children: [
            { key: 'shenyang', title: '沈阳' },
            { key: 'dalian', title: '大连' },
          ],
        },
      ],
    },
  ];

  const handleSelect = (
    keys: string[],
    { selected, node, isLeaf }: { selected: boolean; node: TreeNodeProps; isLeaf: boolean },
  ) => {
    console.log('选中的节点 keys:', keys);
    setSelectedKeys(keys);
  };

  const handleChange = (newValue: string[]) => {
    console.log('value 值:', newValue);
    setValue(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">城市树示例</h3>
        <p className="text-sm text-text-2">
          如果选中&quot;中国&quot;，value 为 [&quot;china&quot;];如果只选中&quot;成都&quot;，value
          为 [&quot;chengdu&quot;]
        </p>
      </div>
      <Tree
        treeData={cityTreeData}
        defaultExpandAll
        selectable
        selectMode="checkbox"
        className="w-[300px]"
        selectedKeys={selectedKeys}
        value={value}
        onSelect={handleSelect}
        onChange={(value) => handleChange(value as string[])}
      />
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">selectedKeys:</span>
          <code className="rounded bg-gray-100 px-2 py-1 text-sm">
            {JSON.stringify(selectedKeys)}
          </code>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">value:</span>
          <code className="rounded bg-gray-100 px-2 py-1 text-sm">{JSON.stringify(value)}</code>
        </div>
      </div>
    </div>
  );
}
export const CityTreeWithValue: TreeStory = {
  render: () => <CityTreeWithValueStory />,
};
