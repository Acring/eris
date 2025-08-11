import { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { Combobox, ComboboxRef, ComboboxOption } from '@xsky/eris-ui';
import { cn } from '@xsky/eris-ui';

const meta: Meta<typeof Combobox> = {
  title: 'DATA ENTRY/Combobox',
  component: Combobox,
  tags: ['visual-test'],
  argTypes: {
    error: {
      control: 'boolean',
      description: '是否显示错误状态',
    },
    outlined: {
      control: 'boolean',
      description: '是否显示边框，默认为 true',
    },
    autoFocus: {
      control: 'boolean',
      description: '是否自动获取焦点',
    },
    hideSelectedTag: {
      control: 'boolean',
      description: '是否隐藏选中项的标签',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
    contentClassName: {
      control: 'text',
      description: '下拉内容区的自定义样式类名',
    },
    value: {
      control: 'text',
      description:
        'Combobox 的值。当 multiple 为 true 时是字符串数组，为 false 时是单个字符串或 undefined',
    },
    defaultValue: {
      control: 'text',
      description:
        'Combobox 的默认值。当 multiple 为 true 时是字符串数组，为 false 时是单个字符串或 undefined',
    },
    multiple: {
      control: 'boolean',
      description: '是否允许多选',
    },
    defaultOptions: {
      control: 'object',
      description: '默认选项列表',
    },
    options: {
      control: 'object',
      description: '手动控制的选项列表',
    },
    open: {
      control: 'boolean',
      description: '控制下拉框的打开状态',
    },
    onOpenChange: {
      description: '打开状态改变时的回调函数',
    },
    placeholder: {
      control: 'text',
      description: '占位符文本',
    },
    loadingIndicator: {
      control: 'object',
      description: '加载中组件',
    },
    emptyIndicator: {
      control: 'object',
      description: '空状态组件',
    },
    emptyText: {
      control: 'text',
      description: '空状态提示信息',
    },
    delay: {
      control: 'number',
      description: '异步搜索的防抖时间。仅在设置 onSearch 时生效',
    },
    triggerSearchOnFocus: {
      control: 'boolean',
      description: '在 onFocus 时触发搜索，仅在设置 onSearch 时生效',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    groupBy: {
      control: 'text',
      description: '根据提供的键名对选项进行分组',
    },
    badgeClassName: {
      control: 'text',
      description: '自定义徽章类名',
    },
    selectFirstItem: {
      control: 'boolean',
      description: '展开时是否聚焦选中第一项',
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
      control: 'text',
      description: '显示模式',
    },
    popupWidth: {
      control: 'number',
      description: '自定义弹出框宽度',
    },
    size: {
      control: 'text',
      description: 'Combobox 组件的尺寸',
    },
    virtual: {
      control: 'boolean',
      description: '是否启用虚拟化，用于处理大量数据时提升性能',
    },
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof Combobox>;

const FRAMEWORKS: ComboboxOption[] = [
  {
    value: 'next.js',
    label: 'Next.js',
    description: '由 Vercel 开发的 React 框架',
    disable: true,
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
    description: 'Svelte 的应用框架',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
    description: 'Vue.js 的直观 Web 框架',
  },
  {
    value: 'remix',
    label: 'Remix',
    description: '全栈 Web 框架',
  },
  {
    value: 'astro',
    label: 'Astro',
    description: '内容驱动的静态站点生成器',
  },
  {
    value: 'vite',
    label: 'Vite',
    description: '下一代前端构建工具',
  },
  {
    value: 'webpack',
    label: 'Webpack',
    description: '模块打包器',
  },
  {
    value: 'rollup',
    label: 'Rollup',
    description: 'JavaScript 模块打包器',
  },
  {
    value: 'parcel',
    label: 'Parcel',
    description: '零配置构建工具',
  },
  {
    value: 'esbuild',
    label: 'esbuild',
    description: '极速 JavaScript 打包器',
  },
  {
    value: 'swc',
    label: 'SWC',
    description: 'Rust 编写的超快速 JavaScript 编译器',
  },
  {
    value: 'turbopack',
    label: 'Turbopack is a loooooooooooooooooooooooooong',
    description: '基于 Rust 的增量打包器',
  },
  {
    value: 'rspack',
    label: 'Rspack',
    description: '基于 Rust 的高性能打包工具',
  },
  {
    value: 'bun',
    label: 'Bun',
    description: '一体化的 JavaScript 运行时和工具链',
  },
];

const FRAMEWORKS_WITHOUT_DESCRIPTION: ComboboxOption[] = FRAMEWORKS.map((option) => ({
  ...option,
  description: undefined,
}));

const FRAMEWORKS_WITH_TAGS: ComboboxOption[] = [
  {
    value: 'next.js',
    label: 'Next.js',
    description: '由 Vercel 开发的 React 框架',
    tag: ['React', 'SSR', 'TypeScript'],
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
    tag: ['Svelte', 'SSR'],
    description: 'Svelte 的应用框架',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
    tag: ['Vue', 'SSR'],
    description: 'Vue.js 的直观 Web 框架',
  },
  {
    value: 'remix',
    label: 'Remix is a loooooooooooooooooooooooooong',
    tag: ['React', 'SSR', 'TypeScript'],
    description: '全栈 Web 框架',
  },
  {
    value: 'astro',
    label: 'Astro',
    tag: '多框架',
    description: '内容驱动的静态站点生成器',
  },
];

const FRAMEWORKS_WITH_TAGS_WITHOUT_DESCRIPTION: ComboboxOption[] = FRAMEWORKS_WITH_TAGS.map(
  (option) => ({
    ...option,
    description: undefined,
  }),
);

const FRAMEWORKS_WITH_STATUS = [
  {
    value: 'next.js',
    label: 'Next.js',
    description: '由 Vercel 开发的 React 框架',
    status: 'stable',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
    description: 'Svelte 的应用框架',
    status: 'beta',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
    description: 'Vue.js 的直观 Web 框架',
    status: 'stable',
  },
];

const FRAMEWORKS_WITH_TOOLTIP: ComboboxOption[] = [
  {
    value: 'next.js',
    label: 'Next.js',
    description: '由 Vercel 开发的 React 框架',
    tooltip: '这是一个禁用的选项，但你仍然可以看到这个提示',
    disable: true,
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
    description: 'Svelte 的应用框架',
    tooltip: 'SvelteKit 是 Svelte 官方的应用框架',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
    description: 'Vue.js 的直观 Web 框架',
    tooltip: 'Nuxt.js 是一个基于 Vue.js 的通用应用框架',
  },
  {
    value: 'remix',
    label: 'Remix',
    description: '全栈 Web 框架',
    tooltip: 'Remix 是一个全栈 Web 框架，专注于 Web 标准和现代 Web 应用架构',
  },
  {
    value: 'astro',
    label: 'Astro',
    description: '内容驱动的静态站点生成器',
    tooltip: 'Astro 是一个现代的静态站点生成器，支持多框架组件',
  },
];

/**
 * 自动获取焦点
 */
// export const AutoFocus: Story = {
//   name: '自动获取焦点',
//   parameters: {
//     docs: {
//       description: {
//         story: '自动获取焦点',
//       },
//     },
//   },
//   args: {
//     defaultOptions: FRAMEWORKS,
//     placeholder: '请选择',
//     autoFocus: true,
//     className: 'w-[300px]',
//   },
// };

/**
 * 基础用法
 */
export const Basic: Story = {
  name: '基础用法',
  parameters: {
    docs: {
      description: {
        story: '基础用法',
      },
    },
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="text-sm text-text-2">单选模式</div>
        <Combobox
          {...args}
          placeholder="请选择"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS}
          onChange={(value) => console.log('Selected:', value as string)}
        />
      </div>
      <div className="space-y-1">
        <div className="text-sm text-text-2">多选模式</div>
        <Combobox
          {...args}
          multiple
          placeholder="请选择"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITHOUT_DESCRIPTION}
        />
      </div>
    </div>
  ),
};

/**
 * 受控的展开状态
 */
function ControlledOpenStory(args: React.ComponentProps<typeof Combobox>) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const ref = useRef<ComboboxRef>(null);

  return (
    <div className="space-y-4">
      <Combobox
        {...args}
        ref={ref}
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        onChange={(newValue) => setValue(newValue as string[])}
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value}
      />
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsOpen(true)}
        >
          打开
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsOpen(false)}
        >
          关闭
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => ref.current?.focus()}
        >
          聚焦
        </button>
      </div>
      <div>当前状态: {isOpen ? '展开' : '收起'}</div>
    </div>
  );
}

export const ControlledOpen: Story = {
  name: '受控的展开状态',
  parameters: {
    docs: {
      description: {
        story: '受控的展开状态',
      },
    },
  },
  render: (args) => <ControlledOpenStory {...args} />,
};

/**
 * 单选模式
 */
export const Single: Story = {
  name: '单选模式',
  parameters: {
    docs: {
      description: {
        story: '单选模式',
      },
    },
  },
  render: (args) => (
    <Combobox
      {...args}
      placeholder="请选择"
      className="w-[300px]"
      defaultOptions={FRAMEWORKS}
      multiple={false}
      onChange={(value, options) => console.log('Selected:', value, options)}
    />
  ),
};

/**
 * 多选模式
 */
export const Multiple: Story = {
  name: '多选模式',
  parameters: {
    docs: {
      description: {
        story: '多选模式',
      },
    },
  },
  render: (args) => (
    <div>
      <Combobox
        {...args}
        placeholder="请选择"
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        multiple={true}
        onChange={(value, options) => console.log('Selected:', value, options)}
      />
      <Combobox
        {...args}
        placeholder="请选择"
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        multiple={true}
        displayMode="text"
        onChange={(value, options) => console.log('Selected:', value, options)}
      />
    </div>
  ),
};

/**
 * 受控的单选模式
 */
function ControlledSingleStory(args: React.ComponentProps<typeof Combobox>) {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className="space-y-4">
      <Combobox
        {...args}
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        multiple={false}
        placeholder="请选择"
        onChange={(newValue) => setValue(newValue as string | undefined)}
        value={value}
      />
      <div>当前选中值: {value}</div>
    </div>
  );
}

export const ControlledSingle: Story = {
  name: '受控的单选模式',
  parameters: {
    docs: {
      description: {
        story: '受控的单选模式',
      },
    },
  },
  render: (args) => <ControlledSingleStory {...args} />,
};

/**
 * 受控的多选模式
 */
function ControlledMultipleStory(args: React.ComponentProps<typeof Combobox>) {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <Combobox
        {...args}
        className="w-[300px]"
        options={FRAMEWORKS}
        multiple={true}
        onChange={(newValue) => setValue(newValue as string[])}
        value={value}
      />
      <div>当前选中值: {value.join(', ')}</div>
    </div>
  );
}

export const ControlledMultiple: Story = {
  name: '受控的多选模式',
  parameters: {
    docs: {
      description: {
        story: '受控的多选模式',
      },
    },
  },
  render: (args) => <ControlledMultipleStory {...args} />,
};

function FitContentStory(args: React.ComponentProps<typeof Combobox>) {
  return (
    <>
      <Combobox {...args} options={FRAMEWORKS} placeholder="请选择123123123" />
      <Combobox {...args} options={FRAMEWORKS} placeholder="请选择123123123" multiple />
    </>
  );
}

export const EmptyText: Story = {
  name: '空状态提示信息',
  parameters: {
    docs: {
      description: {
        story: '空状态提示信息',
      },
    },
  },
  render: (args) => (
    <div>
      <Combobox {...args} options={[]} className="w-[300px]" emptyText="自定义提示信息" />
    </div>
  ),
};

export const FitContent: Story = {
  name: '自适应内容宽度',
  parameters: {
    docs: {
      description: {
        story: '自适应内容宽度',
      },
    },
  },
  render: (args) => <FitContentStory {...args} />,
};

/**
 * 禁用状态
 */
function DisabledStory(args: React.ComponentProps<typeof Combobox>) {
  return (
    <div className="space-y-4">
      <Combobox
        {...args}
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        value={'next.js'}
        disabled={true}
        placeholder="请选择"
      />
      <Combobox
        {...args}
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        disabled={true}
        multiple={true}
        onChange={(value) => console.log('Selected:', value)}
        placeholder="请选择"
        value={['next.js', 'sveltekit']}
      />
    </div>
  );
}

export const Disabled: Story = {
  name: '禁用状态',
  parameters: {
    docs: {
      description: {
        story: '禁用状态',
      },
    },
  },
  render: (args) => <DisabledStory {...args} />,
};

export const MultipleTextMode: Story = {
  name: '多选文本模式',
  parameters: {
    docs: {
      description: {
        story: '多选文本模式',
      },
    },
  },
  args: {
    multiple: true,
    displayMode: 'text',
    placeholder: '请选择城市',
    defaultOptions: [
      { value: 'beijing', label: '北京' },
      { value: 'shanghai', label: '上海' },
      { value: 'shenzhen', label: '深圳' },
      { value: 'guangzhou', label: '广州' },
    ],
  },
};

/**
 * 带标签的选项（单个和多个标签）
 */
export const WithTags: Story = {
  name: '带标签的选项（单个和多个标签）',
  parameters: {
    docs: {
      description: {
        story: '带标签的选项（单个和多个标签）',
      },
    },
  },
  render: (args) => (
    <div className="space-y-4">
      <div>
        <div className="mb-2 text-sm text-gray-500">单选模式：</div>
        <Combobox
          {...args}
          placeholder="请选择框架"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITH_TAGS}
          multiple={false}
          onChange={(value, options) => console.log('Selected:', value, options)}
        />
      </div>
      <div>
        <div className="mb-2 text-sm text-gray-500">多选模式：</div>
        <Combobox
          {...args}
          placeholder="请选择框架"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITH_TAGS}
          multiple={true}
          onChange={(value, options) => console.log('Selected:', value, options)}
        />
      </div>
      <div>
        <div className="mb-2 text-sm text-text-2">隐藏标签</div>
        <Combobox
          {...args}
          placeholder="请选择"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITH_TAGS}
          hideSelectedTag
          onChange={(value) => console.log('Selected:', value as string)}
        />
      </div>
    </div>
  ),
};

/**
 * 单选默认值
 */
export const SingleDefaultValue: Story = {
  name: '单选默认值',
  parameters: {
    docs: {
      description: {
        story: '单选默认值',
      },
    },
  },
  render: (args) => (
    <Combobox
      {...args}
      placeholder="请选择"
      className="w-[300px]"
      defaultOptions={FRAMEWORKS}
      defaultValue="next.js"
      onChange={(value) => console.log('Selected:', value as string)}
    />
  ),
};

/**
 * 多选默认值
 */
export const MultipleDefaultValue: Story = {
  name: '多选默认值',
  parameters: {
    docs: {
      description: {
        story: '多选默认值',
      },
    },
  },
  render: (args) => (
    <Combobox
      {...args}
      placeholder="请选择"
      className="w-[300px]"
      defaultOptions={FRAMEWORKS}
      multiple
      defaultValue={['next.js', 'vite']}
      onChange={(value) => console.log('Selected:', value as string[])}
    />
  ),
};

/**
 * 自定义描述渲染
 */
export const CustomDescription: Story = {
  name: '自定义描述渲染',
  parameters: {
    docs: {
      description: {
        story: '自定义描述渲染',
      },
    },
  },
  render: (args) => (
    <Combobox
      {...args}
      placeholder="请选择框架"
      className="w-[300px]"
      defaultOptions={FRAMEWORKS_WITH_STATUS}
      descriptionRender={(option) => (
        <div className="flex flex-col gap-[4px] text-text-3">
          <div className="flex items-center gap-1">
            <div
              className={cn('w-2 h-2 rounded-full', {
                'bg-green-500': option.status === 'stable',
                'bg-orange-500': option.status === 'beta',
              })}
            />
            <div>{option.description}</div>
          </div>
          <div>{option.status as string}</div>
        </div>
      )}
      onChange={(value) => console.log('Selected:', value as string)}
    />
  ),
};

/**
 * 带提示
 */
function TooltipStory(args: React.ComponentProps<typeof Combobox>) {
  const [value, setValue] = useState<string>();
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="mt-[100px] flex flex-col gap-2 items-start absolute top-[100px] left-[20px]">
      <Combobox
        {...args}
        className="w-[300px] "
        defaultOptions={FRAMEWORKS_WITH_TOOLTIP}
        onChange={(value) => {
          setValue(value as string);
        }}
        tooltip="这是一个提示"
        placeholder="选择一个框架"
        value={value}
        disabled={disabled}
      />
      <button onClick={() => setDisabled(!disabled)}>disabled</button>
    </div>
  );
}

export const WithTooltip: Story = {
  name: '带有 Tooltip 的选项',
  render: (args) => <TooltipStory {...args} />,
  parameters: {
    docs: {
      description: {
        story: '选项可以设置 tooltip 属性来显示提示信息，即使在禁用状态下也可以显示。',
      },
    },
  },
};

/**
 * 无边框样式
 */
export const NoOutline: Story = {
  name: '无边框样式',
  parameters: {
    docs: {
      description: {
        story: '无边框样式',
      },
    },
  },
  render: (args) => (
    <>
      <Combobox
        {...args}
        outlined={false}
        placeholder="请选择"
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        onChange={(value) => console.log('Selected:', value as string)}
      />
    </>
  ),
};

/**
 * 自定义标签渲染
 */
export const CustomLabelRender: Story = {
  name: '自定义标签渲染',
  parameters: {
    docs: {
      description: {
        story:
          '使用 labelRender 属性自定义选项的标签渲染方式。在这个例子中，我们根据框架的状态显示不同颜色的状态点。支持单选和多选模式。',
      },
    },
  },
  render: () => {
    const renderLabel = (option: ComboboxOption) => {
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn('w-2 h-2 rounded-full', {
              'bg-green-500': option.status === 'stable',
              'bg-yellow-500': option.status === 'beta',
            })}
          />
          <span>{option.label}</span>
        </div>
      );
    };

    return (
      <div className="flex flex-col gap-4">
        <Combobox
          placeholder="选择框架"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITH_STATUS}
          labelRender={renderLabel}
          onChange={(value) => console.log('Selected:', value as string)}
          tooltip=""
          tooltipProps={{}}
        />
        <Combobox
          placeholder="选择框架（多选）"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITH_STATUS}
          labelRender={renderLabel}
          multiple
          onChange={(value) => console.log('Selected:', value as string[])}
          tooltip=""
          tooltipProps={{}}
        />
      </div>
    );
  },
};

/**
 * 自定义选中项标签渲染
 */
export const CustomSelectedTagRender: Story = {
  name: '自定义选中项标签渲染',
  parameters: {
    docs: {
      description: {
        story:
          '使用 selectedTagRender 属性自定义选中项的标签渲染方式。渲染顺序：selectedTagRender > selectedLabelRender > labelRender > option.label',
      },
    },
  },
  render: () => {
    const renderSelectedTag = (option: ComboboxOption) => {
      const label = `${option.label}:${option.value}`;
      return (
        <span className="text-ellipsis overflow-hidden max-w-[80px]" title={label}>
          {label}
        </span>
      );
    };

    const renderSelectedLabel = (option: ComboboxOption) => {
      return (
        <span className="text-text-1 font-semibold text-subhead" title={option.label}>
          {option.label}
        </span>
      );
    };

    return (
      <div className="flex flex-col gap-4">
        <Combobox
          placeholder="选择框架"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITH_STATUS}
          selectedLabelRender={renderSelectedLabel}
          onChange={(value) => console.log('Selected:', value as string)}
          tooltip=""
          tooltipProps={{}}
        />
        <Combobox
          placeholder="选择框架（多选）"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS_WITH_STATUS}
          selectedTagRender={renderSelectedTag}
          multiple
          onChange={(value) => console.log('Selected:', value as string[])}
          tooltip=""
          tooltipProps={{}}
        />
      </div>
    );
  },
};

/**
 * 自定义弹出框宽度
 */
export const CustomPopupWidth: Story = {
  name: '自定义弹出框宽度',
  parameters: {
    docs: {
      description: {
        story: '自定义弹出框宽度',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-4">
      <Combobox
        {...args}
        placeholder="固定宽度 400px"
        className="w-[200px]"
        defaultOptions={FRAMEWORKS}
        popupWidth={400}
      />
      <Combobox
        {...args}
        placeholder="动态宽度 fit-content"
        className="w-[200px]"
        defaultOptions={FRAMEWORKS}
        popupWidth="fit-content"
      />
    </div>
  ),
};

/**
 * 不同尺寸
 */
export const Size: Story = {
  name: '不同尺寸',
  parameters: {
    docs: {
      description: {
        story: 'Combobox 组件支持三种尺寸：小(sm)、中(md)、大(lg)。默认为中等尺寸。',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 text-sm text-gray-500">小尺寸：</div>
        <Combobox
          {...args}
          size="sm"
          placeholder="小尺寸"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS}
        />
      </div>
      <div>
        <div className="mb-2 text-sm text-gray-500">中尺寸（默认）：</div>
        <Combobox
          {...args}
          size="md"
          placeholder="中尺寸"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS}
        />
      </div>
      <div>
        <div className="mb-2 text-sm text-gray-500">大尺寸：</div>
        <Combobox
          {...args}
          size="lg"
          placeholder="大尺寸"
          className="w-[300px]"
          defaultOptions={FRAMEWORKS}
        />
      </div>
    </div>
  ),
};

function SearchableStory(args: React.ComponentProps<typeof Combobox>) {
  const [value, setValue] = useState<string>('');

  return (
    <>
      <div className="mb-2 text-sm text-red-500">
        异步搜索时需要将搜索结果设为全量搜索，因为搜索结果不支持翻页加载
      </div>
      <Combobox
        {...args}
        placeholder="请选择"
        defaultOptions={FRAMEWORKS}
        className="w-[300px]"
        value={value}
        onChange={(value) => setValue(value as string)}
        onSearch={(search) => {
          console.log('search', search);
          if (!search) {
            return Promise.resolve(FRAMEWORKS);
          }
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                FRAMEWORKS.filter(
                  (option) =>
                    option.description?.toLowerCase().includes(search.toLowerCase()) ||
                    option.label.toLowerCase().includes(search.toLowerCase()),
                ),
              );
            }, 1000);
          });
        }}
      />
    </>
  );
}

export const Searchable: Story = {
  name: '异步搜索',
  parameters: {
    docs: {
      description: {
        story: '支持异步搜索，当用户输入时，会自动触发搜索。',
      },
    },
  },
  render: (args) => {
    return <SearchableStory {...args} />;
  },
};

/**
 * 滚动加载
 */
function InfiniteScrollStory(args: React.ComponentProps<typeof Combobox>) {
  const [options, setOptions] = React.useState<ComboboxOption[]>([]);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const pageRef = React.useRef(1);

  const loadMore = React.useCallback(async () => {
    setIsLoadingMore(true);
    // 模拟异步加载
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newOptions = Array.from({ length: 10 }, (_, i) => ({
      value: `item-${pageRef.current}-${i + 1}`,
      label: `选项 ${pageRef.current}-${i + 1}`,
      description: `这是第 ${pageRef.current} 页的第 ${i + 1} 个选项`,
    }));
    setOptions((prev) => [...prev, ...newOptions]);
    pageRef.current += 1;
    setHasNextPage(pageRef.current < 10); // 最多加载 4 页
    setIsLoadingMore(false);
  }, []);

  React.useEffect(() => {
    void loadMore();
  }, [loadMore]);

  return (
    <Combobox
      {...args}
      className="w-[300px]"
      options={options}
      infiniteScroll
      hasNextPage={hasNextPage}
      isLoadingMore={isLoadingMore}
      onLoadMore={loadMore}
      placeholder="请选择选项"
    />
  );
}

export const InfiniteScroll: Story = {
  render: (args) => <InfiniteScrollStory {...args} />,
  name: '滚动加载',
  args: {
    outlined: true,
  },
  parameters: {
    docs: {
      description: {
        story: '支持滚动加载更多选项，仅在非搜索状态下生效。',
      },
    },
  },
};

const VIRTUAL_OPTIONS = Array.from({ length: 10000 }, (_, index) => ({
  value: `option-${index}`,
  label: `选项 ${index}`,
  description: `这是第 ${index} 个选项的描述`,
}));

export const Virtual: Story = {
  name: '虚拟化',
  parameters: {
    docs: {
      description: {
        story: '虚拟化选项，仅在有大量选项时使用。注意开启虚拟化时需要自己处理搜索函数',
      },
    },
  },
  args: {
    placeholder: '选择框架',
    defaultOptions: VIRTUAL_OPTIONS,
    className: 'w-[300px]',
    virtual: true,
    creatable: true,
    onSearch: (search) => {
      console.log('search', search);
      if (!search) {
        return Promise.resolve(VIRTUAL_OPTIONS);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            VIRTUAL_OPTIONS.filter(
              (option) =>
                option.description?.toLowerCase().includes(search.toLowerCase()) ||
                option.label.toLowerCase().includes(search.toLowerCase()),
            ),
          );
        }, 1000);
      });
    },
  },
  render: (args) => (
    <>
      <div className="mb-2 text-sm text-red-500">注意开启虚拟化时需要自己处理搜索函数</div>
      <Combobox {...args} />
    </>
  ),
};

function RefUsageStory() {
  const ref = useRef<ComboboxRef>(null);

  return (
    <>
      <Combobox ref={ref} options={FRAMEWORKS} placeholder="请选择" />
      <button className="mt-[900px]" onClick={() => ref.current?.focus()}>
        聚焦
      </button>
    </>
  );
}

export const RefUsage: Story = {
  name: 'Ref 使用',
  render: (args) => <RefUsageStory {...args} />,
};

/**
 * 自定义 Portal 容器
 */
function CustomPortalStory(args: React.ComponentProps<typeof Combobox>) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <div className="space-y-4">
      <div className="text-sm text-text-2">默认挂载到 body：</div>
      <Combobox
        {...args}
        className="w-[300px]"
        defaultOptions={FRAMEWORKS}
        placeholder="默认挂载到 body"
      />

      <div className="text-sm text-text-2 mt-8">自定义挂载容器：</div>
      <div
        ref={(el) => setContainer(el)}
        className="relative border-2 border-dashed border-blue-300 p-4 overflow-hidden h-[200px]"
      >
        <div className="mb-2 text-sm text-blue-500">这是自定义的 Portal 容器</div>
        <Combobox
          {...args}
          className="w-[300px]"
          defaultOptions={FRAMEWORKS}
          placeholder="挂载到当前容器"
          portalContainer={container}
        />
      </div>
    </div>
  );
}

export const CustomPortal: Story = {
  name: '自定义挂载节点',
  parameters: {
    docs: {
      description: {
        story:
          '通过 portalContainer 属性可以自定义下拉菜单的挂载节点，默认挂载到 body。这在一些特殊场景（如在 iframe 中使用）时非常有用。',
      },
    },
  },
  render: (args) => <CustomPortalStory {...args} />,
};

function OnBlurStory(args: React.ComponentProps<typeof Combobox>) {
  return (
    <Combobox
      {...args}
      options={FRAMEWORKS}
      onChange={(value) => console.log('onChange', value)}
      onBlur={() => console.log('onBlur')}
      className="w-[300px]"
    />
  );
}

export const OnBlur: Story = {
  name: 'onBlur',
  render: (args) => <OnBlurStory {...args} />,
};

export const CustomContentStyle: Story = {
  name: '自定义下拉内容区样式',
  render: (args) => (
    <div>
      <div className="mb-2 text-sm text-gray-500">自定义主题</div>
      <Combobox
        {...args}
        className={`
            w-[300px] bg-conditional-top-SDDC-item-selected border-transparent
            [&_span:not(.text-text-3):not(.text-text-4)]:text-white
            [&_button]:text-white
            [&_span[data-testid="Tag-root"]_span]:text-white/80
            [&_input]:bg-conditional-top-SDDC-item-selected
            [&_input]:text-white
            aria-disabled:opacity-40
          `}
        defaultOptions={FRAMEWORKS_WITH_TAGS_WITHOUT_DESCRIPTION}
        defaultValue="remix"
        hideSelectedTag
        disableClearable
        placeholder="请选择框架（暗色占位符）"
        contentClassName={`
            bg-conditional-top-SDDC-popupMenu-bg border-transparent
            [&_div[cmdk-item][aria-selected="false"]]:bg-conditional-top-SDDC-popupMenu-bg
            [&_div[cmdk-item]_span]:text-white
            [&_div[aria-selected="true"]]:bg-conditional-top-SDDC-item-click
            [&_div[cmdk-item][aria-selected=true]]:text-white
            [&_span[data-testid="Tag-root"]_span]:text-white/80
          `}
      />
    </div>
  ),
};
