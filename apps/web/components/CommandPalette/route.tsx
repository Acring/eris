import { MetadataClusterLine16 } from '@xsky/eris-icons';
import { Code } from 'iconoir-react';
import React from 'react';

export enum GroupType {
  design = '设计',
  develop = '开发',
  components = '组件',
  other = '其他',
}

export interface Route {
  name: string;
  group: GroupType;
  keywords?: string[];
  path: string;
  data?: Record<string, any>;
  icon?: React.ReactNode;
}

export const routes: Route[] = [
  {
    name: '设计系统',
    path: '/themes/overview',
    keywords: ['design system', '设计系统', 'shejixitong'],
    group: GroupType.design,
  },
  {
    name: '设计原则',
    path: '/themes/design-principle',
    keywords: ['design principle', '设计原则', 'shejiyuanze'],
    group: GroupType.design,
  },
  {
    name: '颜色',
    path: '/themes/color',
    keywords: ['color', '颜色', 'yanse'],
    group: GroupType.design,
  },
  {
    name: '图标',
    path: '/themes/icon',
    keywords: ['icon', '图标', 'tubiao'],
    group: GroupType.design,
  },
  {
    name: '圆角',
    path: '/themes/radius',
    keywords: ['radius', '圆角', 'yuanjiao'],
    group: GroupType.design,
  },
  {
    name: '字体',
    path: '/themes/font',
    keywords: ['font', '字体', 'ziti'],
    group: GroupType.design,
  },
  {
    name: '阴影',
    path: '/themes/shadow',
    keywords: ['shadow', '阴影', 'yinying'],
    group: GroupType.design,
  },
  {
    name: '设计模式',
    path: '/themes/design-pattern',
    keywords: ['design pattern', '设计模式', 'shejimoshi'],
    group: GroupType.design,
  },
  {
    name: '介绍',
    path: '/develop/introduction',
    keywords: ['introduction', '介绍', 'jieshao'],
    group: GroupType.develop,
  },
  {
    name: '更新日志',
    path: '/develop/changelog',
    keywords: ['changelog', '更新日志', 'gengxinrizhi'],
    group: GroupType.develop,
  },
  {
    name: '快速上手',
    path: '/develop/quick-start',
    keywords: ['quick start', '快速上手', 'kuaisushangshou'],
    group: GroupType.develop,
  },
  {
    name: '在 Next.js 中使用',
    path: '/develop/nextjs',
    keywords: ['nextjs', '在 Next.js 中使用', 'zainext.jszhongshiyong'],
    group: GroupType.develop,
  },
  {
    name: '参与开发',
    keywords: ['contribute', '参与开发', 'canyukaifa'],
    path: '/develop/develop-overview',
    group: GroupType.develop,
  },
  {
    name: 'API 设计规范',
    keywords: ['api', 'API 设计规范', 'APIshejiguifan'],
    path: '/develop/api',
    group: GroupType.develop,
  },
  {
    name: '全局配置',
    path: '/develop/config-provider',
    keywords: ['config provider', '全局配置', 'quanjvpeizhi'],
    group: GroupType.develop,
  },
  {
    name: 'Alert',
    path: '/components?component=feedback-alert',
    group: GroupType.components,
  },
  {
    name: 'Badge',
    path: '/components?component=data-display-badge',
    group: GroupType.components,
  },
  {
    name: 'Button',
    path: '/components?component=other-button',
    group: GroupType.components,
  },
  {
    name: 'Card',
    path: '/components?component=data-display-card',
    group: GroupType.components,
  },
  {
    name: 'Cascader',
    path: '/components?component=data-entry-cascader',
    group: GroupType.components,
  },
  {
    name: 'Checkbox',
    path: '/components?component=data-entry-checkbox',
    group: GroupType.components,
  },
  {
    name: 'CheckboxGroup',
    path: '/components?component=data-entry-checkboxgroup',
    group: GroupType.components,
  },
  {
    name: 'Collapse',
    path: '/components?component=data-display-collapse-default',
    group: GroupType.components,
  },
  {
    name: 'CollapseCard',
    path: '/components?component=data-display-collapse-card',
    group: GroupType.components,
  },
  {
    name: 'CommandPalette',
    path: '/components?component=other-commandpalette',
    group: GroupType.components,
  },
  {
    name: 'DateTimePicker',
    path: '/components?component=data-entry-datetimepicker',
    group: GroupType.components,
  },
  {
    name: 'Divider',
    path: '/components?component=other-divider',
    group: GroupType.components,
  },
  {
    name: 'Drawer',
    path: '/components?component=feedback-drawer',
    group: GroupType.components,
  },
  {
    name: 'Dropdown',
    path: '/components?component=navigation-dropdown',
    group: GroupType.components,
  },
  {
    name: 'Empty',
    path: '/components?component=data-display-empty',
    group: GroupType.components,
  },
  {
    name: 'IconButton',
    path: '/components?component=other-iconbutton',
    group: GroupType.components,
  },
  {
    name: 'Icons',
    path: '/components?component=icons',
    group: GroupType.components,
  },
  {
    name: 'Input',
    path: '/components?component=data-entry-input-input',
    group: GroupType.components,
  },
  {
    name: 'InputNumber',
    path: '/components?component=data-entry-inputnumber',
    group: GroupType.components,
  },
  {
    name: 'InputTag',
    path: '/components?component=data-entry-inputtag',
    group: GroupType.components,
  },
  {
    name: 'Locale',
    path: '/components?component=setting-locale',
    group: GroupType.components,
  },
  {
    name: 'Message',
    path: '/components?component=feedback-message',
    group: GroupType.components,
  },
  {
    name: 'Messager',
    path: '/components?component=feedback-messager',
    group: GroupType.components,
  },
  {
    name: 'Notification',
    path: '/components?component=feedback-notification',
    group: GroupType.components,
  },
  {
    name: 'Modal',
    path: '/components?component=feedback-modal',
    group: GroupType.components,
  },
  {
    name: 'Pagination',
    path: '/components?component=navigation-pagination',
    group: GroupType.components,
  },
  {
    name: 'Password',
    path: '/components?component=data-entry-input-password',
    group: GroupType.components,
  },
  {
    name: 'Popover',
    path: '/components?component=data-display-popover',
    group: GroupType.components,
  },
  {
    name: 'Radio',
    path: '/components?component=data-entry-radio',
    group: GroupType.components,
  },
  {
    name: 'RadioGroup',
    path: '/components?component=data-entry-radiogroup',
    group: GroupType.components,
  },
  {
    name: 'ScrollArea',
    path: '/components?component=other-scrollarea',
    group: GroupType.components,
  },
  {
    name: 'Select',
    path: '/components?component=data-entry-select',
    group: GroupType.components,
  },
  {
    name: 'Spinner',
    path: '/components?component=feedback-spinner',
    group: GroupType.components,
  },
  {
    name: 'Steps',
    path: '/components?component=navigation-steps',
    group: GroupType.components,
  },
  {
    name: 'Switch',
    path: '/components?component=data-entry-switch',
    group: GroupType.components,
  },
  {
    name: 'DataTable',
    path: '/components?component=data-display-datatable',
    group: GroupType.components,
  },
  {
    name: 'Tabs',
    path: '/components?component=data-display-tabs',
    group: GroupType.components,
  },
  {
    name: 'Tag',
    path: '/components?component=data-display-tag',
    group: GroupType.components,
  },
  {
    name: 'Textarea',
    path: '/components?component=data-entry-input-textarea',
    group: GroupType.components,
  },
  {
    name: 'TextLink',
    path: '/components?component=other-textlink',
    group: GroupType.components,
  },
  {
    name: 'Tooltip',
    path: '/components?component=data-display-tooltip',
    group: GroupType.components,
  },
  {
    name: 'Tree',
    path: '/components?component=data-display-tree-tree',
    group: GroupType.components,
  },
  {
    name: 'TreeNode',
    path: '/components?component=data-display-tree-treenode',
    group: GroupType.components,
  },
  {
    name: 'TreeSelect',
    path: '/components?component=data-entry-treeselect',
    group: GroupType.components,
  },
  {
    name: 'Combobox',
    path: '/components?component=data-entry-combobox',
    group: GroupType.components,
  },
  {
    name: 'CircleProgress',
    path: '/components?component=feedback-progress-circleprogress',
    group: GroupType.components,
  },
  {
    name: 'LineProgress',
    path: '/components?component=feedback-progress-lineprogress',
    group: GroupType.components,
  },
  {
    name: 'MiniProgress',
    path: '/components?component=feedback-progress-miniprogress',
    group: GroupType.components,
  },
  {
    name: 'RectangleProgress',
    path: '/components?component=feedback-progress-rectangleprogress',
    group: GroupType.components,
  },
  {
    name: 'Skeleton',
    path: '/components?component=data-entry-skeleton-skeleton',
    group: GroupType.components,
  },
  {
    name: 'SkeletonParagraph',
    path: '/components?component=data-entry-skeleton-skeletonparagraph',
    group: GroupType.components,
  },
  {
    name: 'SkeletonTitle',
    path: '/components?component=data-entry-skeleton-skeletontitle',
    group: GroupType.components,
  },
  {
    name: 'Form',
    path: '/components?component=data-entry-form-form',
    group: GroupType.components,
  },
  {
    name: 'Field',
    path: '/components?component=data-entry-form-field',
    group: GroupType.components,
  },
  {
    name: 'FieldGroup',
    path: '/components?component=data-entry-form-fieldgroup',
    group: GroupType.components,
  },
  {
    name: 'Errors',
    path: '/components?component=data-entry-form-errors',
    group: GroupType.components,
  },
  {
    name: 'Controller',
    path: '/components?component=data-entry-form-controller',
    group: GroupType.components,
  },
  {
    name: 'PopConfirm',
    path: '/components?component=data-display-popconfirm',
    group: GroupType.components,
  },
  {
    name: 'Breadcrumb',
    path: '/components?component=navigation-breadcrumb',
    group: GroupType.components,
  },
  {
    name: '使用情况',
    path: '/usage',
    keywords: ['usage', '使用情况', 'shiyongqingkuang'],
    group: GroupType.other,
  },

  {
    name: '业务组件',
    path: 'http://10.16.180.148:3001',
    keywords: ['business components', '业务组件', 'yewuzujian'],
    group: GroupType.other,
    icon: <MetadataClusterLine16 />,
  },
];
