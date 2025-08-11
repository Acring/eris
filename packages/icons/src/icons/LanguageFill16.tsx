import React, { ForwardedRef, SVGProps } from 'react';

  const LanguageFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.22148 14.9573C3.91821 14.5918 1.30787 11.9278 1.02539 8.60015H5.01478C5.13115 10.9636 5.93128 13.1472 7.22148 14.9573ZM7.22148 1.04297C3.91822 1.4085 1.30787 4.07254 1.02539 7.40015H5.01478C5.13116 5.03675 5.93128 2.85313 7.22148 1.04297ZM6.01612 8.60015C6.13035 10.7252 6.8477 12.6899 8.00003 14.3263C9.15237 12.6899 9.86972 10.7252 9.98395 8.60015H6.01612ZM9.98395 7.40015H6.01612C6.13035 5.27514 6.8477 3.31038 8.00004 1.674C9.15238 3.31038 9.86972 5.27514 9.98395 7.40015ZM10.9853 7.40015C10.8689 5.03675 10.0688 2.85313 8.7786 1.04297C12.0819 1.4085 14.6922 4.07255 14.9747 7.40015H10.9853ZM10.9853 8.60015H14.9747C14.6922 11.9278 12.0819 14.5918 8.77859 14.9573C10.0688 13.1472 10.8689 10.9636 10.9853 8.60015Z"/>
      </svg>
    )
  });

  LanguageFill16.displayName = 'LanguageFill16';

  export default LanguageFill16
