import React, { ForwardedRef, SVGProps } from 'react';

  const AlertLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.39018 13.6118L3.5 11.0083V7.70001C3.5 4.11016 6.41015 1.20001 10 1.20001C13.5899 1.20001 16.5 4.11016 16.5 7.70001V11.0083L17.6098 13.6118C18.0316 14.6013 17.3056 15.7 16.23 15.7H3.77004C2.69441 15.7 1.96838 14.6013 2.39018 13.6118ZM4.22405 13.9L5.3 11.376V7.70001C5.3 5.10427 7.40426 3.00001 10 3.00001C12.5957 3.00001 14.7 5.10427 14.7 7.70001V11.376L15.776 13.9H4.22405Z"/><path d="M12.371 16.5794C11.6422 16.9077 10.8416 17.089 9.99995 17.089C9.15827 17.089 8.35771 16.9077 7.62894 16.5794L6.8896 18.2206C7.84433 18.6507 8.89637 18.889 9.99995 18.889C11.1035 18.889 12.1556 18.6507 13.1103 18.2206L12.371 16.5794Z"/>
      </svg>
    )
  });

  AlertLine20.displayName = 'AlertLine20';

  export default AlertLine20
