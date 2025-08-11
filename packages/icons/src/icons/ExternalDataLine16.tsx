import React, { ForwardedRef, SVGProps } from 'react';

  const ExternalDataLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2 2.24C2 1.52547 2.60134 1 3.275 1H10.3625C10.5271 1 10.6844 1.06758 10.7977 1.18693L13.8352 4.38693C13.941 4.49842 14 4.64628 14 4.8V8.68H12.8V6.18314H9.47054C9.13917 6.18314 8.87054 5.91451 8.87054 5.58314V2.2H3.275C3.24393 2.2 3.22247 2.21153 3.21053 2.22285C3.19962 2.2332 3.2 2.23992 3.2 2.23992L3.2 13.76C3.2 13.76 3.19963 13.7668 3.21053 13.7771C3.22246 13.7885 3.24392 13.8 3.275 13.8H7V15H3.275C2.60134 15 2 14.4746 2 13.76V2.24ZM10.0705 2.2V4.98314H12.7466L10.1048 2.2H10.0705Z"/><path d="M10.636 9.60048 9.7875 8.75195 7.36324 11.1762C7.12892 11.4105 7.12892 11.7904 7.36324 12.0247L9.7875 14.449 10.636 13.6005 9.23642 12.2009H14.0004V11.0009H9.23564L10.636 9.60048ZM4.40039 4.40039H7.00039V5.60039H4.40039V4.40039ZM8.20039 7.00024H4.40039V8.20024H8.20039V7.00024Z"/>
      </svg>
    )
  });

  ExternalDataLine16.displayName = 'ExternalDataLine16';

  export default ExternalDataLine16
