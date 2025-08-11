import { Empty, ConfigProvider } from '@xsky/eris-ui';
import Image from 'next/image';
import { Meta, StoryObj } from '@storybook/react';
import EmptyImg from './assets/empty.png';

const meta: Meta<typeof Empty> = {
  title: 'DATA DISPLAY/Empty',
  tags: ['visual-test'],
  component: Empty,
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
      description: '描述',
    },
    image: {
      control: {
        type: 'object',
      },
      description: '图片',
    },
  },
};

type Story = StoryObj<typeof Empty>;

export const Basic: Story = {
  render: () => <Empty />,
};

export const EmptyType: Story = {
  render: () => (
    <>
      <Empty size="sm" type="default" description="暂无可用的{资源}" />
      <Empty size="md" type="default" description="暂无可用的{资源}" />
      <Empty size="lg" type="default" description="暂无可用的{资源}" />
    </>
  ),
};

export const SearchType: Story = {
  render: () => (
    <>
      <Empty size="sm" type="search" description="暂无搜索结果，请重新输入" />
      <Empty size="md" type="search" description="暂无可用的{资源}" />
      <Empty size="lg" type="search" description="暂无可用的{资源}" />
    </>
  ),
};

export const AlertType: Story = {
  render: () => (
    <>
      <Empty size="sm" type="alert" description="暂无未解决告警" />
      <Empty size="md" type="alert" description="暂无告警，集群一切正常" />
      <Empty size="lg" type="alert" description="暂无告警，集群一切正常" />
    </>
  ),
};

export const WarningType: Story = {
  render: () => (
    <>
      <Empty size="sm" type="warning" description="暂无可用的{资源}" />
      <Empty size="md" type="warning" description="暂无可用的{资源}" />
      <Empty size="lg" type="warning" description="暂无可用的{资源}" />
    </>
  ),
};

export const OEM: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <div>
          <ConfigProvider themeColor="#FF6A00">
            <div>
              <div>「非状态色」支持 OEM 换肤的类型：default、search</div>
              <div className="flex flex-col gap-2">
                <Empty size="sm" type="default" description="暂无可用的{资源}" />
                <Empty size="sm" type="search" description="暂无搜索结果，请重新输入" />
              </div>
            </div>
            <div>
              <div>「状态色」不支持 OEM 换肤的类型：alert、warning</div>
              <div className="flex flex-col gap-2">
                <Empty size="sm" type="alert" description="暂无未解决告警" />
                <Empty size="sm" type="warning" description="暂无可用的{资源}" />
              </div>
            </div>
          </ConfigProvider>
        </div>
      </div>
    </div>
  ),
};

export const Custom: Story = {
  render: () => (
    <Empty
      description="暂无搜索结果，请重新输入"
      image={<Image src={EmptyImg} width={128} height={128} alt="empy" />}
    />
  ),
};

export default meta;
