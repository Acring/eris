import React, { ForwardedRef, SVGProps } from 'react';

  const MenuPlatformFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M7.30832 2.20339L1.70193 5.81322C1.53806 5.91863 1.54765 6.16107 1.71966 6.25307L7.39648 9.29895C7.77356 9.50114 8.22731 9.50114 8.60487 9.29895L14.2817 6.25307C14.4532 6.16107 14.4628 5.91863 14.2994 5.81322L8.69303 2.20339C8.27187 1.9322 7.73092 1.9322 7.30976 2.20339H7.30832ZM1.55675 10.1207L3.63717 8.70817L7.39696 10.7225C7.77404 10.9242 8.22683 10.9242 8.60391 10.7225L12.3642 8.70817L14.4446 10.1207C14.6013 10.227 14.5917 10.4613 14.4269 10.5543L8.63026 13.8345C8.23976 14.0553 7.76206 14.0553 7.37157 13.8345L1.57496 10.5543C1.41013 10.4609 1.40007 10.227 1.55675 10.1207Z"/>
      </svg>
    )
  });

  MenuPlatformFill16.displayName = 'MenuPlatformFill16';

  export default MenuPlatformFill16
