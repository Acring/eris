import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, Button, Dropdown } from '@xsky/eris-ui';
import { DownLine16 } from '@xsky/eris-icons';

type Story = StoryObj<typeof Breadcrumb> & {
  [key: string]: any;
};
const meta: Meta<typeof Breadcrumb> = {
  title: 'NAVIGATION/Breadcrumb',
  component: Breadcrumb,
  tags: ['visual-test'],
  argTypes: {
    className: { control: 'text', description: '容器的 classname' },
    routes: {
      control: {
        type: 'object',
      },
      defaultValue: [],
      description: '条目数据',
    },
    onClickItem: {
      description: '点击的回调',
      action: 'onFilterChange',
      control: {
        type: 'object',
      },
    },
  },
};

const longStringInd = [0, 2, 5, 9];
const data = Array.from({ length: 10 }).map((val, index) => ({
  path: index % 2 === 1 ? `/path${index}` : '',
  name: !longStringInd.includes(index)
    ? `我是第${index + 1}个路由`
    : `我是第${index + 1}个路由，很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长`,
}));

export const Base: Story = {
  args: {
    onClickItem: (route, e) => {
      alert(`用对应 history(node环境 或 react环境)跳转到 ${route.name}`);
    },
    routes: [
      {
        path: '/path1',
        name: 'path1',
      },
      {
        path: '/path1/path2',
        name: 'path2',
      },
      {
        path: '/path1/path2/path3',
        name: 'path3',
      },
      {
        path: '/path1/path2/path3/path4',
        name: 'path4',
      },
      {
        path: '/path1/path2/path3/path4/path5',
        name: 'path5',
      },
    ],
  },
};

export const WithNotActiveRoute: Story = {
  args: {
    onClickItem: (route, e) => {
      alert(`点击了 ${route.name}`);
    },
    routes: [
      {
        name: 'path1',
      },
      {
        name: 'path2',
      },
      {
        name: 'path3',
      },
      {
        name: 'path4',
      },
      {
        path: '/path1/path2/path3/path4/path5',
        name: 'path5',
      },
    ],
  },
};

export const LongRoute: Story = {
  ControlBreadcrumbWidth: () => {
    const [value, setValue] = useState<number | null | undefined>(800);
    return (
      <div>
        <Breadcrumb routes={data} />
      </div>
    );
  },
  render: () => {
    return <LongRoute.ControlBreadcrumbWidth />;
  },
};

export const CustomRender: Story = {
  CustomItem: () => {
    const [activePath, setActivePath] = useState('path1');
    const menuList = [
      { key: 'path1', label: 'now route1' },
      { key: 'path2', label: 'now route2' },
      { key: 'path3', label: 'now route3' },
    ].map((val) => {
      return {
        ...val,
        onClick: () => {
          setActivePath(val?.key || '');
        },
      };
    });
    const activeLabel = menuList.find((menu) => menu.key === activePath)?.label;
    const routes = [
      {
        path: '/path1',
        name: 'path1',
      },
      {
        path: '/path2',
        name: 'path2',
      },
      {
        path: '/path3',
        name: 'path3',
      },
      {
        path: '/path4',
        name: 'path4',
      },
      {
        path: '/path5',
        name: 'path5',
        renderItem: () => {
          return (
            <div className={'flex justify-center'}>
              <Dropdown
                menuList={menuList}
                label={
                  <div className="flex items-center gap-[4px]">
                    {activeLabel}
                    <DownLine16 />
                  </div>
                }
              ></Dropdown>
            </div>
          );
        },
      },
    ];
    return <Breadcrumb routes={routes} />;
  },
  render: () => {
    return <CustomRender.CustomItem />;
  },
};

export const DynamicRoutesExample: Story = {
  name: '动态修改路由',
  DynamicRoutes: () => {
    const [routes, setRoutes] = useState([
      {
        path: '/path1',
        name: '首页',
      },
      {
        path: '/path1/path2',
        name: '列表页',
      },
      {
        path: '/path1/path2/path3',
        name: '详情页',
      },
    ]);

    const addRoute = () => {
      setRoutes([
        ...routes,
        {
          path: `/path1/path2/path3/path${routes.length + 1}`,
          name: `新增页面 ${routes.length + 1}`,
        },
      ]);
    };

    const removeRoute = () => {
      if (routes.length > 1) {
        setRoutes(routes.slice(0, -1));
      }
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Button onClick={addRoute} variant="primary">
            添加路由
          </Button>
          <Button onClick={removeRoute} variant="primary" color="danger">
            移除路由
          </Button>
        </div>
        <div className="w-[500px]">
          <Breadcrumb
            routes={routes}
            onClickItem={(route) => {
              console.log('点击了路由:', route);
            }}
          />
        </div>
      </div>
    );
  },
  render: () => <DynamicRoutesExample.DynamicRoutes />,
};

DynamicRoutesExample.parameters = {
  docs: {
    description: {
      story: '通过按钮动态添加或移除面包屑路由项。',
    },
  },
};

export default meta;
