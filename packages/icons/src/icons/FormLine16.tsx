import React, { ForwardedRef, SVGProps } from 'react';

  const FormLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M11.3333 1.33301V2.66634H13.338C13.7033 2.66634 14 2.96301 14 3.32834V14.0043C14 14.3697 13.7033 14.6663 13.338 14.6663H2.662C2.29667 14.6663 2 14.3697 2 14.0043V3.32834C2 2.96301 2.29667 2.66634 2.662 2.66634H4.66667V1.33301H11.3333ZM4.66667 3.99967H3.33333V13.333H12.6667V3.99967H11.3333V5.33301H4.66667V3.99967ZM6 10.6663V11.9997H4.66667V10.6663H6ZM6 8.66634V9.99967H4.66667V8.66634H6ZM6 6.66634V7.99967H4.66667V6.66634H6ZM10 2.66634H6V3.99967H10V2.66634Z"/>
      </svg>
    )
  });

  FormLine16.displayName = 'FormLine16';

  export default FormLine16
