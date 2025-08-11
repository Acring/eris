import React, { ForwardedRef, SVGProps } from 'react';

  const Zip20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.36708 1H4.39997C3.08004 1 2 2.08004 2 3.39998V16.5999C2 17.92 3.08004 19 4.39997 19H15.6C16.9201 19 18 17.92 18 16.5999V6L13 1H9.79994V2.47639H8.36708V1ZM9.79994 3.95257V2.47639H11.2329V3.95257H9.79994ZM9.79994 5.42896V3.95257H8.36708V5.42896H9.79994ZM9.79994 6.90535V5.42896H11.2329V6.90535H9.79994ZM9.79994 8.38153V6.90535H8.36708V8.38153H9.79994ZM9.79994 8.38153V9.85792H8.36708V14.0264H11.2329V8.38153H9.79994ZM10.7118 13.5053V11.421H8.88808V13.5053H10.7118Z" fill="#FFA557"/><path opacity="0.5" d="M13 1L18 6H14.2C13.48 6 13 5.52 13 4.8V1Z" fill="white"/>
      </svg>
    )
  });

  Zip20Colorful.displayName = 'Zip20Colorful';

  export default Zip20Colorful
