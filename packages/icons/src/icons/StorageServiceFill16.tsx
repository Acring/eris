import React, { ForwardedRef, SVGProps } from 'react';

  const StorageServiceFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.59961 7.11716V3.45996H14.3996V7.11716H1.59961ZM3.17601 5.60396H10.364V4.97356H3.17601V5.60396ZM11.6252 5.85596C11.31 5.85596 11.0576 5.60356 11.0576 5.28836C11.0576 4.97316 11.31 4.72076 11.6252 4.72076C11.9404 4.72076 12.1928 4.97316 12.1928 5.28836C12.1928 5.60356 11.9404 5.85596 11.6252 5.85596ZM1.59961 12.4768V8.81956H14.3996V12.4768H1.59961ZM10.364 11.0268H3.17601V10.3964H10.364V11.0268ZM11.0576 10.648C11.0576 10.9632 11.31 11.2156 11.6252 11.2156C11.9404 11.2156 12.1928 10.9632 12.1928 10.648C12.1928 10.3328 11.9404 10.0804 11.6252 10.0804C11.31 10.0804 11.0576 10.3328 11.0576 10.648Z"/>
      </svg>
    )
  });

  StorageServiceFill16.displayName = 'StorageServiceFill16';

  export default StorageServiceFill16
