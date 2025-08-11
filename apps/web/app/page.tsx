'use client';
import { ExternalClusterLine16, LanguageFill16, NeutonosLinux16Colorful } from '@xsky/eris-icons';
import Link from 'next/link';
import { useMemo } from 'react';
import { Alert, Button, IconButton, Input, Select, Spinner, cn } from '@xsky/eris-ui';
import config from '../config';

export default function Home() {
  const options = useMemo(
    () => [
      {
        label: 'SDDC',
        value: 'SDDC',
      },
      {
        label: 'SDS',
        value: 'SDS',
      },
      {
        label: 'XSKY',
        value: 'XSKY',
      },
    ],
    [],
  );

  return (
    <main className={cn('flex justify-center')}>
      <div className="w-full min-w-[980px] max-w-[1400px] px-4 py-2">
        <div className="flex">
          <div className="relative flex flex-col gap-2 ">
            <div className="mt-5">
              <div>
                <h1 className={cn('text-text-1 mb-2 text-5xl font-bold')}>{config.description}</h1>
                <p className={cn('text-title text-text-3 max-w-[560px]')}>{config.slogan}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={config.links.figma}>
                <Button color="primary" icon={<LanguageFill16 />} type="outlined">
                  Figma
                </Button>
              </Link>
              <Link href={config.links.github}>
                <Button color="primary" icon={<NeutonosLinux16Colorful />} type="secondary">
                  Github
                </Button>
              </Link>
            </div>
            <div className="border-primary-normal text-subhead text-text-2 mt-5 w-[700px] rounded-lg border p-3">
              Eris 是太阳系中第二大的矮行星，Eris 的名字在希腊语中意味着 &quot; 争斗
              &quot;，她的罗马神话对应者是 &ldquo;Discordia&rdquo;，意为 &quot; 纷争 &quot;。Eris
              在神话中的形象大多是消极的，她被视为一个带来冲突和混乱的不祥之神。有点类似现在 Wizard
              和 Pluto 之间的关系。
              然而，在某些情况下，冲突和混乱往往是引发变革的力量，因为混乱和冲突常常是新事物出现的催化剂。通用设计系统也是这种状况下的产物，我们希望这个通用组件库能够帮助我们解决现在项目中的各种混乱和纷争。
            </div>
          </div>
          <div className="preview relative flex-1">
            <div className="absolute left-2 top-2 h-[480px] w-[480px] rounded-full border border-yellow-300 bg-yellow-400" />
            <Button className="absolute left-[140px] top-[140px] translate-x-3 animate-[levitate_16s_ease_infinite]">
              Click Me
            </Button>
            <Input
              className="absolute left-[156px] top-[256px] w-[200px] animate-[levitate_15s_ease_infinite]"
              placeholder="请输入"
            />
            <Alert
              className="absolute left-[256px] top-[108px] w-[200px] animate-[levitate_17s_ease_infinite]"
              content="Welcome to Eris UI"
              onClose={() => {}}
              type="info"
            />
            <div className=" absolute bottom-[56px] left-[257px] flex animate-[levitate_12s_ease_infinite] rounded-md bg-white p-1">
              <IconButton color="primary">
                <NeutonosLinux16Colorful />
              </IconButton>
            </div>
            <Spinner className="absolute left-56 top-52  animate-[levitate_12s_ease_infinite] rounded-full bg-white p-2" />

            <Select
              className="absolute bottom-[56px] left-[78px] animate-[levitate_10s_ease_infinite]"
              defaultValue="SDDC"
              options={options}
              placeholder="请选择"
            />
          </div>
        </div>

        <div className="mt-[128px] flex justify-between gap-2">
          <Card title="解决混乱">
            Eris 的目标是解决 XSKY 内部产品 UI
            混乱的问题，我们提供了一套完整的设计系统，包括设计原则、设计模式、设计资源等，帮助设计师和开发者快速构建产品。
          </Card>
          <Card title="轻量化">
            Eris 采用 TailwindCSS + Radix UI ，
            在提供丰富的组件同时，保证了组件的轻量化，组件的样式可以通过 TailwindCSS 进行修改
          </Card>
          <Card title="标准化">
            采用完整的 Figma
            设计系统到代码的标准化流程，保证了设计和开发的一致性，同时也提供了一套完整的设计资源，包括
            Variables，设计组件，通用设计规范。
          </Card>
          <Card title="持续迭代">
            Eris 会持续迭代，我们会根据 XSKY 内部产品的需求，不断完善和优化
            Eris，同时也会根据产品线的反馈，不断完善和优化 Eris。最终替代 XSKY 原有的混乱的 UI
            设计和组件
          </Card>
        </div>
      </div>
    </main>
  );
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-[18px] border px-2 py-2 shadow-md">
      <div className="flex items-center gap-1">
        <div className="bg-primary-normal rounded-full p-1 text-white">
          <ExternalClusterLine16 />
        </div>
        <div className="text-text-1 font-bold">{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
