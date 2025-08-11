import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Popover, DateTimePicker, Picker, Pagination, FooterButtonGroup } from '@xsky/eris-ui';

export default {
  title: 'setting/Locale',
  tags: ['skip-test'],
} as Meta;

const options = [
  { label: '中文 🇨🇳', value: 'zh-CN', title: '中文' },
  { label: 'English 🇺🇸', value: 'en-US', title: 'English' },
  { label: '越南语 🇻🇳', value: 'vi-VN', title: '越南语' },
];

const LocaleComponent = ({ locale }: { locale: string }) => {
  return (
    <div>
      <div className="mb-2 text-lg font-bold">
        当前语言: {options.find((item) => item.value === locale)?.label}
      </div>
      <div className="mb-2">
        <h3>DateTimePicker</h3>
        <DateTimePicker picker={Picker.datetime} />
      </div>
      <div className="mt-2">
        <h3>Pagination</h3>
        <Pagination totalCount={1000} defaultPage={1} rowsPerPage={100} />
      </div>
      <div className="mt-2">
        <h3>Popover</h3>
        <Popover
          title="title"
          content={
            <div>
              <div>This is a controlled popover</div>
              <FooterButtonGroup
                className="mt-[16px]"
                okText="ok"
                cancelText="cancel"
                okType="primary"
                cancelType="text"
              />
            </div>
          }
        >
          <span className="mt-2">Hover me</span>
        </Popover>
      </div>
    </div>
  );
};

export const DefaultLocale: StoryObj = {
  render: (args, context) => {
    return <LocaleComponent locale={context.globals.locale} />;
  },
};
