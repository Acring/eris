'use client';
/* eslint-disable react/no-unescaped-entities */
import { cn } from '@xsky/eris-ui';
import { A, Code, H1, P } from '../../../mdx-components';

// *tw*
const fontSize = {
  'text-caption': ['12px', '20px'],
  'text-body': ['14px', '22px'],
  'text-subhead': ['16px', '24px'],
  'text-title': ['20px', '28px'],
  'text-number': ['24px', '32px'],
  'text-bignumber': ['32px', '40px'],
  'text-extralarge': ['40px', '48px'],
};
export default function Page() {
  return (
    <div>
      <H1> 字体 </H1>
      <P>
        Eris
        的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。
      </P>
      <P>
        详见:{' '}
        <A href="https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=11723%3A60148&mode=dev">
          通用设计规范
        </A>
      </P>
      <div className="rounded-sm bg-gray-100 px-1 py-[2px] dark:bg-gray-800">
        <Code>
          "-apple-system" , "BlinkMacSystemFont" , "Helvetica Neue" , "Helvetica" , "Arial" ,
          "PingFang SC" , "San Francisco" , "Noto Sans" , "Roboto" , "Microsoft Yahei" , "微软雅黑"
          , "Segoe UI" , "WenQuanYi Micro Hei", "sans-serif"
        </Code>
      </div>
      <H1 className="mt-5"> 字号 </H1>
      <P> 字号通常有以下几种 </P>
      <div className="mt-3 flex flex-col">
        {Object.keys(fontSize).map((key) => {
          return (
            <div className="flex items-center gap-1" key={key}>
              <div className={cn(key)}>{key}</div>(
              <div className="flex gap-1">
                <div className="text-caption text-text-1">{fontSize[key][0]}</div>
                <div className="text-caption text-text-1">{fontSize[key][1]}</div>
              </div>
              )
            </div>
          );
        })}
      </div>
    </div>
  );
}
