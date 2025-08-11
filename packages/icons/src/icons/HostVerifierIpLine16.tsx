import React, { ForwardedRef, SVGProps } from 'react';

  const HostVerifierIpLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M1.23535 12.2754H14.7652V13.2005H1.23535V12.2754ZM13.8299 2.79883H2.18607V11.018H13.8299V2.79883ZM12.9047 10.0877H3.11124V3.72399H12.9047V10.0877Z"/><path d="M6.03496 4.84339H6.92946V9.33632H6.03496V4.84339ZM8.03863 4.84339H9.51072C10.5074 4.84339 11.2742 5.18585 11.2742 6.24903 11.2742 7.3122 10.5023 7.74156 9.53628 7.74156H8.93313V9.33632H8.03863V4.84339ZM9.47494 7.02596C10.0985 7.02596 10.395 6.76528 10.395 6.24903 10.395 5.73278 10.0679 5.55388 9.44427 5.55388H8.93313V7.02596H9.47494Z"/>
      </svg>
    )
  });

  HostVerifierIpLine16.displayName = 'HostVerifierIpLine16';

  export default HostVerifierIpLine16
