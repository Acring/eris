import React, { ForwardedRef, SVGProps } from 'react';

  const CheckboxCheckedFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2H3ZM11.9336 6.41915C12.166 6.18285 12.1627 5.80297 11.9265 5.57065C11.6902 5.33833 11.3103 5.34155 11.078 5.57784L7.08302 9.64105L4.91845 7.57388C4.6788 7.34502 4.299 7.35376 4.07014 7.5934C3.84128 7.83305 3.85002 8.21285 4.08967 8.44171L6.68189 10.9173L7.10955 11.3257L7.52413 10.904L11.9336 6.41915Z"/>
      </svg>
    )
  });

  CheckboxCheckedFill16.displayName = 'CheckboxCheckedFill16';

  export default CheckboxCheckedFill16
