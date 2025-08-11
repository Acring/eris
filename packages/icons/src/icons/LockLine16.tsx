import React, { ForwardedRef, SVGProps } from 'react';

  const LockLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.99408 5.49979H2.98047C2.42818 5.49979 1.98047 5.9475 1.98047 6.49979V13.4998C1.98047 14.0521 2.42818 14.4998 2.98047 14.4998H12.9805C13.5328 14.4998 13.9805 14.0521 13.9805 13.4998V6.49979C13.9805 5.9475 13.5328 5.49979 12.9805 5.49979H11.9669C11.7979 2.97801 10.0777 0.996094 7.98047 0.996094C5.88326 0.996094 4.16301 2.97801 3.99408 5.49979ZM7.98047 2.19609C6.73632 2.19609 5.36546 3.44255 5.19761 5.48511H10.7633C10.5955 3.44255 9.22462 2.19609 7.98047 2.19609ZM3.18047 13.2998V6.69979H12.7805V13.2998H3.18047ZM8.5999 9.39943H8.98047V8.19943H6.98047V9.39943H7.3999V11.8001H8.5999V9.39943Z"/>
      </svg>
    )
  });

  LockLine16.displayName = 'LockLine16';

  export default LockLine16
