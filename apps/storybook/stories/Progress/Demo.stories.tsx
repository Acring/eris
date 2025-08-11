import { Meta, StoryObj } from '@storybook/react';
import {
  Progress,
  CircleProgressProps,
  LineProgressProps,
  MiniProgressProps,
  RectangleProps,
} from '@xsky/eris-ui';
import React, { useEffect, useState } from 'react';

export default {
  title: 'FEEDBACK/Progress/Demo',
  component: Progress,
  tags: ['skip-test'],
} as Meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => {
    const ProgressDemoHoc = <T,>(Component: any) => {
      const ProgressWrapper = (props: T) => {
        const [progress, setProgress] = useState(13);
        useEffect(() => {
          const timer = setInterval(() => {
            setProgress((prevProgress) => {
              if (prevProgress >= 100) {
                clearInterval(timer);
                return prevProgress;
              }
              return prevProgress + 1;
            });
          }, 500);

          return () => {
            clearInterval(timer);
          };
        }, []);

        return <Component percent={progress} {...props} />;
      };

      ProgressWrapper.displayName = `ProgressDemo(${Component.displayName})`;

      return ProgressWrapper;
    };
    const LineWithHoc = ProgressDemoHoc<LineProgressProps>(Progress);
    const CircleWithHoc = ProgressDemoHoc<CircleProgressProps>(Progress.Circle);
    const RectangleWithHoc = ProgressDemoHoc<RectangleProps>(Progress.Rectangle);
    const MiniWithHoc = ProgressDemoHoc<MiniProgressProps>(Progress.Mini);
    return (
      <>
        <LineWithHoc />
        <CircleWithHoc />
        <RectangleWithHoc />
        <MiniWithHoc className="block" />
      </>
    );
  },
};
