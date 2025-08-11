import React, { ForwardedRef, SVGProps } from 'react';

  const AlarmLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.59999 1.40039H7.39999V2.90039H8.59999V1.40039ZM11.8 13.4004V8.40042C11.8 6.30174 10.0987 4.60042 8 4.60042C5.90132 4.60042 4.2 6.30174 4.2 8.40042V13.4004H11.8ZM13 14.6004H14V13.4004H13V8.40042C13 5.639 10.7614 3.40042 8 3.40042C5.23858 3.40042 3 5.639 3 8.40042V13.4004H2V14.6004H3V14.6004H4.2H11.8H13V14.6004ZM8.00918 5.40039V6.60039C6.95984 6.60039 6.10918 7.45105 6.10918 8.50039V9.00039H4.90918V8.50039C4.90918 6.78831 6.2971 5.40039 8.00918 5.40039ZM12.1515 2.55188L13 3.40041L11.9393 4.46107L11.0908 3.61254L12.1515 2.55188ZM3 3.40041L3.84853 2.55188L4.90919 3.61254L4.06066 4.46107L3 3.40041Z"/>
      </svg>
    )
  });

  AlarmLine16.displayName = 'AlarmLine16';

  export default AlarmLine16
