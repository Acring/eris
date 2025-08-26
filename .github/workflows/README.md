# GitHub Actions 工作流

## Deploy Storybook to GitHub Pages

这个工作流会自动构建 Storybook 并部署到 GitHub Pages。

### 功能

- 🚀 自动构建 Storybook
- 📦 支持 monorepo 结构
- 🎭 集成 Playwright 支持 `storybook-llms-extractor`
- 🌐 部署到 GitHub Pages
- 🔄 支持手动触发

### 触发条件

- Push 到 `master` 或 `main` 分支
- Pull Request 到 `master` 或 `main` 分支
- 手动触发 (workflow_dispatch)

### 设置步骤

1. **启用 GitHub Pages**

   - 进入仓库设置 → Pages
   - Source 选择 "GitHub Actions"

2. **确保权限设置**

   - 工作流已配置必要的权限：
     - `contents: read` - 读取仓库内容
     - `pages: write` - 写入 GitHub Pages
     - `id-token: write` - 部署验证

3. **环境变量**
   - `NODE_OPTIONS: --max_old_space_size=4096` - 增加 Node.js 内存限制

### 构建流程

1. **环境设置**

   - 使用 Ubuntu 最新版
   - 安装 Node.js 18
   - 配置 Yarn 缓存

2. **依赖安装**

   - 安装项目依赖
   - 安装 Playwright 浏览器和系统依赖

3. **构建过程**

   - 构建所有包 (`yarn build`)
   - 构建 Storybook (`yarn build-storybook`)
   - 运行 `storybook-llms-extractor` 提取文档

4. **部署**
   - 仅在推送到主分支时部署
   - 上传构建产物到 GitHub Pages

### 注意事项

- `storybook-llms-extractor` 需要 Playwright 支持
- 构建产物位于 `apps/storybook/storybook-static/`
- 部署仅在主分支触发，PR 仅进行构建测试
