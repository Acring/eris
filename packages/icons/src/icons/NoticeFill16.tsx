import React, { ForwardedRef, SVGProps } from 'react';

  const NoticeFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.30645 9.05086H8.70431V4.00879H7.30645V9.05086ZM8.77021 10.5373V12.0807H7.23046V10.5373H8.77021Z"/>
      </svg>
    )
  });

  NoticeFill16.displayName = 'NoticeFill16';

  export default NoticeFill16
