import React, { ForwardedRef, SVGProps } from 'react';

  const CriticalFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M0.799805 7.9998C0.799805 4.02541 4.02541 0.799805 7.9998 0.799805C11.9742 0.799805 15.1998 4.02541 15.1998 7.9998C15.1998 11.9742 11.9742 15.1998 7.9998 15.1998C4.02541 15.1998 0.799805 11.9742 0.799805 7.9998ZM6.98596 12.5317L12.0789 7.10403H7.91195L8.99228 3.5373L3.89931 8.96492H8.06629L6.98596 12.5317Z"/>
      </svg>
    )
  });

  CriticalFill16.displayName = 'CriticalFill16';

  export default CriticalFill16
