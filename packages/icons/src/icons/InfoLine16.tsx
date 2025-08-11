import React, { ForwardedRef, SVGProps } from 'react';

  const InfoLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 13.3C10.9271 13.3 13.3 10.9271 13.3 8C13.3 5.07289 10.9271 2.7 8 2.7C5.07289 2.7 2.7 5.07289 2.7 8C2.7 10.9271 5.07289 13.3 8 13.3ZM8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM7.3999 7.5H8.5999V11.5H7.3999V7.5ZM8.75 4.5H7.25V6H8.75V4.5Z"/>
      </svg>
    )
  });

  InfoLine16.displayName = 'InfoLine16';

  export default InfoLine16
