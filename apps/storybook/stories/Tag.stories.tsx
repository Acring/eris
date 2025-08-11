import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tag, Tooltip } from '@xsky/eris-ui';
import { DeleteLine12, DirectoryLine16 } from '@xsky/eris-icons';

export default {
  title: 'DATA DISPLAY/Tag',
  component: Tag,
  tags: ['visual-test'],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description:
        '标签的内容。包括前置icon，也可包括小i提示，但小i颜色值需为固定色 text-icon-outlined-displayed。',
    },
    tooltip: {
      control: false,
      description: '在标签内容后添加小i提示内容。',
    },
    type: {
      control: {
        type: 'select',
        options: [
          'active',
          'updating',
          'warning',
          'danger',
          'critical',
          'offline',
          'default',
          'primary',
        ],
      },
      description: '标签的类型。',
      defaultValue: { summary: 'default' },
    },
    rounded: {
      control: {
        type: 'boolean',
      },
      description: '是否为圆角标签。',
      defaultValue: { summary: 'false' },
    },
    onClose: {
      control: false,
      description: '关闭图标点击时的回调函数。',
    },
    className: {
      control: {
        type: 'text',
      },
      description: '自定义样式类名。',
    },
  },
} as Meta;

type TagStory = StoryObj<typeof Tag>;

export const DefaultTag: TagStory = {
  args: {
    children: 'Default Tag',
  },
};

export const CustomTypeTag: TagStory = {
  args: {
    children: 'Custom Type Tag',
    type: 'primary',
  },
  render: () => (
    <div className="flex gap-1">
      <Tag type="active">tag</Tag>
      <Tag type="updating">tag</Tag>
      <Tag type="warning">tag</Tag>
      <Tag type="danger">tag</Tag>
      <Tag type="critical">tag</Tag>
      <Tag type="default">tag</Tag>
    </div>
  ),
};

export const CustomTypeTagCloseable: TagStory = {
  args: {
    children: 'Custom Type Tag',
    type: 'primary',
    onClose: () => console.log('close'),
  },
  render: () => (
    <div>
      <Tag type="active" onClose={() => console.log('close')} className="mr-1">
        tag
      </Tag>
      <Tag type="updating" onClose={() => console.log('close')} className="mr-1">
        tag
      </Tag>
      <Tag type="warning" onClose={() => console.log('close')} className="mr-1">
        tag
      </Tag>
      <Tag type="danger" onClose={() => console.log('close')} className="mr-1">
        tag
      </Tag>
      <Tag type="critical" onClose={() => console.log('close')} className="mr-1">
        tag
      </Tag>
      <Tag type="default" onClose={() => console.log('close')} className="mr-1">
        tag
      </Tag>
      <Tag type="primary" onClose={() => console.log('close')}>
        tag
      </Tag>
    </div>
  ),
};

export const CustomTagWithTooltip: TagStory = {
  args: {
    children: 'Color Tag with icon and Tooltip',
  },
  render: () => (
    <div className="flex gap-1">
      <Tag tooltip="tag1234">
        <Tooltip title="tag1234">
          <DirectoryLine16 className="tag-close-icon mr-[4px]" />
        </Tooltip>
        tag1234
      </Tag>
      <Tag type="active">
        <Tooltip title="tag1234">
          <DirectoryLine16 className="tag-close-icon mr-[4px]" />
        </Tooltip>
        tag1234
      </Tag>
      <Tag type="updating" tooltip="tag1234">
        tag1234
      </Tag>
      <Tag type="danger" tooltip="tag1234">
        <Tooltip title="tag1234">
          <DirectoryLine16 className="tag-close-icon mr-[4px]" />
        </Tooltip>
        tag1234
      </Tag>
    </div>
  ),
};

export const ClickableAndLinkTag: TagStory = {
  render: () => (
    <div className="flex items-start gap-2">
      <Tag size="lg" onClick={() => console.log('click')}>
        clickable
      </Tag>

      <Tag size="lg" onClick={() => console.log('click')} type="active">
        active
      </Tag>
      <Tag size="lg" onClick={() => console.log('click')} type="updating">
        updating
      </Tag>
      <Tag size="lg" onClick={() => console.log('click')} type="warning">
        warning
      </Tag>
      <Tag size="lg" onClick={() => console.log('click')} type="danger">
        danger
      </Tag>
      <Tag size="lg" onClick={() => console.log('click')} type="critical">
        critical
      </Tag>
      <Tag
        size="lg"
        onClick={() => console.log('click')}
        tooltip="加粗tag"
        type="primary"
        className="font-medium"
      >
        加粗primary
      </Tag>

      <Tag size="lg" type="active" className="group">
        <a
          href=""
          className="text-inherit group-hover:text-text-link-success-hover group-active:text-text-link-success-click"
        >
          link
        </a>
      </Tag>
    </div>
  ),
};

export const TagWithCloseIcon: TagStory = {
  args: {
    children: 'Tag with Close Icon',
    onClose: () => console.log('close'),
  },
};

export const TagWithCloseIconWithTooltip: TagStory = {
  args: {
    children: 'Tag with Close Icon with tooltip',
  },
  render: () => (
    <Tag onClose={() => console.log('close')} tooltip="tag1234">
      tag
    </Tag>
  ),
};

export const CustomCloseIconTag: TagStory = {
  args: {
    children: 'Custom Close Icon Tag',
    onClose: () => console.log('close'),
    closeIcon: <DeleteLine12 />,
  },
};

export const DisabledCloseTag: TagStory = {
  args: {
    children: 'Disabled Close Tag',
    onClose: () => console.log('close'),
    disabledClose: true,
  },
};

export const SizeTag: TagStory = {
  render: () => (
    <div className="flex items-start gap-2">
      <Tag size="lg" onClose={() => console.log('close')}>
        lg
      </Tag>
      <Tag size="md" onClose={() => console.log('close')}>
        md
      </Tag>
      <Tag size="sm" onClose={() => console.log('close')}>
        sm
      </Tag>

      <Tag size="md" onClose={() => console.log('close')} className="max-w-[160px]">
        最大宽度 160 最大宽度 160 最大宽度 160 最大宽度 160 最大宽度 160 最大宽度 160
      </Tag>
      <Tag size="md" onClose={() => console.log('close')} className="max-w-[120px]">
        最大宽度 120 最大宽度 120 最大宽度 120最大宽度 120 最大宽度 120 最大宽度 120
      </Tag>
    </div>
  ),
};
