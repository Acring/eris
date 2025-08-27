import { Messager, useMessage } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'FEEDBACK/Messager',
  component: Messager,
  tags: ['skip-test'],
} as Meta;
type Story = StoryObj<typeof Messager>;

const fakeMessage = [
  {
    message: '删除对象网关失败删除对象网关失败删除对象网关失败删除对象网关失败删除对象网关失败',
    type: 'error',
  },
  {
    message: '删除对象网关成功',
    type: 'success',
  },
  {
    message: '删除对象网关中',
    type: 'info',
  },
];

export const CustomMessager: Story = {
  args: {},
  render: (args) => {
    const getRadomMessage = () => fakeMessage[Math.floor(Math.random() * fakeMessage.length)];

    const Item = () => {
      const props = useMessage();
      return <button onClick={() => props?.push(getRadomMessage())}>message.push</button>;
    };

    return (
      <Messager duration={2000} maxMessages={5} position="topRight" {...args}>
        <Item />
      </Messager>
    );
  },
};
