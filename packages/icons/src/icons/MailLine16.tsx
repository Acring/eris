import React, { ForwardedRef, SVGProps } from 'react';

  const MailLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M1.86964 2.46094H14.1307C14.3113 2.46094 14.4846 2.52578 14.6123 2.6412C14.7401 2.75662 14.8118 2.91316 14.8118 3.07639V12.9236C14.8118 13.0868 14.7401 13.2434 14.6123 13.3588C14.4846 13.4742 14.3113 13.5391 14.1307 13.5391H1.86964C1.68899 13.5391 1.51573 13.4742 1.38799 13.3588C1.26024 13.2434 1.18848 13.0868 1.18848 12.9236V3.07639C1.18848 2.91316 1.26024 2.75662 1.38799 2.6412C1.51573 2.52578 1.68899 2.46094 1.86964 2.46094ZM13.4495 5.06922L8.0492 9.43893L2.55081 5.05568V12.3082H13.4495V5.06922ZM2.89889 3.69184L8.04171 7.79198L13.1103 3.69184H2.89889Z"/>
      </svg>
    )
  });

  MailLine16.displayName = 'MailLine16';

  export default MailLine16
