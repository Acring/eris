import React, { ForwardedRef, SVGProps } from 'react';

  const AlarmFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.59999 1.40039H7.39999V2.90039H8.59999V1.40039ZM13 14.6004H14V13.4004H13V8.40042C13 5.639 10.7614 3.40042 8 3.40042C5.23858 3.40042 3 5.639 3 8.40042V13.4004H2V14.6004H3L4.2 14.6004H11.8L13 14.6004ZM12.1515 2.55188L13 3.40041L11.9393 4.46107L11.0908 3.61254L12.1515 2.55188ZM3 3.40041L3.84853 2.55188L4.90919 3.61254L4.06066 4.46107L3 3.40041ZM8.00918 6.60039V5.40039C6.2971 5.40039 4.90918 6.78831 4.90918 8.50039V9.00039H6.10918V8.50039C6.10918 7.45105 6.95984 6.60039 8.00918 6.60039Z"/>
      </svg>
    )
  });

  AlarmFill16.displayName = 'AlarmFill16';

  export default AlarmFill16
