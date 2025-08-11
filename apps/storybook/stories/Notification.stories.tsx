import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  NotificationProps,
  Notification,
  NotificationsProps,
  Notifications,
  useNotifications,
} from '@xsky/eris-ui';

export default {
  title: 'FEEDBACK/Notification',
  component: Notification,
  tags: ['visual-test'],
} as Meta;

type NotificationStory = StoryObj<NotificationProps>;

export const InfoNotification: NotificationStory = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    type: 'info',
  },
};

export const SuccessNotification: NotificationStory = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    type: 'success',
  },
};

export const WarningNotification: NotificationStory = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    type: 'warning',
  },
};

export const ErrorNotification: NotificationStory = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    type: 'error',
  },
};

export const CriticalNotification: NotificationStory = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    type: 'critical',
  },
};

export const NotificationWithLongTitle: NotificationStory = {
  args: {
    title:
      'This is a Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis title',
    description: 'This is a description',
    type: 'info',
  },
};

export const NotificationWithLongDescription: NotificationStory = {
  args: {
    title: 'This is a title',
    description:
      'This is a Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis description',
    type: 'info',
  },
};

export const NotificationWithLongDescriptionNoTruncate: NotificationStory = {
  args: {
    title: 'This is a title',
    description:
      'This is a Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis description',
    truncateDescription: false,
    type: 'info',
  },
};

export const NotificationWithLinkInDescription: NotificationStory = {
  args: {
    title: 'This is a title',
    description: (
      <div>
        <span>{'This is a description with '}</span>
        <a className="text-inherit" href="">
          {'link'}
        </a>
        <span>{' inside.'}</span>
      </div>
    ),
    type: 'info',
  },
};

export const NotificationWithLinkTitle: NotificationStory = {
  args: {
    title: (
      <a className="text-inherit no-underline hover:underline" href="">
        {'This is a link title'}
      </a>
    ),
    description: 'This is a description',
    type: 'info',
  },
};

export const NotificationOnClose: NotificationStory = {
  args: {
    title: 'This is a title',
    description: 'This is a description',
    type: 'info',
    onClose: function () {
      console.log('onClose called');
    },
  },
};

// Notifications

type NotificationsStory = StoryObj<NotificationsProps>;

function NotificationsExampleChildren() {
  const notificationsContextValue = useNotifications();

  const [count, setCount] = useState(1);
  const push = function () {
    const title = `This is a title ${count}`;
    notificationsContextValue.pushData({
      title,
      description: 'This is a description',
      type: 'info',
      onClose: function () {
        console.log(`onClose called with title: ${title}`);
      },
    });
    setCount(count + 1);
  };

  return <button onClick={push}>push notification</button>;
}

export const NotificationsExample: NotificationsStory = {
  render: function () {
    return (
      <Notifications>
        <NotificationsExampleChildren />
      </Notifications>
    );
  },
};
