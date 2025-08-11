import React, { ForwardedRef, SVGProps } from 'react';

  const Uninteroperable20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 9.01005L8.37365 7.38361L7.3837 8.37356L9.01014 10L7.38373 11.6264L8.37368 12.6164L10.0001 10.9899L11.6263 12.6162L12.6163 11.6262L10.99 10L12.6163 8.37372L11.6264 7.38377L10.0001 9.01005Z" fill="#EB5555"/><path fillRule="evenodd" clipRule="evenodd" d="M4.2 8.19999C3.20589 8.19999 2.4 9.00588 2.4 9.99999 2.4 10.9941 3.20589 11.8 4.2 11.8 5.19411 11.8 6 10.9941 6 9.99999 6 9.00588 5.19411 8.19999 4.2 8.19999ZM1 9.99999C1 8.23268 2.43269 6.79999 4.2 6.79999 5.96731 6.79999 7.4 8.23268 7.4 9.99999 7.4 11.7673 5.96731 13.2 4.2 13.2 2.43269 13.2 1 11.7673 1 9.99999ZM15.8 8.19999C14.8059 8.19999 14 9.00588 14 9.99999 14 10.9941 14.8059 11.8 15.8 11.8 16.7941 11.8 17.6 10.9941 17.6 9.99999 17.6 9.00588 16.7941 8.19999 15.8 8.19999ZM12.6 9.99999C12.6 8.23268 14.0327 6.79999 15.8 6.79999 17.5673 6.79999 19 8.23268 19 9.99999 19 11.7673 17.5673 13.2 15.8 13.2 14.0327 13.2 12.6 11.7673 12.6 9.99999Z" fill="#C5CBE4"/>
      </svg>
    )
  });

  Uninteroperable20Colorful.displayName = 'Uninteroperable20Colorful';

  export default Uninteroperable20Colorful
