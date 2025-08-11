import React, { ForwardedRef, SVGProps } from 'react';

  const LabelFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.2002 2.81348C2.2002 2.26119 2.64791 1.81348 3.2002 1.81348H12.8002C13.1525 1.81348 13.8002 2.26119 13.8002 2.81348V13.186C13.8002 13.9317 13.0154 14.415 12.3502 14.0781L8.45204 12.2566C8.16799 12.1127 7.8324 12.1127 7.54835 12.2566L3.6502 14.0781C2.985 14.415 2.2002 13.9317 2.2002 13.186V2.81348ZM4.60034 6.6134L11.4003 6.6134V5.4134L4.60034 5.4134V6.6134Z"/>
      </svg>
    )
  });

  LabelFill16.displayName = 'LabelFill16';

  export default LabelFill16
