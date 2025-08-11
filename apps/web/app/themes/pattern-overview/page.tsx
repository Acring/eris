'use client';
import Image from 'next/image';
import { H1, P } from '../../../mdx-components';

export default function PatternOverview() {
  return (
    <div>
      <H1> 设计模式 </H1>
      <P>
        设计模式（Design
        Pattern）是在软件设计中的经常遇到的问题中，对某类问题的一种解决方案。它们是经验的总结，不是库或框架，而是一种在特定环境下解决问题的方法，在我们的产品开发中通用会遇到很多重复的业务逻辑，例如「表单填写」，「资源列表」，「详情展示」等。
      </P>
      <P> 为了让用户的体验具有一致性，我们需要保证类似的业务逻辑在设计模式上是一致的。</P>
      <Image
        alt="design-pattern"
        className="mt-5 shadow-lg"
        height={640}
        src="/pattern.png"
        width={980}
      />
      <div className="text-text-3 mt-1 text-center">from Antd</div>
    </div>
  );
}
