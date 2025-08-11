import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, RadioGroup, RadioItem, TreeSelect } from '@xsky/eris-ui';

// by chatgpt
const metaRadioGroup: Meta<typeof RadioGroup> = {
  title: 'DATA ENTRY/RadioGroup',
  component: RadioGroup,
  tags: ['visual-test'],
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '整个单选组是否被禁用。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultValue: {
      control: {
        type: 'text',
      },
      description: '单选组的默认值。',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: {
        type: 'text',
      },
      description: '单选组的当前值。',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: '单选组的值发生变化时的回调。',
      table: {
        type: { summary: 'function' },
      },
    },
    direction: {
      control: {
        type: 'inline-radio',
      },
      options: ['horizontal', 'vertical'],
      description: '单选框的布局方向。',
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    options: {
      control: {
        type: 'object',
      },
      description: '单选组的选项数组。',
      table: {
        type: { summary: 'array' },
      },
    },
    allowUncheck: {
      control: {
        type: 'boolean',
      },
      description: '是否支持取消选中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { label: 'Option 1', value: 'option1' },
  {
    label: 'Option 2',
    value: 'option2',
    disabled: true,
    optionInfo: 'info 2',
    tooltip: 'cant select',
    extra: 'extra2',
  },
  { label: 'Option 3', value: 'option3', tooltip: 'This is option 3', optionInfo: 'info' },
];

export const DefaultRadioGroup: Story = {
  args: {
    options,
    name: 'fruit2222',
  },
};

export const DisabledRadioGroup: Story = {
  args: {
    options,
    disabled: true,
  },
};

export const ControlledRadioGroup: Story = {
  args: {
    options,
    value: 'option1',
  },
};

export const DefaultValueRadioGroup: Story = {
  args: {
    options,
    defaultValue: 'option2',
  },
};

const optionsWithExtra = [
  { label: 'Option 1', value: 'option1', extra: 'extra1' },
  { label: 'Option 2', value: 'option2', disabled: true, extra: 'extra2' },
  { label: 'Option 3', value: 'option3', tooltip: 'This is option 3', extra: 'extra3' },
];

export const ExtraRadioGroup: Story = {
  args: {
    options: optionsWithExtra,
    defaultValue: 'option2',
  },
};

export const VerticalRadioGroup: Story = {
  args: {
    // direction: 'vertical',
    options: optionsWithExtra,
    defaultValue: 'option2',
  },
};

export const AllowUncheckRadioGroup: Story = {
  args: {
    direction: 'vertical',
    options: optionsWithExtra,
    allowUncheck: true,
    onChange: (value: string) => console.log('Selected value:', value),
  },
};

export const CustomOnChangeRadioGroup: Story = {
  args: {
    options,
    onChange: (value: string) => console.log('Selected value:', value),
  },
};

const ControlledRadioGroupItem = () => {
  const [value, setValue] = React.useState('option3');
  console.log('controlled value', value);
  return (
    <form>
      <button onClick={() => setValue('option2')} type="button">
        改变值为 &rsquo;option2&rsquo;
      </button>
      <RadioGroup
        value={value}
        options={options}
        onChange={(value: string) => {
          console.log('Selected value:', value);
          setValue(value);
        }}
      />
    </form>
  );
};

export const ControlRadioGroup: Story = {
  args: {},
  render: () => <ControlledRadioGroupItem />,
};

export const CustomRadioChildren: Story = {
  args: {
    options,
    onChange: (value: string) => console.log('Selected value:', value),
  },
  render: () => {
    return (
      <RadioGroup
        defaultValue="option1"
        onChange={(value: string) => console.log(`select radio ${value}`)}
        onClick={() => console.log('click radio')}
      >
        {options.map((option) => (
          <RadioItem
            value={option.value}
            key={option.value}
            onClick={() => console.log('click RadioItem', option.value)}
          >
            {({ checked }) => {
              return (
                <Button
                  tabIndex={-1}
                  type={checked ? 'primary' : 'secondary'}
                  onClick={() => console.log('click button', option.value)}
                >
                  {option.label}
                </Button>
              );
            }}
          </RadioItem>
        ))}
      </RadioGroup>
    );
  },
};

export const RadioGroupWithFullWidth: Story = {
  args: {
    options,
  },
  render: () => {
    return (
      <RadioGroup
        direction="vertical"
        options={[
          {
            value: 'all',
            label: '全部资源',
          },
          {
            value: 'part',
            labelClassName: 'w-full',
            label: (
              <div className="relative flex items-center gap-x-2">
                <span>部分资源</span>
                <TreeSelect
                  treeData={[]}
                  selectMode="checkbox"
                  displayMode="tag"
                  placeholder="请选择"
                  className="w-full"
                  commandProps={{
                    className: 'flex-1',
                  }}
                  disabled={false}
                />
              </div>
            ),
          },
        ]}
      />
    );
  },
};

export default metaRadioGroup;
