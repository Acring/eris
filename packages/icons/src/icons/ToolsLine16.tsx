import React, { ForwardedRef, SVGProps } from 'react';

  const ToolsLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.56631 1.7334H2.96631V2.3334V5.06738H1.89981C1.72259 5.06738 1.55443 5.14573 1.44043 5.28141C1.32643 5.4171 1.27824 5.59624 1.30879 5.77081L2.70879 13.7708C2.75903 14.0579 3.00834 14.2674 3.29981 14.2674H12.4998C12.7913 14.2674 13.0406 14.0579 13.0908 13.7708L14.4908 5.77081C14.5214 5.59624 14.4732 5.4171 14.3592 5.28141C14.2452 5.14573 14.077 5.06738 13.8998 5.06738H12.7602L8.75055 2.18046L8.26435 1.83039L7.91356 2.31609L6.83298 3.81228V2.3334V1.7334H6.23298H3.56631ZM10.7064 5.06738L8.5356 3.50437L7.40676 5.06738H10.7064ZM4.16631 5.06673V2.9334H5.63298V5.06673H4.16631ZM7.89981 9.00078H4.89981V7.80078H7.89981V9.00078ZM3.80393 13.0674L2.61393 6.26738H13.1857L11.9957 13.0674H3.80393Z"/>
      </svg>
    )
  });

  ToolsLine16.displayName = 'ToolsLine16';

  export default ToolsLine16
