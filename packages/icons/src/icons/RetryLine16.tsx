import React, { ForwardedRef, SVGProps } from 'react';

  const RetryLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M4.48704 6.63432L3.49035 5.656C2.85161 6.4954 2.42456 7.40683 2.35547 8.38515H3.7748C3.8461 7.75524 4.13129 7.19588 4.48704 6.63432ZM3.7748 9.78464H2.3562C2.49126 10.778 2.88208 11.7192 3.49035 12.516L4.48704 11.5355C4.13129 10.9739 3.8461 10.4146 3.7748 9.78464ZM4.48704 13.4965C5.33894 14.125 6.26213 14.4756 7.25589 14.6152V13.2143C6.61788 13.1444 6.04824 12.8659 5.4808 12.516L4.48704 13.4958V13.4965ZM8.67375 3.55456V1.38477L5.47933 4.53509L8.67375 7.68467V4.95552C10.6627 5.30539 12.2239 6.9864 12.2239 9.08637C12.2239 11.1856 10.6627 12.8659 8.67375 13.2143V14.6152C11.4433 14.2646 13.6455 11.8839 13.6455 9.08563C13.6455 6.28445 11.4433 3.90517 8.67375 3.55456Z"/>
      </svg>
    )
  });

  RetryLine16.displayName = 'RetryLine16';

  export default RetryLine16
