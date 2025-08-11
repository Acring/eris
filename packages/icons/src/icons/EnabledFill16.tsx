import React, { ForwardedRef, SVGProps } from 'react';

  const EnabledFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 14.5C11.5898 14.5 14.5 11.5898 14.5 8C14.5 4.41015 11.5898 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5898 4.41015 14.5 8 14.5ZM6.375 10.8146L11.25 8L6.375 5.18541V10.8146Z"/>
      </svg>
    )
  });

  EnabledFill16.displayName = 'EnabledFill16';

  export default EnabledFill16
