import React, { ForwardedRef, SVGProps } from 'react';

  const CompleteRightLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M11.4312 5.09133C11.7123 4.85352 12.1329 4.88859 12.3707 5.16967L14.909 8.16967C15.0767 8.36783 15.1141 8.6453 15.0048 8.88078C14.8956 9.11627 14.6596 9.26694 14.4001 9.26694H2.40007C2.03188 9.26694 1.7334 8.96846 1.7334 8.60027C1.7334 8.23208 2.03188 7.93361 2.40007 7.93361H12.9627L11.3529 6.03088C11.115 5.7498 11.1501 5.32915 11.4312 5.09133Z"/>
      </svg>
    )
  });

  CompleteRightLine16.displayName = 'CompleteRightLine16';

  export default CompleteRightLine16
