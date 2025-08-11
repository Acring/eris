import React, { ForwardedRef, SVGProps } from 'react';

  const JournalFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.00015 7.01968V1.13672H3.09768C2.55617 1.13672 2.11719 1.5757 2.11719 2.11721V13.8831C2.11719 14.4246 2.55617 14.8636 3.09768 14.8636H12.9026C13.1627 14.8636 13.4121 14.7603 13.5959 14.5765C13.7798 14.3926 13.8831 14.1432 13.8831 13.8831V7.01968H8.00015ZM5.64554 10.1472C5.42463 10.1472 5.24554 10.3263 5.24554 10.5472V11.4468C5.24554 11.6677 5.42463 11.8468 5.64554 11.8468H10.3547C10.5756 11.8468 10.7547 11.6677 10.7547 11.4468V10.5472C10.7547 10.3263 10.5756 10.1472 10.3547 10.1472H5.64554Z"/><path d="M13.8821 5.05771L9.96114 1.13672V5.05869L13.8821 5.05771Z"/>
      </svg>
    )
  });

  JournalFill16.displayName = 'JournalFill16';

  export default JournalFill16
