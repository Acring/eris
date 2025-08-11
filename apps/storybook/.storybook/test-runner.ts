import { TestRunnerConfig, waitForPageReady } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const customSnapshotsDir = `${process.cwd()}/__snapshots__/base`;
const customDiffDir = `${process.cwd()}/__snapshots__/__diff_output__`;
const customReceivedDir = `${process.cwd()}/__snapshots__/actual`;

const config: TestRunnerConfig = {
  tags: {
    // 只执行需要视觉回归测试的story，用于生成视觉回归测试的截图
    include: ['visual-test'],
    // 跳过检查
    exclude: ['skip-test'],
  },
  setup() {
    // @ts-expect-error: 'expect' is not recognized by TypeScript but is available in the test environment
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    // use the test-runner utility to wait for fonts to load, etc.
    await waitForPageReady(page);

    // If you want to take screenshot of multiple browsers, use
    // page.context().browser().browserType().name() to get the browser name to prefix the file name
    const image = await page.screenshot();
    // @ts-expect-error: 'expect' is not recognized by TypeScript but is available in the test environment
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customReceivedDir,
      customDiffDir,
      customReceivedPostfix: '',
      storeReceivedOnFailure: true,
      customSnapshotIdentifier: context.id,
      // 小于0.005%的差异认为是相同的
      failureThreshold: 0.00005,
      failureThresholdType: 'percent',
    });
  },
};
export default config;
