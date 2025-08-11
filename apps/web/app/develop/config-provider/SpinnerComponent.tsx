'use client';
import React from 'react';
import Image from 'next/image';
import { Button, Spinner, ConfigProvider } from '@xsky/eris-ui';
import xSpinner from '../../../public/x_spinner.gif';

export default function SpinningElements() {
  const [spinning, setSpinning] = React.useState(false);
  const SpinnerChild = () => {
    return (
      <div className="h-10 border-spacing-1 overflow-hidden rounded-lg bg-blue-500 p-2">
        I am a child element
      </div>
    );
  };
  return (
    <ConfigProvider
      spinnerIndicator={{
        default: {
          md: <Image alt="spinner" height={32} src={xSpinner} width={32} />,
          lg: <Image alt="spinner" height={64} src={xSpinner} width={64} />,
        },
      }}
    >
      <div className="rounded-2 flex flex-col items-start gap-2 p-2">
        <Button onClick={() => setSpinning(!spinning)}>Toggle</Button>
        <Spinner size="sm" spinning={spinning} tip="加载中">
          <SpinnerChild />
        </Spinner>
        <Spinner size="md" spinning={spinning} tip="加载中">
          <SpinnerChild />
        </Spinner>
        <Spinner size="lg" spinning={spinning} tip="加载中">
          <SpinnerChild />
        </Spinner>
      </div>
    </ConfigProvider>
  );
}
