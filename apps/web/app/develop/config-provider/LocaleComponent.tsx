'use client';
import React from 'react';
import {
  RadioGroup,
  ConfigProvider,
  Pagination,
  DateTimePicker,
  Popover,
  FooterButtonGroup,
} from '@xsky/eris-ui';
import type { Locale } from '@xsky/eris-ui';

export default function LocaleComponent() {
  const [value, setValue] = React.useState<Locale>('zh-CN');
  const options = [
    { label: '中文 🇨🇳', value: 'zh-CN', title: '中文' },
    { label: 'English 🇺🇸', value: 'en-US', title: 'English' },
    { label: '越南语 🇻🇳', value: 'vi-VN', title: '越南语' },
  ];

  return (
    <div>
      <RadioGroup onChange={(value: Locale) => setValue(value)} options={options} value={value} />

      <ConfigProvider locale={value}>
        <Pagination className="mt-2" defaultPage={1} rowsPerPage={100} totalCount={1000} />
        <DateTimePicker className="mt-2" placeholder="请选择日期" />
        <Popover
          content={
            <div>
              <div>This is a controlled popover</div>
              <FooterButtonGroup
                cancelText="cancel"
                cancelType="text"
                className="mt-[16px]"
                okText="ok"
                okType="primary"
              />
            </div>
          }
          title="title"
        >
          <span className="mt-2">Hover me</span>
        </Popover>
      </ConfigProvider>
    </div>
  );
}
