import React, { ForwardedRef, SVGProps } from 'react';

  const SearchLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.30735 1.37891C4.10005 1.37891 1.5 3.97896 1.5 7.18625C1.5 10.3935 4.10005 12.9936 7.30735 12.9936C8.69457 12.9936 9.96819 12.5072 10.967 11.6956L13.6502 14.3789L14.5 13.5291L11.8167 10.8459C12.6283 9.84709 13.1147 8.57347 13.1147 7.18625C13.1147 3.97896 10.5146 1.37891 7.30735 1.37891ZM2.70176 7.18625C2.70176 4.64267 4.76376 2.58067 7.30735 2.58067C9.85093 2.58067 11.9129 4.64267 11.9129 7.18625C11.9129 9.72983 9.85093 11.7918 7.30735 11.7918C4.76376 11.7918 2.70176 9.72983 2.70176 7.18625Z"/>
      </svg>
    )
  });

  SearchLine16.displayName = 'SearchLine16';

  export default SearchLine16
