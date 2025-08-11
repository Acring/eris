import React, { ForwardedRef, SVGProps } from 'react';

  const FsShareLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M2.9 2.4V13.4H8.95C8.95 13.7 8.95 14 8.9 14.25 8.9 14.25 8.9 14.3 8.85 14.3H2V1.5H10.05V2.4H2.9ZM10.7 1.6V3.95H13.15L10.7 1.6Z"/><path d="M4.60001 4.7H10.7V5.6H4.60001V4.7ZM10.7 7.4H4.60001V8.3H10.7V7.4ZM4.60001 10.1H6.50001V11H4.60001V10.1ZM12.8188 7.425C12.975 7.425 13.125 7.425 13.25 7.45V4.55H12.35V7.4C12.5 7.425 12.6625 7.425 12.8188 7.425ZM12.15 12.45C12.35 12.15 12.65 11.95 13.05 11.95 13.65 11.95 14.1 12.4 14.1 13 14.1 13.6 13.65 14.05 13.05 14.05 12.45 14.05 12 13.55 12 13L9.15001 12.2C8.95001 12.45 8.60001 12.65 8.25001 12.65 7.65001 12.65 7.20001 12.2 7.20001 11.6 7.20001 11 7.65001 10.55 8.25001 10.55 8.60001 10.55 8.85001 10.7 9.05001 10.9L11.85 9.65C11.85 9.6 11.8375 9.5375 11.825 9.475 11.8125 9.4125 11.8 9.35 11.8 9.3 11.8 8.7 12.25 8.25 12.85 8.25 13.45 8.25 13.9 8.75 13.9 9.3 13.9 9.9 13.45 10.35 12.85 10.35 12.6 10.35 12.4 10.25 12.2 10.1L9.35001 11.4V11.65L12.15 12.45Z"/>
      </svg>
    )
  });

  FsShareLine16.displayName = 'FsShareLine16';

  export default FsShareLine16
