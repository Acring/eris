// 暗黑模式
import { cn, Input, Switch } from '@xsky/eris-ui';
import { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'BASE/Theme', // 故事的标题
};

function DarkModeStory() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="flex flex-col border border-gray-200 border-solid bg-white gap-4">
      <Switch checked={isDark} onChange={() => setIsDark(!isDark)}></Switch>
      <div className={cn('p-4', isDark ? 'dark bg-black ' : 'bg-white')}>
        <div className="text-text-2">{isDark ? 'DarkMode' : 'LightMode'}</div>
        <Input></Input>
      </div>
    </div>
  );
}

export const DarkMode = {
  render: () => {
    return <DarkModeStory />;
  },
};

export default meta;
