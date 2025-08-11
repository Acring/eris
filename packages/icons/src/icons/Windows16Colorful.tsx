import React, { ForwardedRef, SVGProps } from 'react';

  const Windows16Colorful = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M2.16699 3.86284V7.63928H6.87467V3.18262L2.16699 3.86284Z" fill="#E2574C"/><path d="M7.62988 7.63383V3.08524L13.8366 2.17383V7.63383H7.62988Z" fill="#3DB39E"/><path d="M2.16699 12.1421V8.36914H6.88266V12.8209L2.16699 12.1421Z" fill="#26A6D1"/><path d="M7.62988 12.9366V8.36914H13.833V13.8316L7.62988 12.9366Z" fill="#F4B459"/>
      </svg>
    )
  });

  Windows16Colorful.displayName = 'Windows16Colorful';

  export default Windows16Colorful
