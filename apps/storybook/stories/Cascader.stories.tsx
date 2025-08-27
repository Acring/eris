import { Meta, StoryObj } from '@storybook/react';
import lodash from 'lodash';
import {
  Cascader,
  CascaderOptionProps,
  CascaderProps,
  InputNumber,
  Empty as EmptyComponent,
  Tag,
} from '@xsky/eris-ui';
import { useRef } from 'react';

export default {
  title: 'DATA ENTRY/Cascader',
  component: Cascader,
  tags: ['visual-test'],
  argTypes: {
    allowClear: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: 'true' },
      description: '是否允许清除。',
    },
    value: {
      control: {
        type: 'array',
      },
      defaultValue: [],
      description: '选中选项的值',
    },
    defaultValue: {
      control: {
        type: 'array',
      },
      defaultValue: [],
      description: '选择器的默认选项。',
    },
    error: {
      type: 'boolean',
      defaultValue: false,
      description: '是否处于错误状态。',
    },
    options: {
      control: {
        type: 'array',
      },
      description: '选项数组。',
    },
    placeholder: {
      type: 'string',
      description: '输入框的占位符。',
      defaultValue: '请选择',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: 'false' },
      description: '是否为禁用状态。',
    },
    tooltip: {
      control: {
        type: 'text',
      },
      description: '提示文案。',
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: 'false' },
      description: '是否在搜索中。',
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: '气泡框是否打开。当为 true 时，气泡框可见。',
    },
    onOpenChange: {
      description: '弹出框打开/关闭时的回调。`(open: boolean) => void`',
    },
    onChange: {
      description:
        '选择完成后的回调。`(value?: string | number[], selectedOptions?: Option[] | Option[][]) => void`',
    },
    filterOption: {
      description:
        '默认搜索是：label 字符匹配，不区分大小写，模糊搜索。通过该方法可以自定义搜索逻辑。`(inputValue: string, path: CascaderOption[]) => boolean`',
    },
    className: {
      control: {
        type: 'text',
      },
      description: '选择器的类名。',
    },
    emptyContent: {
      description: '自定义 option 为空时显示的内容。',
    },
    popoverProps: {
      description: '弹出框属性',
      table: {
        type: {
          summary: 'PopoverProps',
        },
      },
    },
    maxHeight: {
      control: {
        type: 'number',
      },
      description: 'Input 最大高度。',
    },
    trigger: {
      description: '次级菜单的展开方式。',
      table: {
        type: { summary: ['click', 'hover'] },
        defaultValue: { summary: 'click' },
      },
    },
    displayRender: {
      description:
        '选择后展示的渲染函数。`(labels, selectedOptions: Option[] | Option[][]) => void`',
    },
    descriptionRender: {
      description:
        '自定义 option 的 description 渲染。`(option: CascaderOptionProps) => React.ReactNode`',
    },
    multiple: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: 'false' },
      description: '是否为多选。',
    },
    expandOnDisabledHover: {
      control: {
        type: 'boolean',
      },
      description: '禁用状态下是否展开。',
    },
    searchSorter: {
      description: '搜索 option 排序。`(options: CascaderOptionProps[]) => CascaderOptionProps[]`',
    },
    itemLabelRender: {
      description:
        '自定义全局 option 的 label 渲染。`(option: CascaderOptionProps) => React.ReactNode`',
    },
  },
};

type CascaderStory = StoryObj<CascaderProps<string>>;

const options = [
  {
    value: '0',
    label: '0',
    children: [
      {
        value: '0-1',
        label: '0-1',
        children: [
          {
            value: '0-1-1',
            label: '0-1-1',
            description: '辅助信息1： 内容',
          },
          {
            value: '0-1-2',
            label: '0-1-2',
            description: '辅助信息2： 内容',
          },
        ],
      },
      {
        value: '0-2',
        label: '0-2',
        children: [
          {
            value: '0-2-1',
            label: '0-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1-1',
        label: '1-1',

        children: [
          {
            value: '1-1-1',
            label: '1-1-1',
            disabled: true,
            tooltip: '暂时无法选择',
          },
        ],
      },
    ],
  },
];

export const Basic: CascaderStory = {
  args: {
    options: options,
    placeholder: '请选择',
    onOpenChange: (open) => {
      console.log('onOpenChange', open);
    },
    onChange: (value, pathOptions) => {
      console.log('onChange', value, pathOptions);
    },
  },
};

export const Default: CascaderStory = {
  args: {
    options: options,
    defaultValue: ['0', '0-1', '0-1-1'],
  },
  render: (args) => {
    return (
      <Cascader<string>
        {...args}
        onChange={(value, selectedOptions) => {
          console.log('onChange', value, selectedOptions);
        }}
      />
    );
  },
};

export const Multiple: CascaderStory = {
  args: {
    multiple: true,
    options: options,
    defaultValue: ['0-1-1', '0-1-2'],
    onChange: (value, selectedOptions) => {
      console.log('onChange', value, selectedOptions);
    },
  },
};

export const Loading: CascaderStory = {
  args: {
    loading: true,
  },
};

export const Empty: CascaderStory = {
  args: {
    options: [],
    className: 'w-[200px]',
  },
};

export const Tooltip: CascaderStory = {
  args: {
    options: [],
    tooltip: '节假日暂停使用',
  },
};

export const Error: CascaderStory = {
  args: {
    options,
    error: true,
  },
};

export const Disabled: CascaderStory = {
  args: {
    disabled: true,
    tooltip: '节假日暂停使用',
  },
};

const disabledOptions = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'Chaoyang',
        tooltip: '节假日暂停使用',
        disabled: true,
      },
    ],
  },
  {
    value: 'tianjin',
    label: 'TianJin',
    children: [
      {
        value: 'nankai',
        label: 'NanKai',
      },
      {
        value: 'hexi',
        label: 'HeXi',
        disabled: true,
        children: [
          {
            value: 'nanjinglu',
            label: 'NanJingLu',
            tooltip: '节假日暂停使用',
          },
          {
            value: 'dagu',
            label: 'DaGu',
            tooltip: '节假日暂停使用',
            disabled: true,
          },
        ],
      },
    ],
  },
];

export const DisabledOption: CascaderStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      默认情况下 disabled 的 option 不会展开 <Cascader options={disabledOptions} />
      设置 expandOnDisabledHover 后，disabled 的 option 会展开
      <Cascader options={disabledOptions} expandOnDisabled />
    </div>
  ),
};

export const Popover: CascaderStory = {
  render: () => (
    <div className="flex flex-col items-center ">
      <Cascader
        options={options}
        width={300}
        defaultValue={['0', '0-1', '0-1-1']}
        popoverProps={{ placement: 'bottom-start' }}
      />
      <Cascader
        options={options}
        width={300}
        defaultValue={['0', '0-1', '0-1-1']}
        popoverProps={{ placement: 'bottom-end' }}
      />
      <Cascader
        options={options}
        width={300}
        defaultValue={['0', '0-1', '0-1-1']}
        popoverProps={{ placement: 'bottom' }}
      />
    </div>
  ),
};

export const Change: CascaderStory = {
  args: {
    options: options,
    onChange: (value, pathOptions) => {
      console.log('onChange', value, pathOptions);
    },
  },
};

export const FilterSearch: CascaderStory = {
  args: {
    options: options,
    filterOption: (input, pathOptions) =>
      pathOptions.some((option) => (option.label as string).indexOf(input.toLowerCase()) > -1),
  },
};

export const Trigger: CascaderStory = {
  args: {
    options: options,
    trigger: 'click',
    placeholder: '请选择',
    onChange: (value, pathOptions) => {
      console.log('onChange', value, pathOptions);
    },
  },
};

const SingleDisplay = () => {
  return (
    <Cascader
      options={options}
      defaultValue={['0-1-1']}
      width={300}
      displayRender={(labels, _options) => {
        return labels.join(' # ');
      }}
    />
  );
};

const MultipleDisplay = () => {
  const onHandleChange: CascaderProps<string, true>['onChange'] = (value) => {
    console.log(value);
  };
  const onHandleDisplayRender: CascaderProps<string, true>['displayRender'] = (
    _labels,
    selectedOptions,
    onRemove,
  ) => {
    return selectedOptions.map((options, index) => {
      const label = options.map((option) => option.label).join(' # ');
      const lastOption = options[options.length - 1];
      return (
        <Tag key={index + label} size="md" onClose={() => onRemove?.(lastOption)}>
          {label}
        </Tag>
      );
    });
  };

  return (
    <Cascader
      displayRender={onHandleDisplayRender}
      onChange={onHandleChange}
      options={options}
      defaultValue={['0-1-1']}
      width={300}
      multiple
    />
  );
};

function RefCascaderStory() {
  const ref = useRef<any>(null);

  return (
    <div className="flex  gap-4">
      <Cascader ref={ref} options={options} placeholder="请选择" />
      <button onClick={() => ref.current?.focus()}>聚焦</button>
    </div>
  );
}

export const WithRef: CascaderStory = {
  render: () => <RefCascaderStory />,
};

export const SearchSorter: CascaderStory = {
  args: {
    options: options,
    multiple: true,
  },
  render: (args) => (
    <div>
      <div className="flex  gap-4">
        根据 disabled 排序
        <Cascader
          {...args}
          searchSorter={(options) =>
            options.sort((a, b) => (b.disabled ? 1 : 0) - (a.disabled ? 1 : 0))
          }
        />
      </div>
      <div className="flex  gap-4">
        指定 0-1-1 排在最前面
        <Cascader
          {...args}
          searchSorter={(options) => options.sort((a, b) => (a.value === '0-1-1' ? -1 : 1))}
        />
      </div>
    </div>
  ),
};

export const DisplayRender: CascaderStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SingleDisplay />
      <MultipleDisplay />
    </div>
  ),
};

export const CustomRender: CascaderStory = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div>
        itemRender 只用于当前 option 自定义, 优先级高于 itemLabelRender
        <Cascader
          options={[
            {
              value: '0',
              label: '0',
              children: [
                {
                  value: '0-1',
                  label: '0-1',
                  itemRender: () => <div>自定义内容</div>,
                },
              ],
            },
          ]}
        />
      </div>
      <div>
        itemLabelRender 仅控制全局 label 的显示，不影响交互
        <Cascader
          options={
            [
              {
                value: '0',
                label: '0',
                children: [
                  {
                    value: '0-1',
                    label: '0-1',
                    tagInfo: '66 副本',
                  },
                  {
                    value: '0-2',
                    label: '0-2',
                    tagInfo: '6 副本',
                  },
                ],
              },
            ] as any
          }
          itemLabelRender={(option) => {
            const tagInfo = lodash.get(option, 'tagInfo');
            return (
              <div className="flex justify-between items-center w-full">
                <div className="truncate">{option.label}</div>
                {tagInfo ? (
                  <div className="pl-3">
                    <Tag className="h-[24px] text-caption" size="sm">
                      {tagInfo}
                    </Tag>
                  </div>
                ) : null}
              </div>
            );
          }}
        />
      </div>
    </div>
  ),
};
