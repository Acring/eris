'use client';

import { Input, cn } from '@xsky/eris-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NeutonosLinux16Colorful } from '@xsky/eris-icons';
import React from 'react';
import pubsub from 'pubsub-js';
import { commandPaletteEvent } from './CommandPalette/event';

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center overflow-hidden border-b bg-white backdrop-blur">
      <div className="z-50 flex h-7 w-full min-w-[980px] max-w-[1400px] items-center px-4 py-2">
        <Link className="mr-2 flex items-center" href="/">
          <div className="flex items-center">
            <div className="scale-150">
              <NeutonosLinux16Colorful />
            </div>
            <div className="mx-2 flex items-center justify-center rounded-full   font-sans text-xl tracking-wider text-white backdrop-blur">
              <span className="text-title mr-0.5 font-bold text-[#FBC70D]">E</span>
              <h1 className=" text-title text-primary-normal font-bold ">ris/ui</h1>N
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Link href="/themes/overview">
            <div
              className={cn('hover:text-primary-hover', {
                'text-primary-normal': pathname.includes('/themes'),
              })}
            >
              设计系统
            </div>
          </Link>
          <Link
            className={cn('hover:text-primary-hover', {
              'text-primary-normal': pathname.includes('/develop'),
            })}
            href="/develop/introduction"
          >
            研发
          </Link>
          <Link
            className={cn('hover:text-primary-hover', {
              'text-primary-normal': pathname.includes('/components'),
            })}
            href="/components"
          >
            组件
          </Link>
          <Link
            className={cn('hover:text-primary-hover', {
              'text-primary-normal': pathname.includes('/usage'),
            })}
            href="/usage"
          >
            使用情况
          </Link>
          <Link
            href="https://xskydata.feishu.cn/share/base/form/shrcnKvi0JD68IdCCbWZdSP9p1b"
            target="_blank"
          >
            🐞 bug提交
          </Link>
          <Link href="http://10.16.180.148:3001" target="_blank">
            业务组件
          </Link>

          <div className="relative" onClick={() => {}}>
            <Input
              className="ml-5 w-[200px]"
              endAdornment={<span className="text-text-4 text-sm">cmd+k</span>}
              onFocus={() => {
                pubsub.publish(commandPaletteEvent.OPEN);
              }}
              placeholder="搜索或跳转"
              size="md"
            />
            <div className="absolute py-[2px] px-1 bg-rose-400 rounded-full -translate-y-1 translate-x-1 top-0 right-0 text-white text-xs">
              beta
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
