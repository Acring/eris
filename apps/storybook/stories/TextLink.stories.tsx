import { TextLink } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { DragLine16 } from '@xsky/eris-icons';
import React from 'react';

const meta: Meta<typeof TextLink> = {
  component: TextLink,
  title: 'Other/TextLink',
  tags: ['visual-test'],
  argTypes: {
    noUnderline: {
      type: 'boolean',
    },
  },
};

type Story = StoryObj<typeof TextLink>;

export const Basic: Story = {
  args: {
    type: 'normal',
    children: 'text link',
  },
};

export const NoUnderline: Story = {
  render: () => (
    <div className="flex gap-2">
      <TextLink noUnderline>text link</TextLink>
      <TextLink noUnderline type={'second'}>
        text link
      </TextLink>
      <TextLink noUnderline type={'active'}>
        text link
      </TextLink>
      <TextLink noUnderline type={'danger'}>
        text link
      </TextLink>
      <TextLink noUnderline type={'critical'}>
        text link
      </TextLink>
      <TextLink noUnderline type={'warning'}>
        text link
      </TextLink>
      <TextLink noUnderline type={'updating'}>
        text link
      </TextLink>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex gap-2">
      <TextLink>text link</TextLink>
      <TextLink type={'second'}>text link</TextLink>
      <TextLink type={'active'}>text link</TextLink>
      <TextLink type={'danger'}>text link</TextLink>
      <TextLink type={'critical'}>text link</TextLink>
      <TextLink type={'warning'}>text link</TextLink>
      <TextLink type={'updating'}>text link</TextLink>
    </div>
  ),
};

export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <TextLink className="text-subhead">text link</TextLink>
      <TextLink className="text-body">text link</TextLink>
      <TextLink className="text-caption">text link</TextLink>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <div>
        <h2>underline</h2>
        <div className="flex gap-2">
          <TextLink disabled>text link</TextLink>
          <TextLink type={'second'} disabled>
            text link
          </TextLink>
          <TextLink type={'active'} disabled>
            text link
          </TextLink>
          <TextLink type={'danger'} disabled>
            text link
          </TextLink>
          <TextLink type={'critical'} disabled>
            text link
          </TextLink>
          <TextLink type={'warning'} disabled>
            text link
          </TextLink>
          <TextLink type={'updating'} disabled>
            text link
          </TextLink>
        </div>
      </div>
      <div>
        <h2>noUnderline</h2>
        <div className="flex gap-2">
          <TextLink type={'updating'} noUnderline disabled onClick={console.log}>
            text link
          </TextLink>
        </div>
      </div>
    </>
  ),
};

export const Icon: Story = {
  render: () => (
    <div className="flex gap-2">
      <TextLink icon={<DragLine16 />} noUnderline>
        text link
      </TextLink>
      <TextLink icon={<DragLine16 />} iconPosition="rear" noUnderline>
        text link
      </TextLink>
    </div>
  ),
};

export const LinkExample: Story = {
  render: () => {
    return (
      <>
        <code>
          <h2>nextjs 用法</h2>
          import Link from &apos;next/link&apos;; <br />
          import &#123;TextLink&#125; from &apos;eris-ui&apos; <br />
          &lt;Link href=&quot;/xxx&quot;&gt; <br />
          &lt;TextLink&gt;text link&lt;/TextLink&gt; <br />
          &lt;/Link&gt;
          <h2>react 用法</h2>
          import &#123;Link&#125; from &apos;react-router-dom&apos;; <br />
          import &#123;TextLink&#125; from &apos;eris-ui&apos; <br />
          &lt;Link to=&quot;/xxx&quot;&gt; <br />
          &lt;TextLink&gt;text link&lt;/TextLink&gt; <br />
          &lt;/Link&gt;
        </code>
      </>
    );
  },
};

export default meta;
