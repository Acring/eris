import React, { ForwardedRef, SVGProps } from 'react';

  const File20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M17.3944 1.00002L7.46554 1.00001C7.23637 0.99893 7.01639 1.0894 6.85508 1.25107L2.24323 5.91212C2.08745 6.07039 2.00016 6.28289 2 6.50422V19L18.0001 19V1.66319C18.0001 1.19898 17.8665 1.00002 17.3944 1.00002ZM2.85846 6.93528H7.99492V1.85739H8.84385V7.29528C8.84385 7.43052 8.78943 7.56016 8.6927 7.65535C8.59596 7.75054 8.46494 7.80338 8.32877 7.80214H2.85846V6.93528Z" fill="#A5ACC9"/>
      </svg>
    )
  });

  File20Colorful.displayName = 'File20Colorful';

  export default File20Colorful
