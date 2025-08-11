# XSKY Eris 通用设计系统

## 官网

https://eris-ui.xsky.com/

## 问题反馈

通过该表单提交 bug: https://xskydata.feishu.cn/share/base/form/shrcnKvi0JD68IdCCbWZdSP9p1b

## 开发流程

### 安装依赖

```
yarn install
```

### 启动 dev

dev 会启动 storybook 并以 watch 模式，编译 ui 组件和 ui-preset 主题系统

```
yarn dev
```

### 目录

- `packages/ui/components` 组件目录
- `apps/storybook/stories ` storybook 目录
- `packages/ui-preset` 主题系统
- `packages/eslint-config-ui` eslint 配置
- `packages/tsconfig-ui` tsconfig 配置
- `packages/ui/test` 测试套件目录
- `packages/ui/test/cypress` Cypress 测试套件目录

## 使用

### 安装

将下面的脚本保存到项目的 `scripts/eris-upgrade.js` 中，并在 `package.json` 中配置对应的快捷启动脚本，该脚本会从 github 仓库中下载
`@xsky/eris-ui` `@xsky/eris-ui-preset` `@xsky/eris-icons` 三个库

```javascript
const pathname = 'http://eris-ui.xsky.com';
const http = require('http');
const { exec } = require('child_process');

http
  .get(`${pathname}/api/version/latest`, (resp) => {
    let data = '';

    // 接收数据片段。
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // 数据接收完毕。
    resp.on('end', () => {
      const { ui, uiPreset, icons } = JSON.parse(data);
      console.log(`当前版本：ui: ${ui}\nui-preset: ${uiPreset}\nicons: ${icons}`);

      exec(
        `
        yarn upgrade git+ssh://git@github.xsky.com/front-end/eris.git#eris-icons-v${icons}-gitpkg
        yarn upgrade git+ssh://git@github.xsky.com/front-end/eris.git#eris-ui-v${ui}-gitpkg
        yarn upgrade git+ssh://git@github.xsky.com/front-end/eris.git#eris-ui-preset-v${uiPreset}-gitpkg
        `,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`执行错误: ${error}`);
            return;
          }
          console.log(stdout);
        },
      );
    });
  })
  .on('error', (err) => {
    console.error('请求错误: ' + err.message);
  });
```

package.json

```JSON
  "eris:upgrade": "node ./scripts/eris-upgrade.js"
```

然后执行

```bash
yarn eris:upgrade
```

### 修改 tailwind.config.ts

1. 在 config.content 中增加 `'./node_modules/@xsky/eris-ui/**/*.{js,ts,jsx,tsx,mdx}'`
2. 设置 config.presets

```ts
{
  presets: [require('@xsky/eris-ui-preset')];
}
```

### 配置 next.config.js

- transpilePackages (包转译)，解决 assets 引入图片问题
- optimizePackageImports (包优化)

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@xsky/eris-ui'],
  experimental: {
    optimizePackageImports: ['@xsky/eris-ui'],
  },
};

module.exports = nextConfig;
```

### 使用组件

```ts
import { Button, Input } from '@xsky/eris-ui';
```

### 测试

#### 单元测试

```bash
# 运行单元测试
yarn ut:coverage

# 调试
yarn ut:watch
```

#### 视觉回归测试

```bash
# 生成 vt 截图
# 可选（组件和storybook代码都没有更新，不需要构建）
yarn build

yarn vt

# 更新 vt 截图
yarn vt:update
```

## 技术栈

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io)
- [Tailwindcss](https://tailwindcss.com/)
- [TurboRepo](https://turbo.build/repo)
- [Radix](https://www.radix-ui.com/)
- [ECharts](https://echarts.apache.org/zh/index.html)

## 构建缓存

当我们对项目进行编译时，需要使用比较多的算力和时间进行编译，但是有时候这些编译可能是多余的，例如当我们只修改了 website 或者 storybook 时，由于 website 和 storybook 依赖于
@xsky/eris-ui 和 @xsky/eris-ui-preset 所以我们需要同时执行三个 build，但是此时的 @xsky/eris-ui 和 @xsky/eris-ui-preset 是多余的，所以我们其实不需要对这两个进行重复的编译

turbo 本身已经帮我们处理了缓存，所以我们不需要太关注

### 远程缓存配置

turbo 默认的缓存是在本地的，也就是说并不能在多个设备之间共享缓存，但是可以通过配置远程缓存服务器，让我们可以将缓存上传到某个特定的服务器上，当其他的主机进行构建时，只需要通过比对
远程缓存中是否存在已经构建过的记录，即可在已经有缓存时使用远程缓存，节省本地的构建时间和算力消耗。
我们需要在本地创建 `.env` 文件，可以将 `.env.example` 复制一份，然后填写对应的远程缓存地址来打开远程缓存

对于大部分只进行 dev 开发的情况, 并不需要远程缓存，所以这个配置并非强制要求，可以视情况进行配置

## 自动发布

当代码被合入 master 之后会自动执行发布脚本，更新 package version，并且将代码打包用 tag 的方式发布包.

## 常见问题

- 如果同时 merge 两个 PR，会导致 tag 发布有问题，最好一个一个 PR 合入

## 同步 Figma Variables

1. 访问 https://www.figma.com/design/KJ39xYVscjavNtc3F7nssW/Overlord-%E8%AE%BE%E8%AE%A1%E7%B3%BB%E7%BB%9F--%F0%9F%92%A0?node-id=0-1&t=zvV6uz8H3Zz8Rtmz-0

2. 使用 variables2json 插件，将 Settings 的 color format 设置为 `rgba` ，下载 json 文件并将内容替换掉 `packages/ui-preset/src/designSystem/figma-variables.json` 中的内容

3. 在 packages/ui-preset 下执行 yarn convert-figma-variables

## 注意事项

1. 为了使 ConfigProvider 能在微服务中生效，在组件中使用 useConfigProvider 时，要从 @xsky/eris-ui/ConfigProvider 中引入，参考 Spinner 组件
