import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Message, MessageProps } from '@xsky/eris-ui';

export default {
  title: 'FEEDBACK/Message',
  component: Message,
  tags: ['visual-test'],
} as Meta;

type MessageStory = StoryObj<MessageProps>;

export const InfoMessage: MessageStory = {
  args: {
    type: 'info',
    message: 'This is an info message',
    onClose: (param) => {
      console.log(param);
    },
  },
};

export const ErrorMessage: MessageStory = {
  args: {
    type: 'error',
    message: 'This is an error message',
  },
};

export const WarningMessage: MessageStory = {
  args: {
    type: 'warning',
    message: 'This is a warning message',
  },
};

export const SuccessMessage: MessageStory = {
  args: {
    type: 'success',
    message: 'This is a success message',
  },
};

export const TruncatedMessage: MessageStory = {
  args: {
    type: 'info',
    message:
      'This is a long message that should be truncated. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    truncate: 'truncate-2-lines',
  },
};

export const MessageWithLink: MessageStory = {
  args: {
    type: 'info',
    message: (
      <div>
        This is a message with a&nsbp;
        <a href="#" className="text-text-1 mx-[4px]">
          link
        </a>
        inside.
      </div>
    ),
  },
};

export const MessageWithIcon: MessageStory = {
  args: {
    type: 'info',
    showIcon: true,
    message: 'This is a message with an icon',
  },
};

export const MessageWithoutIcon: MessageStory = {
  args: {
    type: 'info',
    showIcon: false,
    message: 'This is a message without an icon',
  },
};

export const MessageWithAction: MessageStory = {
  args: {
    type: 'info',
    message:
      'This is a message with an actionThis is a message with an actionThis is a message with an actionThis is a message with an actionThis is a message with an action',
    action: (
      <a href="#" className="ml-2 text-blue-500">
        Link
      </a>
    ),
  },
};
