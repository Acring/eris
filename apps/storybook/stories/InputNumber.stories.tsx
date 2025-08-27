import { InputNumber, Dropdown, IconButton, Button, InputNumberProps } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UpLine12, DownLine12 } from '@xsky/eris-icons';

export default {
  title: 'DATA ENTRY/InputNumber',
  component: InputNumber,
  tags: ['visual-test'],
  argTypes: {
    disableDecimal: {
      control: {
        type: 'boolean',
      },
      description: '禁用小数点。',
    },
    value: {
      control: {
        type: 'number',
      },
      description: '输入值',
    },
    defaultValue: {
      control: {
        type: 'number',
      },
      description: '默认输入值',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: '输入框的占位符。',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '是否禁用输入框。',
    },
    max: {
      control: {
        type: 'number',
      },
      description: '最大值',
    },
    min: {
      control: {
        type: 'number',
      },
      description: '最小值',
    },
    step: {
      control: {
        type: 'number',
      },
      description: '每次改变步数，可以为小数',
    },
    tooltip: {
      type: 'string',
      defaultValue: '',
      description: '提示框的内容。',
    },
    maxTooltip: {
      type: 'string',
      defaultValue: '',
      description: '最大值的提示内容。',
    },
    minTooltip: {
      type: 'string',
      description: '最小值的提示内容。',
    },
    startAdornment: {
      description: '输入框前面的后缀',
    },
    endAdornment: {
      description: '输入框后面的后缀',
    },
    onChange: {
      control: {
        type: 'object',
      },
      description: '选项变化的回调函数。',
    },
    onStep: {
      control: {
        type: 'object',
      },
      description: '上下箭变化的回调函数。',
    },
    hideControl: {
      control: {
        type: 'boolean',
      },
      description: '隐藏上下箭头。',
    },
    fitContent: {
      control: {
        type: 'boolean',
      },
      description: '根据内容自适应宽度。',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: '是否为必填。设置为 true 时，输入框不能为空，失焦后会自动设置为最小值或 0。',
      defaultValue: false,
    },
  },
} as Meta<InputNumberProps>;

type Story = StoryObj<typeof InputNumber>;

export const Basic: Story = {
  args: {
    placeholder: '请输入',
    className: 'min-w-[80px]',
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    tooltip: '这是一个提示',
  },
};
export const WithDefaultValue: Story = {
  args: {
    defaultValue: 10,
  },
};

export const WithMaxAndMin: Story = {
  args: {
    placeholder: '0-10',
    max: 10,
    maxTooltip: '不能大于 10',
    minTooltip: '不能小于 0',
    min: 0,
  },
};

export const WithMaxChange: Story = {
  render: () => {
    const WithMaxInputNumber: Story['render'] = (args) => {
      const [max, setMax] = useState(100);

      const handleChange = (value: number | null | undefined) => {
        console.log('🦄  value:', value);
      };

      return (
        <>
          <button
            onClick={() => {
              setMax(max - 1);
            }}
          >
            设置最大值
          </button>
          <InputNumber max={max} defaultValue={10} onChange={handleChange} />
        </>
      );
    };
    return <WithMaxInputNumber />;
  },
};

export const WithoutDecimal: Story = {
  args: {
    disableDecimal: true,
  },
};

export const Step: Story = {
  args: {
    defaultValue: 8,
    step: 5,
  },
};

export const StartAdornment: Story = {
  args: {
    placeholder: '请输入',
    className: 'w-[220px]',
  },
  render: (args) => {
    const InputNumberWithStartAdornment: Story['render'] = (args) => {
      const [value, setValue] = useState('读');
      const [open, setOpen] = useState(false);

      const startAdornment = (
        <div className="flex items-center">
          <Dropdown
            label={
              <Button
                onClick={() => {
                  setOpen(!open);
                }}
                type="text"
                className="h-[22px] w-[36px] pr-[12px] text-center"
              >
                {value}
                <span className="p-[2px]">{open ? <UpLine12 /> : <DownLine12 />}</span>
              </Button>
            }
            open={open}
            menuList={[
              { label: '读', key: 'read' },
              { label: '写', key: 'write' },
            ]}
            onMenuClick={(menuItem) => {
              menuItem.key && setValue(menuItem.label as string);
              setOpen(!open);
            }}
          />
        </div>
      );
      return (
        <div className="flex w-[200px] flex-col gap-1">
          <InputNumber
            {...args}
            startAdornment={startAdornment}
            endAdornment={<p className="text-body text-text-2">MiB</p>}
          />
        </div>
      );
    };
    return <InputNumberWithStartAdornment {...args} />;
  },
};

export const EndAdornment: Story = {
  args: {
    placeholder: '请输入',
    className: 'w-[180px]',
  },
  render: (args) => {
    const InputNumberWithEndAdornment: Story['render'] = (args) => {
      const [value, setValue] = useState('MiB');
      const [open, setOpen] = useState(false);

      return (
        <div className="flex w-[200px] flex-col gap-1">
          <InputNumber {...args} endAdornment={<p className="text-body text-text-2">MiB</p>} />
          <InputNumber
            {...args}
            endAdornment={
              <div className="flex items-center">
                <Dropdown
                  label={
                    <Button
                      onClick={() => {
                        setOpen(!open);
                      }}
                      type="text"
                      className="h-[22px] w-[50px] pl-[4px] pr-0 text-center"
                    >
                      {value}
                      <span className="p-[4px] flex">{open ? <UpLine12 /> : <DownLine12 />}</span>
                    </Button>
                  }
                  open={open}
                  menuList={[
                    { label: 'MiB', key: 'MiB' },
                    { label: 'GiB', key: 'GiB' },
                  ]}
                  onMenuClick={(menuItem) => {
                    menuItem.key && setValue(menuItem.key);
                    setOpen(!open);
                  }}
                />
              </div>
            }
          />
        </div>
      );
    };
    return <InputNumberWithEndAdornment {...args} />;
  },
};

export const FitContent: Story = {
  args: {
    placeholder: '请输入',
    size: 'md',
    fitContent: true,
    tooltip: '这是一个提示',
  },
  render: (args) => <InputNumber {...args} />,
};

/**
 * 受控 Input
 */
export const ControlledInput: Story = {
  args: {
    placeholder: '请输入',
    value: null,
  },
  render: (args) => {
    const ControlledInputWithHook: Story['render'] = (args) => {
      const [value, setValue] = useState<number | null | undefined>(args.value);
      return (
        <div className="flex w-[200px] flex-col gap-1">
          <p>Controlled</p>
          <InputNumber {...args} value={value} onChange={(v) => setValue(v)} />
          <InputNumber {...args} value={value} onChange={(v) => setValue(v)} />
          <p>UnControlled</p>
          <InputNumber defaultValue={value} onChange={(v) => setValue(v)} />
        </div>
      );
    };
    return <ControlledInputWithHook {...args} />;
  },
};

/**
 * 通过 required 属性控制输入框是否为必填。
 * 当 required 为 true 时，如果输入框为空并失焦，将自动设置为最小值（如果设置了 min）或 0。
 */
export const Required: Story = {
  render: () => {
    const RequiredDemo: Story['render'] = () => {
      return (
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-text-2">默认可为空（required = false）：</p>
            <InputNumber placeholder="可为空" className="w-[200px]" min={0} max={100} />
          </div>

          <div>
            <p className="mb-2 text-text-2">必填（required = true）：</p>
            <InputNumber
              placeholder="必填"
              className="w-[200px]"
              defaultValue={1}
              min={0}
              max={100}
              required
            />
          </div>

          <div>
            <p className="mb-2 text-text-2">必填且设置最小值（min = 10）：</p>
            <InputNumber
              placeholder="失焦后设为最小值"
              className="w-[200px]"
              min={10}
              max={100}
              defaultValue={1}
              required
            />
          </div>
        </div>
      );
    };

    return <RequiredDemo />;
  },
};
