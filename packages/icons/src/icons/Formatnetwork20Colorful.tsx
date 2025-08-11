import React, { ForwardedRef, SVGProps } from 'react';

  const Formatnetwork20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13 1H4.39999C3.07999 1 2 2.08 2 3.4V16.6C2 17.92 3.07999 19 4.39999 19H15.6C16.92 19 18 17.92 18 16.6V6L13 1ZM6.14305 13.51C6.50868 13.9206 7.02055 14.1344 7.63367 14.1344V14.14H12.1449C12.893 14.14 13.5118 13.8869 13.9449 13.4088C14.3274 12.9869 14.5355 12.4188 14.5355 11.8113C14.5355 10.675 13.7874 9.5275 12.3643 9.5275C12.3024 9.5275 12.2349 9.5275 12.173 9.53313L12.1168 9.53875L12.0943 9.48813C11.6724 8.62188 10.8849 8.12688 9.93428 8.12688C9.23116 8.12688 8.53366 8.41375 8.06679 8.8975C7.71242 9.26313 7.49867 9.72438 7.45367 10.225L7.44805 10.2925H7.37492C6.2443 10.3263 5.65368 11.2544 5.65368 12.16C5.65368 12.6719 5.82805 13.15 6.14305 13.51Z" fill="#A5ACC9"/><path opacity="0.5" d="M12.9999 1L18 6H14.1999C13.4799 6 12.9999 5.52 12.9999 4.8V1Z" fill="white"/>
      </svg>
    )
  });

  Formatnetwork20Colorful.displayName = 'Formatnetwork20Colorful';

  export default Formatnetwork20Colorful
