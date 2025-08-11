import React, { useState, useMemo } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertProps } from '@xsky/eris-ui';
import { QuestionFill16, ArrowDownLine16, UpLine16, DownLine16 } from '@xsky/eris-icons';
import lodash from 'lodash';
export default {
  title: 'FEEDBACK/Alert',
  component: Alert,
  tags: ['visual-test'],
} as Meta;

type AlertStory = StoryObj<AlertProps>;

export const InfoAlert: AlertStory = {
  args: {
    type: 'info',
    content: 'This is an info alert123',
  },
};

export const ErrorAlert: AlertStory = {
  args: {
    type: 'error',
    content: 'This is an error alert999',
  },
};

export const WarningAlert: AlertStory = {
  args: {
    type: 'warning',
    content: 'This is a warning alert',
  },
};

export const AlertWithLink: AlertStory = {
  args: {
    type: 'info',
    content: (
      <div>
        This is an alert with a
        <a href="#" className="text-text-link-updating-normal mx-[4px]">
          link
        </a>
        inside.
      </div>
    ),
  },
};

export const AlertWithLinkEnd: AlertStory = {
  args: {
    type: 'info',
    content: (
      <div>
        This is an alert with a inside.
        <a href="#" className="text-text-link-updating-normal ml-[8px]">
          link
        </a>
      </div>
    ),
  },
};

export const AlertAlignCenter: AlertStory = {
  args: {
    type: 'info',
    content: <div>This is a align center</div>,
    className: '[&>.alert-content-wrapper]:justify-center',
    showClose: true,
  },
};

export const AlertWithIcon: AlertStory = {
  args: {
    type: 'info',
    showIcon: true,
    content: 'This is an alert with an icon',
  },
};

export const AlertWithoutIcon: AlertStory = {
  args: {
    type: 'info',
    showIcon: false,
    content: 'This is an alert without an icon',
  },
};

export const AlertWithClose: AlertStory = {
  args: {
    type: 'info',
    showIcon: false,
    showClose: true,
    content: 'This is an alert with an icon',
  },
};

export const AlertWithoutBorder: AlertStory = {
  args: {
    type: 'info',
    className: 'border-none',
    content: 'This is an alert without border',
  },
};

export const AlertWithoutBackgroundBorder: AlertStory = {
  args: {
    type: 'info',
    className: 'bg-transparent border-none',
    content: 'This is an alert without border and background',
  },
};

export const AlertWithAction: AlertStory = {
  args: {
    type: 'info',
    className: '[&>.action-wrapper]:flex [&>.action-wrapper]:items-center',
    content: 'This is an alert with an action',
    action: <QuestionFill16 />,
  },
};

export const AlertCustomMessage: AlertStory = {
  args: {
    showIcon: false,
    type: 'info',
    content: (
      <div>
        <p className="m-0">This is an alert with custom content</p>
        <ul className="m-0 ml-[22px] p-0">
          <li>item</li>
        </ul>
      </div>
    ),
  },
};

export const MultipleAlerts: AlertStory = {
  render: () => <AlertList />,
};

const alertData: AlertProps[] = [
  {
    type: 'error',
    className: 'border-none',
    content: 'content1',
  },
  {
    type: 'error',
    className: 'border-none',
    content: 'content2',
  },
  {
    type: 'warning',
    className: 'border-none',
    content: 'content3',
  },
  {
    type: 'info',
    className: 'border-none',
    content: 'content4',
  },
];
const AlertList: React.FC<any> = () => {
  const [expanded, setExpanded] = useState(false);
  const [closedIndices, setClosedIndices] = useState<number[]>([]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const memoizedAlertData = useMemo(() => {
    const alertDataParsed = alertData?.map((alert, index) => ({
      ...alert,
      staticIndex: index,
      onClose: () => setClosedIndices((prev) => [...prev, index]),
    }));
    const activeAlertData = alertDataParsed?.filter((_, index) => !closedIndices.includes(index));
    const hasOverflow = activeAlertData?.length > 1;
    // 如果未展开且有多条数据，仅保留第一条
    const filteredData = !expanded && hasOverflow ? [activeAlertData[0]] : activeAlertData;
    return filteredData?.map((alert, index) => ({
      ...alert,
      className: `${alert.className} [&_.action-wrapper]:flex [&_.action-wrapper]:items-center [&>.alert-content-wrapper]:justify-center rounded-none`,
      action:
        index === 0 && hasOverflow ? (
          expanded ? (
            <UpLine16 onClick={toggleExpand} className="pl-1" />
          ) : (
            <DownLine16 onClick={toggleExpand} className="pl-1" />
          )
        ) : null,
      showClose: !(index === 0 && hasOverflow),
    }));
  }, [alertData, expanded, closedIndices]);
  return (
    <div className="alert-list">
      {memoizedAlertData.map((alert, index) => (
        <Alert key={alert.staticIndex} {...lodash.omit(alert, 'staticIndex')} />
      ))}
    </div>
  );
};
