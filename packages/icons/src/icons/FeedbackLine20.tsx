import React, { ForwardedRef, SVGProps } from 'react';

  const FeedbackLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.25012 3V17H15.2501V15.2635L17.2501 13.2635V17.5C17.2501 18.3284 16.5785 19 15.7501 19H2.75012C1.92169 19 1.25012 18.3284 1.25012 17.5V2.5C1.25012 1.67157 1.92169 1 2.75012 1H15.7501C16.5785 1 17.2501 1.67157 17.2501 2.5V4.77818L15.2501 6.77818V3H3.25012ZM10.969 14.7929H12.3838L18.75 8.42893L17.3353 7.01472L10.969 13.3787L10.969 14.7929ZM5.75012 6H12.7501V8H5.75012V6ZM9.75012 10H5.75012V12H9.75012V10Z"/>
      </svg>
    )
  });

  FeedbackLine20.displayName = 'FeedbackLine20';

  export default FeedbackLine20
