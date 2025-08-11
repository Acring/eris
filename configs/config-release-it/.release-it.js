/**
 * 用于 ui ui-preset icons 等包的发布配置
 */
const version = '${version}';
const packageName = process.env.npm_package_name;
const scope = packageName.split('/')[1];

module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      path: '.',
      infile: 'CHANGELOG.md',
      preset: 'conventionalcommits',
      gitRawCommitsOpts: {
        path: '.',
      },
    },
  },
  git: {
    push: true,
    tagName: `${packageName}-v${version}`,
    commitsPath: '.',
    commitMessage: `feat(${scope}): released version v${version} [no ci]`,
    requireCommits: true,
    requireCommitsFail: false,
  },
  npm: {
    publish: false,
    versionArgs: ['--workspaces false'],
  },
  github: {
    release: false,
    releaseName: `${packageName}-v${version}`,
  },
  hooks: {
    'before:git:release': ['mvm-update', 'git add --all'],
    'after:git:release': [
      'yarn git-publish',
      `./scripts/feishu-notify.sh "🎉 ${packageName} ${version}" $FEISHU_WEBHOOK`,
      `./scripts/feishu-notify.sh "🎉 ${packageName} ${version}" $FE_FEISHU_WEBHOOK`,
    ],
  },
};
