import React, { ForwardedRef, SVGProps } from 'react';

  const Folder20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M1 3.56521C1 2.70435 1.74348 2 2.60435 2H7.49565C8.35652 2 9.06087 2.70435 9.06087 3.56521V3.95651C9.06087 4.38695 9.41304 4.73912 9.84348 4.73912H17.4348C18.2957 4.73912 19 5.44347 19 6.30433V16.4348C19 17.2956 18.2957 18 17.4348 18H2.56522C1.70435 18 1 17.2956 1 16.4348L1 3.56521Z" fill="#FFA557"/>
      </svg>
    )
  });

  Folder20Colorful.displayName = 'Folder20Colorful';

  export default Folder20Colorful
