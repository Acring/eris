import React, { ForwardedRef, SVGProps } from 'react';

  const NeutonosLinux16Colorful = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M12.2471 2.61857L2.01562 12.8596L2.671 13.5157C3.01675 13.8618 3.5727 13.8676 3.91157 13.5284L13.5296 3.90111L14.1485 4.52002V2H11.6285L12.2467 2.61822L12.2471 2.61857Z" fill="#FBC70D"/><path d="M7.65241 6.13611 3.90592 2.2675C3.57118 1.92622 3.02211 1.92347 2.68393 2.26165L2 2.94627 6.35026 7.43826 7.65241 6.13611ZM8.66636 9.82886 12.2432 13.5224C12.578 13.8636 13.1274 13.8664 13.4652 13.5279L14.1488 12.8433 9.96817 8.52637 8.66602 9.82852 8.66636 9.82886Z" fill="#6E35FC"/>
      </svg>
    )
  });

  NeutonosLinux16Colorful.displayName = 'NeutonosLinux16Colorful';

  export default NeutonosLinux16Colorful
