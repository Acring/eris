import React, { ForwardedRef, SVGProps } from 'react';

  const ErrorDiamondLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.46815 1.29909C8.3456 1.17164 8.17642 1.09961 7.99961 1.09961C7.8228 1.09961 7.65362 1.17164 7.53107 1.29909L1.28107 7.79909C1.16152 7.92342 1.09629 8.09017 1.09974 8.26261C1.10319 8.43506 1.17504 8.59906 1.29946 8.71851L7.54946 14.7185C7.80099 14.96 8.19823 14.96 8.44975 14.7185L14.6998 8.71851C14.8242 8.59906 14.896 8.43506 14.8995 8.26261C14.9029 8.09017 14.8377 7.92342 14.7182 7.79909L8.46815 1.29909ZM7.99961 13.3486L2.66903 8.23121L7.99961 2.68741L13.3302 8.23121L7.99961 13.3486Z"/><path d="M4.89962 7.9996C4.89962 7.57172 5.24649 7.22485 5.67437 7.22485H10.3249C10.7528 7.22485 11.0996 7.57172 11.0996 7.9996C11.0996 8.42749 10.7528 8.77435 10.3249 8.77435H5.67437C5.24649 8.77435 4.89962 8.42749 4.89962 7.9996Z"/>
      </svg>
    )
  });

  ErrorDiamondLine16.displayName = 'ErrorDiamondLine16';

  export default ErrorDiamondLine16
