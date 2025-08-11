import React, { ForwardedRef, SVGProps } from 'react';

  const NodeLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.0957 3.24023V6.52423H13.8665V3.24023H2.0957ZM13.0917 5.71263H2.9073V4.01543H13.0917V5.71263ZM11.6895 9.43923C11.8933 9.43923 12.0585 9.27403 12.0585 9.07023C12.0585 8.86644 11.8933 8.70123 11.6895 8.70123C11.4857 8.70123 11.3205 8.86644 11.3205 9.07023C11.3205 9.27403 11.4857 9.43923 11.6895 9.43923ZM12.0585 4.82704C12.0585 5.03083 11.8933 5.19604 11.6895 5.19604C11.4857 5.19604 11.3205 5.03083 11.3205 4.82704C11.3205 4.62325 11.4857 4.45804 11.6895 4.45804C11.8933 4.45804 12.0585 4.62325 12.0585 4.82704ZM7.6305 10.7307H2.0957L2.0961 7.44666H13.8669V10.7307H10.0293V9.95586H13.0921V8.25866H2.9077V9.95586H8.4057V11.9483H10.5829L11.3945 12.7599H4.6049L5.4165 11.9483H7.6305V10.7307Z"/>
      </svg>
    )
  });

  NodeLine16.displayName = 'NodeLine16';

  export default NodeLine16
