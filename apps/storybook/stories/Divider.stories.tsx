import { Meta, StoryObj } from '@storybook/react';
import { Divider, DividerProps } from '@xsky/eris-ui';

export default {
  title: 'OTHER/Divider',
  component: Divider,
  tags: ['visual-test'],
} as Meta;

type DividerStory = StoryObj<DividerProps>;

export const DefaultDivider: DividerStory = {
  args: {},
};

export const HorizontalDashedDivider: DividerStory = {
  args: {
    dashed: true,
    type: 'horizontal',
    children: 'Dashed Horizontal Divider',
  },
};

export const VerticalDivider: DividerStory = {
  args: {
    type: 'vertical',
    children: 'Vertical Divider',
  },
  render: (args) => {
    return (
      <div>
        <span>link1</span>
        <Divider {...args}></Divider>
        <span>link2</span>
      </div>
    );
  },
};

export const LeftTextDivider: DividerStory = {
  args: {
    orientation: 'left',
    children: 'Left Text',
  },
};

export const RightTextDivider: DividerStory = {
  args: {
    orientation: 'right',
    children: 'Right Text',
  },
};

export const CenterTextDivider: DividerStory = {
  args: {
    orientation: 'center',
    children: 'Center Text',
  },
};

export const TextWithMargin: DividerStory = {
  args: {
    orientation: 'left',
    orientationMargin: 20,
    children: 'Text with Margin',
  },
};

export const TextWithBold: DividerStory = {
  args: {
    orientation: 'left',
    orientationMargin: 20,
    bold: true,
    children: 'Text with bold',
  },
};

export const DividerInColoredBackground: DividerStory = {
  args: {
    orientation: 'left',
    orientationMargin: 20,
    bold: true,
    children: 'Text with bold',
  },
  render: (args) => {
    return (
      <div className="h-[100px] bg-updating-bg">
        <Divider {...args}></Divider>
      </div>
    );
  },
};
