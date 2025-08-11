import React, { ForwardedRef, SVGProps } from 'react';

  const Word20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13 1L4.39997 1C3.08004 1 2 2.08004 2 3.39998V16.5999C2 17.92 3.08004 19 4.39997 19H15.6C16.9201 19 18 17.92 18 16.5999V6L13 1ZM6.68597 7.69605H5.57899L7.42395 14.1221H8.47694L9.78198 9.16303H9.81801L11.1229 14.1221H12.167L14.021 7.69605H12.9139L11.663 12.7H11.6269L10.313 7.69605H9.28697L7.97294 12.7H7.93703L6.68597 7.69605Z" fill="#66A3FF"/><path opacity="0.5" d="M13 1L18 6H14.2C13.48 6 13 5.52 13 4.8V1Z" fill="white"/>
      </svg>
    )
  });

  Word20Colorful.displayName = 'Word20Colorful';

  export default Word20Colorful
