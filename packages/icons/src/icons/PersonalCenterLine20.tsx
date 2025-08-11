import React, { ForwardedRef, SVGProps } from 'react';

  const PersonalCenterLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.50001 1.59998C6.10346 1.59998 3.35001 4.35342 3.35001 7.74998C3.35001 9.2082 3.85753 10.5479 4.70556 11.602C4.62214 11.6601 4.53983 11.7197 4.45867 11.7806C2.42089 13.3117 1.10001 15.7518 1.10001 18.5002H2.90001C2.90001 16.3418 3.93515 14.4254 5.53988 13.2197C5.71159 13.0907 5.88975 12.9699 6.07376 12.8579C7.05289 13.516 8.23161 13.9 9.50001 13.9C12.8966 13.9 15.65 11.1465 15.65 7.74998C15.65 4.35342 12.8966 1.59998 9.50001 1.59998ZM5.15001 7.74998C5.15001 5.34754 7.09757 3.39998 9.50001 3.39998C11.9025 3.39998 13.85 5.34754 13.85 7.74998C13.85 10.1524 11.9025 12.1 9.50001 12.1C7.09757 12.1 5.15001 10.1524 5.15001 7.74998Z"/><path d="M13.9932 13.7437L14.2524 13.9204C14.625 14.3069 14.9507 14.7385 15.2206 15.206C15.7798 16.1747 16.1 17.2987 16.1 18.5002H17.9C17.9 16.9744 17.4924 15.541 16.7795 14.3061C16.4179 13.6798 15.9781 13.1049 15.4735 12.5945L15.4123 12.5325L15.0068 12.2563L13.9932 13.7437Z"/>
      </svg>
    )
  });

  PersonalCenterLine20.displayName = 'PersonalCenterLine20';

  export default PersonalCenterLine20
