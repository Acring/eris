import React, { ForwardedRef, SVGProps } from 'react';

  const SaveLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.5 2.1C1.5 1.76863 1.76863 1.5 2.1 1.5H10.9C11.0591 1.5 11.2117 1.56321 11.3243 1.67574L14.3243 4.67574C14.4368 4.78826 14.5 4.94087 14.5 5.1V13.9C14.5 14.2314 14.2314 14.5 13.9 14.5H2.1C1.76863 14.5 1.5 14.2314 1.5 13.9V2.1ZM2.7 2.7V13.3H13.3V5.34853L10.6515 2.7H10.181V7.3C10.181 7.63137 9.91235 7.9 9.58098 7.9H4.53627C4.2049 7.9 3.93627 7.63137 3.93627 7.3V2.7H2.7ZM5.13627 2.7V6.7H6.45862V4.52499H7.65862V6.7H8.98098V2.7H5.13627Z"/>
      </svg>
    )
  });

  SaveLine16.displayName = 'SaveLine16';

  export default SaveLine16
