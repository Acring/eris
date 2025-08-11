import React, { ForwardedRef, SVGProps } from 'react';

  const SyncCompleteLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M11.7725 3.53671C11.5465 3.29417 11.1469 3.26391 10.8799 3.46912 10.6129 3.67434 10.5796 4.03732 10.8055 4.27986L12.3349 5.92173H2.30033C1.95055 5.92173 1.667 6.17928 1.667 6.497 1.667 6.81471 1.95055 7.07226 2.30033 7.07226H13.7003C13.9469 7.07226 14.1711 6.94225 14.2749 6.73905 14.3786 6.53585 14.3431 6.29642 14.1838 6.12542L11.7725 3.53671ZM4.2282 12.0459C4.45413 12.2885 4.85375 12.3187 5.12077 12.1135 5.3878 11.9083 5.42112 11.5453 5.19519 11.3028L3.6658 9.66093H13.7003C14.0501 9.66093 14.3337 9.40337 14.3337 9.08566 14.3337 8.76795 14.0501 8.51039 13.7003 8.51039H2.30033C2.05373 8.51039 1.82955 8.64041 1.72579 8.84361 1.62203 9.04681 1.65756 9.28624 1.81684 9.45723L4.2282 12.0459Z"/>
      </svg>
    )
  });

  SyncCompleteLine16.displayName = 'SyncCompleteLine16';

  export default SyncCompleteLine16
