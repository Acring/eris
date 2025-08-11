import React, { ForwardedRef, SVGProps } from 'react';

  const RockyLinux16Colorful = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.0435 10.1101C14.2742 9.44934 14.3996 8.73914 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 9.74854 2.30114 11.3337 3.43816 12.4888L9.93014 5.99684L11.5329 7.59961L14.0435 10.1101ZM12.8744 12.1466L9.93014 9.20241L5.31946 13.8131C6.13474 14.1895 7.04264 14.3996 7.99961 14.3996C9.95214 14.3996 11.7005 13.5252 12.8744 12.1466Z" fill="#10B981"/>
      </svg>
    )
  });

  RockyLinux16Colorful.displayName = 'RockyLinux16Colorful';

  export default RockyLinux16Colorful
