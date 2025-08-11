import React, { ForwardedRef, SVGProps } from 'react';

  const Form20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13 1H4.80009C3.48015 1 2.40012 2.08004 2.40012 3.39998V16.5999C2.40012 17.92 3.48015 19 4.80009 19H15.6C16.9201 19 18 17.92 18 16.5999V6L13 1ZM8.63409 7.69605H7.43701L9.59708 10.801L7.28405 14.1221H8.48102L10.2001 11.5751L11.919 14.1221H13.1161L10.7851 10.801L12.963 7.69605H11.766L10.2001 10.0181L8.63409 7.69605Z" fill="#47CC7C"/><path opacity="0.5" d="M13.0001 1L18.0001 6H14.2001C13.4801 6 13.0001 5.52 13.0001 4.8V1Z" fill="white"/>
      </svg>
    )
  });

  Form20Colorful.displayName = 'Form20Colorful';

  export default Form20Colorful
